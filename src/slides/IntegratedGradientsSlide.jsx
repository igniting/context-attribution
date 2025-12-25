import React, { useState } from 'react';
import { Zap, CheckCircle, XCircle, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';
import { Slide } from '../components';

const IntegratedGradientsSlide = () => {
  const [activeTab, setActiveTab] = useState('axioms');

  return (
    <Slide
      className="bg-gradient-to-br from-amber-50 via-white to-orange-50"
      references={['integratedGradients', 'gim', 'contextCite']}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Zap className="w-8 h-8 text-amber-500" />
        Gradient-Based Attribution: Mathematical Foundations
      </h2>

      <p className="text-gray-600 mb-4">
        Sundararajan et al. (ICML 2017) — Axiomatic approach to feature attribution
      </p>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4">
        {[
          { id: 'axioms', label: 'Axioms' },
          { id: 'formula', label: 'IG Formulation' },
          { id: 'selfrepair', label: 'Attention Self-Repair' },
          { id: 'gim', label: 'GIM Framework' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white'
                : 'bg-white border border-amber-200 text-amber-700 hover:bg-amber-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Axioms Tab */}
      {activeTab === 'axioms' && (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Attribution Axioms (Sundararajan et al.)</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <h4 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Sensitivity
                </h4>
                <p className="text-amber-700 text-xs mb-2">
                  If changing one feature changes the output, that feature must receive non-zero attribution.
                </p>
                <div className="bg-white rounded p-2 font-mono text-xs text-gray-700">
                  F(x) ≠ F(x') ⟹ Attribution(xᵢ) ≠ 0
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <h4 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Implementation Invariance
                </h4>
                <p className="text-amber-700 text-xs mb-2">
                  Two networks with identical outputs must have identical attributions, regardless of implementation.
                </p>
                <div className="bg-white rounded p-2 font-mono text-xs text-gray-700">
                  F₁(x) = F₂(x) ∀x ⟹ Attr₁ = Attr₂
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <h4 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Completeness
                </h4>
                <p className="text-amber-700 text-xs mb-2">
                  Sum of all attributions equals the difference between output at input vs baseline.
                </p>
                <div className="bg-white rounded p-2 font-mono text-xs text-gray-700">
                  Σᵢ Attrᵢ(x) = F(x) − F(x')
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <h4 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Linearity
                </h4>
                <p className="text-amber-700 text-xs mb-2">
                  For linear combinations of models, attributions combine linearly.
                </p>
                <div className="bg-white rounded p-2 font-mono text-xs text-gray-700">
                  Attr(αF + βG) = αAttr(F) + βAttr(G)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formula Tab */}
      {activeTab === 'formula' && (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Integrated Gradients Formulation</h3>

            <div className="bg-gray-900 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
              <div className="text-amber-400 mb-2">// Integrated Gradients for feature i</div>
              <div className="text-white">
                IG<sub>i</sub>(x) = (x<sub>i</sub> − x'<sub>i</sub>) × <span className="text-cyan-400">∫</span><sup className="text-gray-400">1</sup><sub className="text-gray-400">α=0</sub>{' '}
                <span className="text-green-400">∂F(x' + α(x − x'))</span> / <span className="text-green-400">∂x<sub>i</sub></span> dα
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">x'</h4>
                <p className="text-gray-600 text-xs">
                  Baseline input (e.g., zero embedding, empty string, or masked input)
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">α ∈ [0, 1]</h4>
                <p className="text-gray-600 text-xs">
                  Interpolation parameter along path from baseline to input
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">∂F/∂xᵢ</h4>
                <p className="text-gray-600 text-xs">
                  Gradient of model output with respect to feature i
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <h4 className="font-semibold text-gray-700 text-sm mb-2">Practical Approximation (Riemann Sum)</h4>
              <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs">
                IG<sub>i</sub>(x) ≈ (x<sub>i</sub> − x'<sub>i</sub>) × (1/m) × Σ<sub>k=1</sub><sup>m</sup> ∂F(x' + (k/m)(x − x')) / ∂x<sub>i</sub>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Typically m = 20-300 steps. More steps = better approximation but higher cost.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Self-Repair Tab */}
      {activeTab === 'selfrepair' && (
        <div className="space-y-3 mb-4">
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-2">
                  The Attention Self-Repair Problem
                </h3>
                <p className="text-red-700 text-sm">
                  Gradient-based attribution fails on transformers because attention mechanisms 
                  <strong> compensate when individual components are ablated</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">Why Gradients Fail on Transformers</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Softmax Saturation</h4>
                <p className="text-gray-600 text-xs mb-2">
                  When attention weights approach 0 or 1, gradients vanish due to softmax saturation,
                  hiding the true importance of attention heads.
                </p>
                <div className="bg-gray-50 rounded-lg p-2 font-mono text-xs">
                  ∂softmax(z)/∂zᵢ → 0 as zᵢ → ±∞
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Redundancy & Compensation</h4>
                <p className="text-gray-600 text-xs mb-2">
                  When one attention head is ablated, other heads adjust to compensate,
                  making individual head importance appear lower than it is.
                </p>
                <div className="bg-gray-50 rounded-lg p-2 font-mono text-xs">
                  Ablate(head<sub>j</sub>) → Σ<sub>i≠j</sub> head<sub>i</sub> compensates
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-gray-700">
                  <strong>Result:</strong> Standard IG attributions do not faithfully reflect component importance in LLMs
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GIM Tab */}
      {activeTab === 'gim' && (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">GIM: Gradient Interaction Modifications (2025)</h3>
              <a
                href="https://arxiv.org/abs/2505.17630"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <ExternalLink className="w-3 h-3" /> arXiv
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                <h4 className="font-semibold text-emerald-800 text-sm mb-2">Temperature-Adjusted Gradients</h4>
                <p className="text-emerald-700 text-xs mb-2">
                  Applies temperature scaling during gradient computation to prevent saturation.
                </p>
                <div className="bg-white rounded p-2 font-mono text-xs text-gray-700">
                  softmax(z/τ) where τ {">"} 1 prevents saturation
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                <h4 className="font-semibold text-emerald-800 text-sm mb-2">LayerNorm Freezing</h4>
                <p className="text-emerald-700 text-xs mb-2">
                  Freezes LayerNorm parameters during gradient computation to prevent cancellation.
                </p>
                <div className="bg-white rounded p-2 font-mono text-xs text-gray-700">
                  ∂LN/∂x computed with frozen μ, σ
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-700 text-sm mb-2">Evaluation Results</h4>
              <div className="grid md:grid-cols-3 gap-2 text-xs">
                <div className="bg-white rounded p-2 border">
                  <div className="font-medium text-gray-800">Gemma 2B/9B</div>
                  <div className="text-emerald-600">Significant improvement over IG</div>
                </div>
                <div className="bg-white rounded p-2 border">
                  <div className="font-medium text-gray-800">LLAMA 1B/3B/8B</div>
                  <div className="text-emerald-600">Better faithfulness scores</div>
                </div>
                <div className="bg-white rounded p-2 border">
                  <div className="font-medium text-gray-800">Qwen 1.5B/3B</div>
                  <div className="text-emerald-600">Outperforms existing methods</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-amber-900 rounded-xl p-3 text-white">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="text-amber-200">Key Takeaway:</strong>
            <span className="text-amber-100 ml-1">
              Standard Integrated Gradients satisfy theoretical axioms but fail on transformers due to 
              self-repair. GIM's temperature adjustment and LayerNorm freezing restore faithfulness.
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default IntegratedGradientsSlide;

