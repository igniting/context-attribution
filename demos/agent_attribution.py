#!/usr/bin/env python3
"""
Agent Attribution Demo
======================

Demonstrates Leave-One-Out (LOO) attribution for LLM agents.

Key concepts:
- RAG is modeled as a search tool (unified tool model)
- Tool selection attribution: Why did the agent call this tool?
- Response attribution: What tool outputs informed the response?
- Log-probability difference measures source importance

Usage:
    python agent_attribution.py [model]
    python agent_attribution.py --help

Examples:
    python agent_attribution.py              # Use default (Qwen-0.5B)
    python agent_attribution.py gemma3       # Use Gemma-3
    python agent_attribution.py qwen-1.5b    # Use Qwen-1.5B
"""

import torch
from typing import List, Dict, Any, Tuple, Optional
from dataclasses import dataclass
import warnings
import time

warnings.filterwarnings('ignore')

from transformers import AutoModelForCausalLM, AutoTokenizer

try:
    from rich.console import Console
    from rich.table import Table
    from rich.panel import Panel
    from rich import box
    console = Console()
    HAS_RICH = True
except ImportError:
    HAS_RICH = False
    console = None


# =============================================================================
# Configuration
# =============================================================================

MODELS = {
    # Small & Fast
    "qwen": "Qwen/Qwen2.5-0.5B-Instruct",
    "qwen-1.5b": "Qwen/Qwen2.5-1.5B-Instruct",
    "smollm2": "HuggingFaceTB/SmolLM2-1.7B-Instruct",
    "llama-1b": "meta-llama/Llama-3.2-1B-Instruct",
    
    # Medium
    "gemma3": "google/gemma-3-1b-it",
    "llama-3b": "meta-llama/Llama-3.2-3B-Instruct",
    "phi4": "microsoft/phi-4",
    
    # Larger (needs GPU)
    "qwen-7b": "Qwen/Qwen2.5-7B-Instruct",
    "mistral": "mistralai/Mistral-7B-Instruct-v0.3",
    "llama-8b": "meta-llama/Llama-3.1-8B-Instruct",
}

DEFAULT_MODEL = "qwen"


# =============================================================================
# Data Structures
# =============================================================================

@dataclass
class ToolCall:
    """
    A tool call made by the agent.
    
    In the unified model, RAG/search is just another tool:
    - knowledge_search, web_search → RAG/retrieval
    - order_lookup, flight_search → API calls
    """
    name: str
    args: Dict[str, Any]
    output: str


@dataclass
class AgentTrace:
    """Complete trace of agent execution."""
    query: str
    history: List[Dict[str, str]]
    tools: List[ToolCall]
    
    def format_tools(self) -> str:
        """Format all tool outputs as text."""
        return "\n\n".join(
            f"[{t.name}({t.args})]\n{t.output}" 
            for t in self.tools
        )
    
    def format_history(self) -> str:
        """Format conversation history as text."""
        return "\n".join(
            f"{t['role'].title()}: {t['content']}" 
            for t in self.history
        )


# =============================================================================
# Attributor
# =============================================================================

