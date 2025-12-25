import React, { useState } from 'react';
import { Layers, Sparkles, Target, Clock, Brain, ExternalLink, CheckCircle } from 'lucide-react';
import { Slide } from '../components';

const AdvancedMethodsSlide = () => {
  const [activeMethod, setActiveMethod] = useState('tokenshapley');

  const methods = {
    tokenshapley: {
      name: 'TokenShapley',
      venue: 'ACL Findings 2025',
      icon: Target,
      color: 'indigo'
    },
    attribot: {
      name: 'AttriBoT',
      venue: '2024',
      icon: Clock,
      color: 'cyan'
    },
    tracllm: {
      name: 'TracLLM',
      venue: '2025',
      icon: Layers,
      color: 'purple'
    },
    at2: {
      name: 'AT2',
      venue: '2025',
      icon: Brain,
      color: 'emerald'
    }
  };

  const getColorClass = (color, isActive) => {
    const colors = {
      indigo: isActive ? 'bg-indigo-600 text-white' : 'bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50',
      cyan: isActive ? 'bg-cyan-600 text-white' : 'bg-white border-cyan-200 text-cyan-700 hover:bg-cyan-50',
      purple: isActive ? 'bg-purple-600 text-white' : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50',
      emerald: isActive ? 'bg-emerald-600 text-white' : 'bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50'
    };
    return colors[color];
  };

  return (
    <Slide
      className="bg-gradient-to-br from-indigo-50 via-white to-purple-50"
      references={['tokenShapley', 'attriBot', 'tracLLM', 'at2']}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-indigo-500" />
        Advanced Attribution Methods (2024-2025)
      </h2>

      <p className="text-gray-600 mb-4">
        Cutting-edge research addressing efficiency, granularity, and scalability challenges
      </p>

      {/* Method Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(methods).map(([key, method]) => (
          <button
            key={key}
            onClick={() => setActiveMethod(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border flex items-center gap-2 ${getColorClass(method.color, activeMethod === key)}`}
          >
            <method.icon className="w-4 h-4" />
            {method.name}
            <span className="text-xs opacity-70">({method.venue})</span>
          </button>
        ))}
      </div>

      {/* TokenShapley */}
      {activeMethod === 'tokenshapley' && (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl p-4 border border-indigo-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">TokenShapley: Token-Level Shapley Values</h3>
              <a
                href="https://arxiv.org/abs/2507.05261"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <ExternalLink className="w-3 h-3" /> arXiv
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Key Innovation</h4>
                <p className="text-gray-600 text-xs mb-3">
                  Fine-grained <strong>token-level</strong> attribution instead of sentence-level. Critical for 
                  attributing specific values like numbers, years, and names.
                </p>
                <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                  <div className="text-indigo-700 text-xs mb-1">Example: "The treaty was signed in <strong>1648</strong>"</div>
                  <div className="text-indigo-600 text-xs">
                    TokenShapley attributes specifically to the token "1648" rather than the entire sentence.
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Methodology</h4>
                <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs mb-2">
                  <div className="text-indigo-600 mb-1">// Shapley value for token t</div>
                  <div className="text-gray-700">
                    φ(t) = Σ<sub>S⊆T\{"{t}"}</sub> [v(S∪{"{t}"}) − v(S)] × w(S)
                  </div>
                </div>
                <p className="text-gray-600 text-xs">
                  Combines Shapley values with KNN retrieval for efficient approximation.
                </p>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
              <h4 className="font-semibold text-indigo-800 text-sm mb-2">Results</h4>
              <div className="grid md:grid-cols-3 gap-2 text-xs">
                <div className="bg-white rounded p-2 border">
                  <div className="font-bold text-indigo-600">+11-23%</div>
                  <div className="text-gray-600">Accuracy improvement over baselines</div>
                </div>
                <div className="bg-white rounded p-2 border">
                  <div className="font-bold text-indigo-600">Keywords</div>
                  <div className="text-gray-600">Numbers, years, names specifically attributed</div>
                </div>
                <div className="bg-white rounded p-2 border">
                  <div className="font-bold text-indigo-600">KNN</div>
                  <div className="text-gray-600">Efficient approximation via retrieval</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AttriBoT */}
      {activeMethod === 'attribot' && (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl p-4 border border-cyan-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">AttriBoT: Efficient Leave-One-Out Attribution</h3>
              <a
                href="https://arxiv.org/abs/2411.15102"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <ExternalLink className="w-3 h-3" /> arXiv
              </a>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl font-bold text-cyan-600">{">"}300×</div>
              <div className="text-gray-600 text-sm">
                speedup for LOO attribution<br />
                using bag of tricks
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
                <h4 className="font-semibold text-cyan-800 text-sm mb-2">Cached Activations</h4>
                <p className="text-cyan-700 text-xs">
                  Reuse intermediate activations across ablation runs. Avoids redundant forward passes.
                </p>
              </div>

              <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
                <h4 className="font-semibold text-cyan-800 text-sm mb-2">Hierarchical Attribution</h4>
                <p className="text-cyan-700 text-xs">
                  Start with coarse (paragraph) attribution, then refine to sentence level only where needed.
                </p>
              </div>

              <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
                <h4 className="font-semibold text-cyan-800 text-sm mb-2">Proxy Models</h4>
                <p className="text-cyan-700 text-xs">
                  Use smaller model (Llama 8B) for attribution, apply to larger (70B). Transfers well.
                </p>
              </div>
            </div>

            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
              <h4 className="font-semibold text-cyan-800 text-sm mb-2">Key Finding</h4>
              <p className="text-cyan-700 text-xs">
                <strong>More faithful to human annotations than target model LOO.</strong> The proxy model's 
                attributions better match what humans consider important.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TracLLM */}
      {activeMethod === 'tracllm' && (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">TracLLM: Long Context Traceback</h3>
              <a
                href="https://arxiv.org/abs/2506.04202"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <ExternalLink className="w-3 h-3" /> arXiv
              </a>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Generic framework for attributing long context LLMs — debugging, forensic analysis, and trust verification.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Technical Approach</h4>
                <div className="space-y-2">
                  <div className="bg-purple-50 rounded-lg p-2 border border-purple-100">
                    <div className="font-medium text-purple-800 text-xs">Contribution Score Denoising</div>
                    <p className="text-purple-700 text-xs">Removes noise from raw attention scores</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-2 border border-purple-100">
                    <div className="font-medium text-purple-800 text-xs">Ensemble Methods</div>
                    <p className="text-purple-700 text-xs">Combines multiple attribution signals</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Results</h4>
                <div className="space-y-2">
                  <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="font-bold text-emerald-700 text-sm">89%</span>
                    </div>
                    <p className="text-emerald-600 text-xs">PoisonedRAG injected texts identified</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100">
                    <p className="text-emerald-700 text-xs">
                      Outperforms gradient, perturbation, and citation baselines on long-context QA.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
              <h4 className="font-semibold text-purple-800 text-sm mb-1">Use Cases</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-white text-purple-700 border border-purple-200">Debugging</span>
                <span className="px-2 py-1 rounded bg-white text-purple-700 border border-purple-200">Forensic Analysis</span>
                <span className="px-2 py-1 rounded bg-white text-purple-700 border border-purple-200">Trust Verification</span>
                <span className="px-2 py-1 rounded bg-white text-purple-700 border border-purple-200">Poison Detection</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AT2 */}
      {activeMethod === 'at2' && (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">AT2: Attention as Learnable Features</h3>
              <a
                href="https://arxiv.org/abs/2504.13752"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <ExternalLink className="w-3 h-3" /> arXiv
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Core Insight</h4>
                <p className="text-gray-600 text-xs mb-3">
                  Instead of using raw attention weights (unreliable), treat attention as 
                  <strong> learnable features</strong> for a trained attribution model.
                </p>
                <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                  <div className="font-mono text-xs text-emerald-700 mb-1">
                    Attribution(c) = f<sub>θ</sub>(A<sub>1</sub>, A<sub>2</sub>, ..., A<sub>L</sub>)
                  </div>
                  <p className="text-emerald-600 text-xs">
                    Learns to combine attention patterns from all layers
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Advantages</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      <strong>On par with ablation methods</strong> in accuracy
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      <strong>Significantly more efficient</strong> — no re-running model
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      Useful for <strong>context pruning</strong> in QA systems
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
              <h4 className="font-semibold text-emerald-800 text-sm mb-1">Training Process</h4>
              <p className="text-emerald-700 text-xs">
                Train on dataset with ground-truth attributions (from expensive ablation methods).
                At inference, use learned model to predict attributions in single forward pass.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-indigo-900 rounded-xl p-3 text-white">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="text-indigo-200">Research Trend:</strong>
            <span className="text-indigo-100 ml-1">
              2024-2025 attribution research focuses on efficiency (AttriBoT, AT2), 
              granularity (TokenShapley), and long-context handling (TracLLM). 
              Production systems can now achieve ablation-quality attribution at practical speeds.
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default AdvancedMethodsSlide;

