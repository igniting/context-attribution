import React, { useState } from 'react';
import { Database, TrendingUp, AlertTriangle, CheckCircle, XCircle, ExternalLink, Github } from 'lucide-react';
import { Slide } from '../components';

const TrainingDataAttributionSlide = () => {
  const [activeMethod, setActiveMethod] = useState('overview');

  return (
    <Slide
      className="bg-gradient-to-br from-emerald-50 via-white to-teal-50"
      references={['logra', 'influenceFunctionsWork', 'dda', 'airRep']}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Database className="w-8 h-8 text-emerald-500" />
        Training Data Attribution at LLM Scale
      </h2>

      <p className="text-gray-600 mb-4">
        Tracing model predictions back to influential training examples — and why it's harder than expected
      </p>

      {/* Method Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: 'overview', label: 'The Challenge' },
          { id: 'influence', label: 'Influence Functions' },
          { id: 'logra', label: 'LoGra (6500×)' },
          { id: 'alternatives', label: 'Alternatives' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveMethod(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeMethod === tab.id
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeMethod === 'overview' && (
        <div className="space-y-3 mb-4">
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-2">
                  Critical Finding: Influence Functions Fail on LLMs
                </h3>
                <p className="text-red-700 text-sm">
                  Standard influence functions (DataInf, LiSSA) perform poorly on LLM-scale models.
                  Even optimized versions underperform simple baselines for factual attribution.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-red-600 mb-1">~100%</div>
              <div className="text-gray-700 text-sm font-medium">RepSim identification rate</div>
              <div className="text-gray-500 text-xs mt-1">
                Representation similarity achieves near-perfect harmful data identification where influence functions fail
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-amber-600 mb-1">BM25</div>
              <div className="text-gray-700 text-sm font-medium">Often beats TDA</div>
              <div className="text-gray-500 text-xs mt-1">
                Simple retrieval outperforms training data attribution for finding explicit factual sources
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-1">PBRF</div>
              <div className="text-gray-700 text-sm font-medium">Not LOO</div>
              <div className="text-gray-500 text-xs mt-1">
                Influence functions track proximal Bregman response function, not leave-one-out
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Influence Functions Tab */}
      {activeMethod === 'influence' && (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Influence Functions: Mathematical Foundation</h3>

            <div className="bg-gray-900 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
              <div className="text-emerald-400 mb-2">// Influence of training point z on test prediction</div>
              <div className="text-white mb-3">
                I(z, z<sub>test</sub>) = −∇<sub>θ</sub>L(z<sub>test</sub>)<sup>T</sup> · H<sub>θ</sub><sup>−1</sup> · ∇<sub>θ</sub>L(z)
              </div>
              <div className="text-gray-400 text-xs">
                H<sub>θ</sub> = Hessian of empirical risk, requires O(n²) storage for n parameters
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                <h4 className="font-semibold text-emerald-800 text-sm mb-2">DataInf Approximation</h4>
                <p className="text-emerald-700 text-xs">
                  Uses only diagonal of Fisher Information Matrix. O(np) per training point.
                  <span className="block mt-1 font-mono bg-white p-1 rounded">
                    I ≈ g<sub>test</sub><sup>T</sup> · diag(F)<sup>−1</sup> · g<sub>train</sub>
                  </span>
                </p>
              </div>

              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                <h4 className="font-semibold text-emerald-800 text-sm mb-2">LiSSA (Stochastic)</h4>
                <p className="text-emerald-700 text-xs">
                  Iterative stochastic estimation of Hessian-vector products. Avoids storing full Hessian.
                  <span className="block mt-1 font-mono bg-white p-1 rounded">
                    H<sup>−1</sup>v ≈ Σ<sub>t</sub> (I − H)<sup>t</sup>v
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Why They Fail on LLMs
            </h3>
            <div className="grid md:grid-cols-2 gap-2 text-xs text-orange-700">
              <div className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                <span>Hessian approximations become inaccurate at billions of parameters</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                <span>Non-convexity of loss landscape violates theoretical assumptions</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">3.</span>
                <span>Training dynamics (multiple epochs, warm restarts) break influence derivation</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">4.</span>
                <span>Knowledge is distributed across many training examples, not localized</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LoGra Tab */}
      {activeMethod === 'logra' && (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">LoGra: LLM-Scale Data Valuation (ICLR 2025)</h3>
              <a
                href="https://arxiv.org/abs/2405.13954"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <ExternalLink className="w-3 h-3" /> Paper
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Key Innovation: Gradient Projection</h4>
                <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs mb-2">
                  <div className="text-emerald-600 mb-1">// Project gradients to low-rank space</div>
                  <div className="text-gray-700">g̃ = P · ∇<sub>θ</sub>L(z)</div>
                  <div className="text-gray-700">where P ∈ ℝ<sup>k×p</sup>, k ≪ p</div>
                </div>
                <p className="text-gray-600 text-xs">
                  Random projection preserves gradient geometry while reducing dimensionality from billions to thousands.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Throughput Improvement</h4>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-4xl font-bold text-emerald-600">6,500×</div>
                  <div className="text-gray-600 text-sm">
                    faster than prior<br />influence methods
                  </div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-2 text-xs text-emerald-700">
                  <strong>Llama3-8B:</strong> Can compute influence scores at practical speed
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-700 text-sm mb-2">Influence Score Computation</h4>
              <div className="font-mono text-xs text-gray-700 bg-white p-2 rounded border mb-2">
                I(z<sub>i</sub>, z<sub>test</sub>) = g̃<sub>test</sub><sup>T</sup> · (Σ g̃<sub>j</sub>g̃<sub>j</sub><sup>T</sup> + λI)<sup>−1</sup> · g̃<sub>i</sub>
              </div>
              <p className="text-gray-500 text-xs">
                After projection, influence becomes tractable inner product in low-rank space.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Alternatives Tab */}
      {activeMethod === 'alternatives' && (
        <div className="space-y-3 mb-4">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> RepSim
              </h3>
              <p className="text-gray-600 text-xs mb-2">
                Uses representation similarity instead of influence. Compares hidden states directly.
              </p>
              <div className="bg-emerald-50 rounded-lg p-2 text-xs">
                <div className="font-mono text-emerald-700 mb-1">
                  score(z) = cos(h<sub>test</sub>, h<sub>z</sub>)
                </div>
                <div className="text-emerald-600">
                  <strong>~100%</strong> identification where influence functions fail
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> DDA
              </h3>
              <p className="text-gray-600 text-xs mb-2">
                Debias and Denoise Attribution with fitting error correction.
              </p>
              <div className="bg-emerald-50 rounded-lg p-2 text-xs">
                <div className="text-emerald-600 mb-1">
                  <strong>93.49% AUC</strong> on hallucination tracing
                </div>
                <div className="text-emerald-700">
                  Corrects systematic biases in gradient-based attribution
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> AirRep
              </h3>
              <p className="text-gray-600 text-xs mb-2">
                Representation-based TDA optimized for massive scale.
              </p>
              <div className="bg-emerald-50 rounded-lg p-2 text-xs">
                <div className="text-emerald-600 mb-1">
                  Scales to <strong>100M+</strong> training examples
                </div>
                <div className="text-emerald-700">
                  vs 2M limit for LoGra
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> BM25 Baseline
              </h3>
              <p className="text-gray-600 text-xs mb-2">
                Simple lexical retrieval often outperforms TDA for factual attribution.
              </p>
              <div className="bg-amber-50 rounded-lg p-2 text-xs">
                <div className="text-amber-700">
                  Reveals fundamental misalignment between <em>causal influence</em> and <em>factual attribution</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-emerald-900 rounded-xl p-3 text-white">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="text-emerald-200">Key Insight:</strong>
            <span className="text-emerald-100 ml-1">
              Training data attribution ≠ context attribution. TDA methods identify which training examples
              shaped model weights, but for RAG systems, perturbation-based context attribution is more practical.
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default TrainingDataAttributionSlide;