class AgentAttributor:
    """
    LOO-based attribution for LLM agents.
    
    Measures: log P(output | full context) - log P(output | context - source)
    Positive score = source helped generate this output
    """
    
    def __init__(self, model_name: str):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        
        if HAS_RICH:
            console.print(f"[dim]Loading {model_name}...[/dim]")
        
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(model_name).to(self.device)
        self.model.eval()
        
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
    
    def _log_prob(self, prompt: str, completion: str) -> float:
        """Compute log P(completion | prompt)."""
        full = prompt + completion
        inputs = self.tokenizer(full, return_tensors="pt", truncation=True, max_length=2048)
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        prompt_len = self.tokenizer(prompt, return_tensors="pt")["input_ids"].shape[1]
        
        with torch.no_grad():
            logits = self.model(**inputs).logits
            log_probs = torch.log_softmax(logits, dim=-1)
            
            total = 0.0
            for i in range(prompt_len, inputs["input_ids"].shape[1]):
                token_id = inputs["input_ids"][0, i]
                if i > 0:
                    total += log_probs[0, i-1, token_id].item()
        
        return total
    
    def _generate(self, prompt: str, max_tokens: int = 150) -> str:
        """Generate completion from prompt."""
        inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True, max_length=2048)
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=max_tokens,
                do_sample=False,
                pad_token_id=self.tokenizer.pad_token_id
            )
        
        return self.tokenizer.decode(
            outputs[0][inputs["input_ids"].shape[1]:],
            skip_special_tokens=True
        ).strip()
    
    def attribute_tool_selection(
        self, 
        trace: AgentTrace, 
        tool_idx: int
    ) -> Dict[str, Any]:
        """
        Why did the agent call this tool?
        
        Attributes to: conversation history + previous tool outputs
        """
        start = time.time()
        
        target = trace.tools[tool_idx]
        tool_str = f"{target.name}({target.args})"
        prev_tools = trace.tools[:tool_idx]
        
        def build_prompt(hist: str, tools: str) -> str:
            parts = []
            if hist:
                parts.append(f"Conversation:\n{hist}")
            if tools:
                parts.append(f"Tool Results:\n{tools}")
            parts.append(f"Query: {trace.query}")
            parts.append("Agent calls:")
            return "\n\n".join(parts)
        
        hist_text = trace.format_history()
        tools_text = "\n\n".join(f"[{t.name}({t.args})]\n{t.output}" for t in prev_tools)
        
        baseline = self._log_prob(build_prompt(hist_text, tools_text), tool_str)
        scores = {}
        
        # Attribute to history turns
        for i, turn in enumerate(trace.history):
            ablated = [t for j, t in enumerate(trace.history) if j != i]
            ablated_hist = "\n".join(f"{t['role'].title()}: {t['content']}" for t in ablated)
            ablated_prob = self._log_prob(build_prompt(ablated_hist, tools_text), tool_str)
            scores[f"History[{i}]: {turn['content'][:35]}..."] = baseline - ablated_prob
        
        # Attribute to previous tools
        for i, tool in enumerate(prev_tools):
            ablated = [t for j, t in enumerate(prev_tools) if j != i]
            ablated_tools = "\n\n".join(f"[{t.name}({t.args})]\n{t.output}" for t in ablated)
            ablated_prob = self._log_prob(build_prompt(hist_text, ablated_tools), tool_str)
            scores[f"Tool: {tool.name}"] = baseline - ablated_prob
        
        return {
            "type": "tool_selection",
            "tool": tool_str,
            "scores": scores,
            "time": time.time() - start
        }
    
    def attribute_response(
        self, 
        trace: AgentTrace, 
        response: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        What tool outputs informed the response?
        
        Attributes to: all tool outputs
        """
        start = time.time()
        
        def build_prompt(tools: str) -> str:
            parts = []
            if tools:
                parts.append(f"Tool Results:\n{tools}")
            parts.append(f"Query: {trace.query}")
            parts.append("Assistant:")
            return "\n\n".join(parts)
        
        tools_text = trace.format_tools()
        
        if response is None:
            response = self._generate(build_prompt(tools_text))
        
        baseline = self._log_prob(build_prompt(tools_text), response)
        scores = {}
        
        for i, tool in enumerate(trace.tools):
            ablated = [t for j, t in enumerate(trace.tools) if j != i]
            ablated_tools = "\n\n".join(f"[{t.name}({t.args})]\n{t.output}" for t in ablated)
            ablated_prob = self._log_prob(build_prompt(ablated_tools), response)
            scores[tool.name] = baseline - ablated_prob
        
        return {
            "type": "response",
            "response": response,
            "scores": scores,
            "time": time.time() - start
        }


# =============================================================================
# Example Scenarios
# =============================================================================

def scenario_customer_support() -> Tuple[AgentTrace, int]:
    """Customer support: RAG for policies + API for order lookup."""
    trace = AgentTrace(
        query="I want to return this item, is it too late?",
        history=[
            {"role": "user", "content": "Hi, I ordered a laptop last month"},
            {"role": "assistant", "content": "Hello! Could you provide your order number?"},
            {"role": "user", "content": "Yes, it's ORDER-98234"},
            {"role": "assistant", "content": "Let me look that up for you."},
        ],
        tools=[
            ToolCall(
                name="knowledge_search",
                args={"query": "return policy electronics"},
                output="""Results:
1. [Return Policy] Items can be returned within 30 days. Electronics: 15-day window.
2. [Refund Process] Refunds processed within 5-7 business days."""
            ),
            ToolCall(
                name="order_lookup",
                args={"order_id": "ORDER-98234"},
                output="ORDER-98234: MacBook Pro, purchased 2024-12-10 (18 days ago), Delivered"
            ),
        ]
    )
    return trace, 1  # Attribute order_lookup


def scenario_travel_agent() -> Tuple[AgentTrace, int]:
    """Travel agent: RAG for destination + APIs for flights/hotels."""
    trace = AgentTrace(
        query="Find me flights and hotel recommendations",
        history=[
            {"role": "user", "content": "Planning a trip to Tokyo next month"},
            {"role": "assistant", "content": "When are you traveling?"},
            {"role": "user", "content": "January 15-22, from San Francisco"},
        ],
        tools=[
            ToolCall(
                name="destination_search",
                args={"query": "Tokyo travel January"},
                output="""Results:
1. [Tokyo Guide] January: cold (2-10°C), less crowded. Airports: NRT, HND.
2. [SFO-Tokyo] Direct flights: United, ANA, JAL. ~11 hours. $800-1500 RT."""
            ),
            ToolCall(
                name="flight_search",
                args={"origin": "SFO", "dest": "TYO", "dates": "Jan 15-22"},
                output="Best: United UA837 Jan 15 11:30am $892 RT, ANA NH7 1:15pm $945 RT"
            ),
            ToolCall(
                name="hotel_search",
                args={"city": "Tokyo", "dates": "Jan 15-22"},
                output="Top: Shinjuku Granbell $120/night, Shibuya Excel $150/night"
            ),
        ]
    )
    return trace, 1  # Attribute flight_search


def scenario_research() -> Tuple[AgentTrace, int]:
    """Research agent: Web search + paper search."""
    trace = AgentTrace(
        query="What's the latest on LLM context attribution?",
        history=[
            {"role": "user", "content": "I'm writing a survey on interpretability"},
            {"role": "assistant", "content": "What aspect interests you?"},
            {"role": "user", "content": "How to attribute LLM outputs to context"},
        ],
        tools=[
            ToolCall(
                name="web_search",
                args={"query": "LLM context attribution 2024"},
                output="""1. [Anthropic] Circuit tracing: 30M interpretable features
2. [MIT] ContextCite: SOTA RAG attribution, 32 forward passes"""
            ),
            ToolCall(
                name="paper_search",
                args={"query": "context attribution LLM 2024"},
                output="""1. [NeurIPS 2024] ContextCite: Linear surrogates for attribution
2. [ACL 2025] TokenShapley: +11-23% accuracy improvement"""
            ),
        ]
    )
    return trace, 1  # Attribute paper_search


# =============================================================================
# Visualization
# =============================================================================

def show_results(result: Dict[str, Any], title: str):
    """Display attribution results."""
    if not HAS_RICH:
        print(f"\n{title}")
        print("=" * 50)
        for src, score in sorted(result['scores'].items(), key=lambda x: -x[1]):
            print(f"  {score:+8.2f} | {src}")
        print(f"  Time: {result['time']:.1f}s")
        return
    
    console.print()
    
    # Header
    if result['type'] == 'tool_selection':
        console.print(Panel(f"[bold]Tool:[/bold] {result['tool']}", 
                           title=f"🔧 {title}", border_style="cyan"))
    else:
        preview = result['response'][:180] + "..." if len(result['response']) > 180 else result['response']
        console.print(Panel(f"[bold]Response:[/bold] {preview}", 
                           title=f"💬 {title}", border_style="green"))
    
    # Scores table
    table = Table(title=f"Attribution Scores", box=box.ROUNDED)
    table.add_column("Rank", width=4, justify="center")
    table.add_column("Source", width=45)
    table.add_column("Score", width=10, justify="right")
    table.add_column("Type", width=10)
    
    sorted_scores = sorted(result['scores'].items(), key=lambda x: -x[1])
    for rank, (src, score) in enumerate(sorted_scores, 1):
        # Determine type
        if src.startswith("History"):
            src_type = "[yellow]History[/yellow]"
        elif "search" in src.lower():
            src_type = "[blue]Search[/blue]"
        else:
            src_type = "[cyan]Tool[/cyan]"
        
        # Format score
        if score > 1:
            score_str = f"[green]+{score:.2f}[/green]"
        elif score < -1:
            score_str = f"[red]{score:.2f}[/red]"
        else:
            score_str = f"[dim]{score:.2f}[/dim]"
        
        table.add_row(str(rank), src[:45], score_str, src_type)
    
    console.print(table)
    console.print(f"[dim]Completed in {result['time']:.1f}s[/dim]")


# =============================================================================
# Main
# =============================================================================

def main(model_key: str = DEFAULT_MODEL):
    """Run the attribution demo."""
    model_name = MODELS.get(model_key, model_key)
    
    if HAS_RICH:
        console.print(Panel.fit(
            "[bold]Agent Attribution Demo[/bold]\n\n"
            "[cyan]Unified Tool Model:[/cyan] RAG = search tool\n\n"
            "• [blue]knowledge_search[/blue] → RAG/vector search\n"
            "• [cyan]order_lookup[/cyan] → Database API\n"
            "• [cyan]flight_search[/cyan] → External API\n\n"
            f"Model: [green]{model_name}[/green]",
            title="🔧 LOO Attribution",
            border_style="cyan"
        ))
    
    attr = AgentAttributor(model_name)
    
    # Scenario 1: Customer Support
    if HAS_RICH:
        console.print()
        console.rule("[bold]Scenario 1: Customer Support[/bold]")
    
    trace1, idx1 = scenario_customer_support()
    show_results(attr.attribute_tool_selection(trace1, idx1), "Why call order_lookup?")
    show_results(attr.attribute_response(trace1), "What informed the response?")
    
    # Scenario 2: Travel Agent
    if HAS_RICH:
        console.print()
        console.rule("[bold]Scenario 2: Travel Agent[/bold]")
    
    trace2, idx2 = scenario_travel_agent()
    show_results(attr.attribute_tool_selection(trace2, idx2), "Why call flight_search?")
    show_results(attr.attribute_response(trace2), "What informed the response?")
    
    # Scenario 3: Research
    if HAS_RICH:
        console.print()
        console.rule("[bold]Scenario 3: Research Agent[/bold]")
    
    trace3, _ = scenario_research()
    show_results(attr.attribute_response(trace3), "What informed the response?")
    
    # Summary
    if HAS_RICH:
        console.print()
        console.print(Panel(
            "[bold]Key Insights:[/bold]\n\n"
            "1. [blue]Unified Model[/blue]: RAG and APIs are all just tools\n"
            "2. [cyan]LOO Attribution[/cyan]: O(n) forward passes\n"
            "3. [yellow]Tool Selection[/yellow]: history + prev tools → tool call\n"
            "4. [green]Response[/green]: all tool outputs → final answer",
            title="📖 Summary",
            border_style="dim"
        ))


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        arg = sys.argv[1].lower()
        if arg in ("--help", "-h"):
            print(__doc__)
            print("\nAvailable models:")
            for k, v in MODELS.items():
                default = " (default)" if k == DEFAULT_MODEL else ""
                print(f"  {k:12} → {v}{default}")
            sys.exit(0)
        main(arg)
    else:
        main()

