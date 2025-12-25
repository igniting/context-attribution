import React, { useState, useEffect } from 'react';
import { Layers, Info, CheckCircle, XCircle, ExternalLink, Github } from 'lucide-react';
import { Slide } from '../components';

const ContextCiteSlide = () => {
  const [showAblations, setShowAblations] = useState(false);
  const [activeTab, setActiveTab] = useState('method');

  useEffect(() => {
    const timer = setTimeout(() => setShowAblations(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Slide
      className="bg-gradient-to-br from-blue-50 via-white to-cyan-50"
      references={['contextCite', 'camab', 'selfCite', 'gim']}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Layers className="w-8 h-8 text-blue-500" />
        ContextCite: Perturbation-Based Attribution
      </h2>

      <div className="flex items-center gap-4 mb-4">
        <p className="text-lg text-gray-600">
          MIT/MadryLab (NeurIPS 2024) — Sparse linear surrogate for efficient context attribution
        </p>
        <div className="flex gap-2">
          <a
            href="https://arxiv.org/abs/2409.00729"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <ExternalLink className="w-3 h-3" /> arXiv
          </a>
          <a
            href="https://github.com/MadryLab/context-cite"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <Github className="w-3 h-3" /> Code
          </a>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4">
        {[
          { id: 'method', label: 'Methodology' },
          { id: 'math', label: 'LASSO Formulation' },
          { id: 'types', label: 'Attribution Types' },
          { id: 'related', label: 'Related Work' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-blue-200 text-blue-700 hover:bg-blue-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Methodology Tab */}
      {activeTab === 'method' && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Ablation-Based Approach</h3>
            <ol className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <span>Partition context into <code className="bg-gray-100 px-1 rounded">n</code> sources (sentences, paragraphs, or documents)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <span>Generate random binary masks <code className="bg-gray-100 px-1 rounded">m ∈ {"{0,1}"}ⁿ</code> to include/exclude sources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <span>Measure log-probability of target response under each masked context</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                <span>Fit sparse linear model via LASSO to approximate influence scores</span>
              </li>
            </ol>
          </div>

          <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Key Efficiency</h3>
            <div className={`text-center transition-all duration-700 ${showAblations ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="text-5xl font-bold text-blue-600 mb-1">~32</div>
              <div className="text-gray-600 text-sm">ablations needed</div>
              <div className="text-xs text-gray-500 mt-1">Even with hundreds of sources</div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Why so few?</h4>
              <p className="text-xs text-gray-600">
                LASSO's L1 regularization enforces sparsity — most context sources have near-zero influence.
                Random sampling with ~32 ablations provides sufficient signal to identify the few truly influential sources.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LASSO Formulation Tab */}
      {activeTab === 'math' && (
        <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3">LASSO Surrogate Model</h3>

          <div className="bg-gray-50 rounded-lg p-3 mb-3 font-mono text-sm">
            <div className="text-gray-700 mb-2">
              <span className="text-blue-600">minimize</span> ||y - Xβ||² + λ||β||₁
            </div>
            <div className="text-gray-500 text-xs mt-2">
              where: y = log-probabilities, X = ablation masks, β = attribution scores, λ = sparsity penalty
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-3">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-1 text-sm">Response Variable (y)</h4>
              <p className="text-blue-700 text-xs">
                Log-probability of target response tokens under each masked context. Higher values = better support.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-1 text-sm">L1 Regularization (λ||β||₁)</h4>
              <p className="text-blue-700 text-xs">
                Forces most coefficients to exactly zero, identifying the sparse set of influential sources.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-2 text-sm">Comparison to Gradient Methods</h4>
            <div className="grid md:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Model-agnostic:</strong> Works with any LLM API</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Interpretable:</strong> Coefficients = importance</span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>Trade-off:</strong> ~32 forward passes vs 1 backward</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600"><strong>No self-repair:</strong> Avoids attention issues</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attribution Types Tab */}
      {activeTab === 'types' && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h3 className="text-lg font-bold text-emerald-800 mb-2">Corroborative Attribution</h3>
            <p className="text-emerald-700 text-sm mb-2">
              Which sources <em>support</em> the generated statement?
            </p>
            <div className="bg-white rounded-lg p-2 border border-emerald-100 text-xs">
              <div className="font-mono text-gray-600 mb-1">Query: "What causes ocean tides?"</div>
              <div className="font-mono text-gray-600 mb-1">Response: "Tides are caused by the moon's gravity."</div>
              <div className="text-emerald-600 font-medium">→ Which docs contain lunar gravity evidence?</div>
            </div>
            <p className="text-emerald-600 text-xs mt-2">
              <strong>Use case:</strong> Citation verification, fact-checking
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h3 className="text-lg font-bold text-blue-800 mb-2">Contributive Attribution</h3>
            <p className="text-blue-700 text-sm mb-2">
              Which sources <em>caused</em> this specific generation?
            </p>
            <div className="bg-white rounded-lg p-2 border border-blue-100 text-xs">
              <div className="font-mono text-gray-600 mb-1">Query: "What causes ocean tides?"</div>
              <div className="font-mono text-gray-600 mb-1">Response: "Tides occur due to Earth's rotation."</div>
              <div className="text-blue-600 font-medium">→ Which source led to this incorrect claim?</div>
            </div>
            <p className="text-blue-600 text-xs mt-2">
              <strong>Use case:</strong> Debugging, hallucination tracing
            </p>
          </div>
        </div>
      )}

      {/* Related Work Tab */}
      {activeTab === 'related' && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">CAMAB: Multi-Armed Bandit Optimization</h3>
            <p className="text-gray-600 text-sm mb-3">
              Uses Thompson Sampling instead of random ablation selection. More efficient context attribution with fewer queries.
            </p>
            <div className="bg-purple-50 rounded-lg p-3 text-xs">
              <div className="font-semibold text-purple-800 mb-1">Key Improvement:</div>
              <p className="text-purple-700">
                Adaptive sampling focuses ablations on high-uncertainty sources, outperforming ContextCite with fewer LLM calls.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-cyan-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">SelfCite: Self-Supervised Alignment</h3>
            <p className="text-gray-600 text-sm mb-3">
              Uses ablation-based contributive alignment to improve citation quality without human supervision.
            </p>
            <div className="bg-cyan-50 rounded-lg p-3 text-xs">
              <div className="font-semibold text-cyan-800 mb-1">Key Approach:</div>
              <p className="text-cyan-700">
                Self-generated training signal from ablation experiments enables continuous improvement of citation behavior.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-900 rounded-xl p-3 text-white">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="text-blue-200">
              <strong className="text-white">Key insight:</strong> Corroborative ≠ Contributive. A source may support a claim
              without being the reason the model generated it. ContextCite handles both via targeted ablation design.
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default ContextCiteSlide;
