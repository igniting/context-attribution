import React, { useState } from 'react';
import { Bot, Wrench, MessageSquare, ArrowRight, CheckCircle, ExternalLink, Zap, Scale, Github } from 'lucide-react';
import { Slide } from '../components';

const AgentAttributionSlide = () => {
  const [activeTab, setActiveTab] = useState('loo');

  // Real example data from unified tool model experiments
  const toolSelectionExample = {
    toolCall: "order_lookup({'order_id': 'ORDER-98234'})",
    sources: [
      { type: 'History', text: "Yes, it's ORDER-98234...", score: 22.99, rank: 1 },
      { type: 'Tool', text: "knowledge_search (RAG)", score: 11.72, rank: 2 },
      { type: 'History', text: "Hello! Could you provide...", score: -0.17, rank: 3 },
      { type: 'History', text: "Let me look that up...", score: -0.46, rank: 4 },
    ]
  };

  const responseExample = {
    response: "According to our return policy, electronics have a 15-day window...",
    sources: [
      { type: 'Tool', text: "knowledge_search (RAG)", score: 28.39, rank: 1 },
      { type: 'Tool', text: "order_lookup (API)", score: 5.73, rank: 2 },
    ]
  };

  const looVsShapley = [
    { method: 'LOO', complexity: 'O(n)', interactions: 'No', speed: '~5s', bestFor: 'Independent sources' },
    { method: 'Shapley', complexity: 'O(n! or MC)', interactions: 'Yes', speed: '~30s', bestFor: 'Interacting sources' },
  ];

  const modelComparison = [
    { model: 'Qwen-1.5B', toolScore: '+58', ragScore: '+9', notes: 'Clear separation, high scores' },
    { model: 'Gemma-3-1B', toolScore: '+10', ragScore: '+1', notes: 'Lower magnitude, same ranking' },
  ];

  return (
    <Slide className="bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Bot className="w-8 h-8 text-blue-600" />
          Agent Attribution: Tools + RAG
        </h2>
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
          <Github className="w-3 h-3" /> demos/agent_attribution.py
        </span>
      </div>

      <p className="text-gray-600 mb-4">
        End-to-end traceability for LLM agents: attribute both tool selection and response generation using log-probability differences
      </p>

      {/* Two Attribution Types */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Tool Selection Attribution */}
        <div className="bg-white rounded-xl border border-blue-200 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Wrench className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Tool Selection</h3>
              <span className="text-xs text-gray-500">Why call this tool?</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-2 mb-3 border border-blue-100">
            <code className="text-xs text-blue-800">{toolSelectionExample.toolCall}</code>
          </div>

          <div className="space-y-1.5">
            {toolSelectionExample.sources.map((src, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-4 text-gray-400">{src.rank}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs ${
                  src.type === 'History' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {src.type}
                </span>
                <span className="flex-1 text-gray-600 truncate">{src.text}</span>
                <span className="font-mono text-blue-600">+{src.score.toFixed(1)}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-blue-100 text-xs text-blue-700">
            <strong>Finding:</strong> History turn with order number drives tool call
          </div>
        </div>

        {/* Response Attribution */}
        <div className="bg-white rounded-xl border border-emerald-200 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-emerald-100">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Response Generation</h3>
              <span className="text-xs text-gray-500">What informed the answer?</span>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-lg p-2 mb-3 border border-emerald-100">
            <span className="text-xs text-emerald-800">{responseExample.response}</span>
          </div>

          <div className="space-y-1.5">
            {responseExample.sources.map((src, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-4 text-gray-400">{src.rank}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs ${
                  src.type === 'Tool' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {src.type}
                </span>
                <span className="flex-1 text-gray-600 truncate">{src.text}</span>
                <span className="font-mono text-emerald-600">+{src.score.toFixed(1)}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-emerald-100 text-xs text-emerald-700">
            <strong>Finding:</strong> Tool output dominates (6x higher than RAG)
          </div>
        </div>
      </div>

      {/* Method Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-4">
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setActiveTab('loo')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              activeTab === 'loo' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Zap className="w-4 h-4 inline mr-1" />
            Leave-One-Out (LOO)
          </button>
          <button
            onClick={() => setActiveTab('shapley')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              activeTab === 'shapley' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Scale className="w-4 h-4 inline mr-1" />
            Shapley Values
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              activeTab === 'models' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Model Comparison
          </button>
        </div>

        {activeTab === 'loo' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Algorithm</h4>
              <ol className="space-y-1.5 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0">1</span>
                  <span>Compute baseline: log P(response | all sources)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0">2</span>
                  <span>For each source i: log P(response | all except i)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0">3</span>
                  <span>Attribution[i] = baseline − ablated[i]</span>
                </li>
              </ol>
              <div className="mt-2 bg-blue-50 rounded-lg p-2 text-xs text-blue-800 border border-blue-100">
                <strong>Complexity:</strong> O(n) forward passes, batchable for speed
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">When to Use LOO</h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Sources are <strong>independent</strong> (typical RAG)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Need <strong>fast attribution</strong> in production</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>One source contains the answer (typical case)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Tool outputs are self-contained</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shapley' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">When Shapley Differs from LOO</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="bg-purple-50 rounded-lg p-2 border border-purple-100">
                  <strong className="text-purple-800">Corroborating Sources:</strong>
                  <p className="text-purple-700 mt-1">If two sources say the same thing, Shapley distributes credit fairly; LOO underestimates both.</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-2 border border-purple-100">
                  <strong className="text-purple-800">Complementary Sources:</strong>
                  <p className="text-purple-700 mt-1">If source A needs source B to be useful, Shapley captures this; LOO may miss it.</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Comparison</h4>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-1 text-gray-600">Method</th>
                    <th className="text-center py-1 text-gray-600">Cost</th>
                    <th className="text-center py-1 text-gray-600">Interactions</th>
                  </tr>
                </thead>
                <tbody>
                  {looVsShapley.map((row) => (
                    <tr key={row.method} className="border-b border-gray-100">
                      <td className="py-1.5 font-medium">{row.method}</td>
                      <td className="py-1.5 text-center">{row.complexity}</td>
                      <td className="py-1.5 text-center">{row.interactions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-2 bg-gray-50 rounded-lg p-2 text-xs text-gray-700 border">
                <strong>Practical advice:</strong> Start with LOO. Use Shapley only if you suspect source interactions.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Attribution Across Different LLMs</h4>
            <table className="w-full text-xs mb-3">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-1.5 text-gray-600">Model</th>
                  <th className="text-center py-1.5 text-gray-600">Tool Score</th>
                  <th className="text-center py-1.5 text-gray-600">RAG Score</th>
                  <th className="text-left py-1.5 text-gray-600">Notes</th>
                </tr>
              </thead>
              <tbody>
                {modelComparison.map((row) => (
                  <tr key={row.model} className="border-b border-gray-100">
                    <td className="py-1.5 font-medium">{row.model}</td>
                    <td className="py-1.5 text-center font-mono text-orange-600">{row.toolScore}</td>
                    <td className="py-1.5 text-center font-mono text-emerald-600">{row.ragScore}</td>
                    <td className="py-1.5 text-gray-600">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-emerald-50 rounded-lg p-2 text-xs text-emerald-800 border border-emerald-100">
              <strong>Key Finding:</strong> Absolute scores vary by model, but <strong>relative rankings are consistent</strong>. 
              The approach is model-agnostic — swap models freely.
            </div>
          </div>
        )}
      </div>

      {/* Key Insight */}
      <div className="bg-slate-900 rounded-xl p-4 text-white">
        <div className="flex items-start gap-3">
          <Bot className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="text-blue-300">Unified Tool Model:</strong>
            <span className="text-slate-200 ml-1">
              RAG is just another tool (knowledge_search). Log-prob LOO provides fast O(n) attribution for both 
              tool selection and response generation. Rankings are consistent across Qwen, Gemma, and Llama.
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default AgentAttributionSlide;

