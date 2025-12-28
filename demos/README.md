# Agent Attribution Demos

Python demos for Leave-One-Out (LOO) attribution in LLM agents.

## Quick Start

```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run demo
python agent_attribution.py
```

## Usage

```bash
# Default model (Qwen-0.5B, fast)
python agent_attribution.py

# Specify model
python agent_attribution.py gemma3
python agent_attribution.py qwen-1.5b
python agent_attribution.py llama-1b

# List available models
python agent_attribution.py --help
```

## Key Concepts

### Unified Tool Model

RAG is modeled as just another tool:
- `knowledge_search` → RAG/vector search
- `web_search` → Web search API  
- `order_lookup` → Database query
- `flight_search` → External API

All tool outputs are attributed uniformly using the same LOO method.

### Two Types of Attribution

1. **Tool Selection**: Why did the agent call this tool?
   - Attributed to: conversation history + previous tool outputs
   
2. **Response Generation**: What informed the final response?
   - Attributed to: all tool outputs

### LOO Attribution

For each source, we measure:

```
score = log P(output | all sources) - log P(output | all sources except this one)
```

- **Positive score**: Source helped generate this output
- **Negative score**: Source was distracting
- **Near zero**: Source was irrelevant

Complexity: O(n) forward passes for n sources.

## Example Output

```
Scenario 1: Customer Support
Tools: knowledge_search (RAG) → order_lookup (API)

🔧 Why call order_lookup?
┌──────┬─────────────────────────────────────┬──────────┐
│ Rank │ Source                              │ Score    │
├──────┼─────────────────────────────────────┼──────────┤
│  1   │ History[2]: Yes, it's ORDER-98234   │ +22.99   │
│  2   │ Tool: knowledge_search              │ +11.72   │
└──────┴─────────────────────────────────────┴──────────┘

💬 What informed the response?
┌──────┬─────────────────────────────────────┬──────────┐
│ Rank │ Source                              │ Score    │
├──────┼─────────────────────────────────────┼──────────┤
│  1   │ knowledge_search                    │ +28.39   │
│  2   │ order_lookup                        │ +5.73    │
└──────┴─────────────────────────────────────┴──────────┘
```

## Model Comparison

Different models show different attribution patterns:

| Model | Tool Selection | Response Attribution | Notes |
|-------|----------------|---------------------|-------|
| Qwen-0.5B | Sharp | Selective | Fast, good for testing |
| Gemma-3 | Sharp | Synthesizing | Better at combining sources |
| Llama-1B | Very sharp | Balanced | More RAG utilization |

**Key finding**: Relative rankings are consistent across models, even though absolute scores vary.

## Related

- [ContextCite paper](https://arxiv.org/abs/2409.00729) - LASSO-based attribution
- [Captum LLM Attribution](https://captum.ai) - Gradient-based methods
- [AttriBoT](https://arxiv.org/abs/2411.15102) - 300x speedup for LOO

