import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Brain, Cpu } from 'lucide-react';
import { Slide } from '../components';

const FaithfulnessSlide = () => {
  const [activeMethod, setActiveMethod] = useState('semantic');

  return (
    <Slide
      className="bg-gradient-to-br from-orange-50 via-white to-red-50"
      references={['semanticIllusion', 'semanticEntropy', 'dda', 'faithLens', 'alce']}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Shield className="w-8 h-8 text-orange-500" />
        Faithfulness Evaluation: The Semantic Illusion Problem
      </h2>

      <p className="text-gray-600 mb-4">
        Detecting when generated text is not grounded in retrieved context — a harder problem than benchmarks suggest
      </p>

      {/* Method Selector */}
      <div className="flex gap-2 mb-4">
        {[
          { id: 'semantic', label: 'Semantic Illusion' },
          { id: 'ragas', label: 'RAGAS Pipeline' },
          { id: 'comparison', label: 'Method Comparison' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveMethod(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeMethod === tab.id
                ? 'bg-orange-600 text-white'
                : 'bg-white border border-orange-200 text-orange-700 hover:bg-orange-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Semantic Illusion */}
      {activeMethod === 'semantic' && (
        <div className="space-y-3 mb-4">
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-2">
                  The Semantic Illusion Problem (2025)
                </h3>
                <p className="text-red-700 text-sm">
                  Embedding-based hallucination detection fails catastrophically on real-world cases,
                  despite near-perfect performance on synthetic benchmarks.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mt-4">
              <div className="bg-white rounded-lg p-3 border border-red-100">
                <h4 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  Embedding Methods
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Synthetic benchmark accuracy:</span>
                    <span className="font-bold text-green-600">~95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Real hallucination FPR:</span>
                    <span className="font-bold text-red-600">100%</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  Embeddings capture semantic similarity but miss factual contradictions
                </p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-green-100">
                <h4 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-500" />
                  GPT-4 Reasoning
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Synthetic benchmark accuracy:</span>
                    <span className="font-bold text-green-600">~95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Real hallucination FPR:</span>
                    <span className="font-bold text-green-600">7%</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  Chain-of-thought reasoning catches factual inconsistencies
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Why Embeddings Fail</h4>
            <div className="grid md:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  <strong>Semantic ≠ Factual:</strong> "Paris is in Germany" embeds similarly to "Paris is in France"
                </span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  <strong>Subtle errors:</strong> Wrong dates, numbers, or names have high cosine similarity
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RAGAS Pipeline */}
      {activeMethod === 'ragas' && (
        <div className="bg-white rounded-xl p-4 border border-orange-200 shadow-sm mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3">RAGAS Faithfulness Pipeline</h3>

          <div className="grid md:grid-cols-4 gap-2 mb-3">
            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 text-center">
              <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
              <h4 className="font-semibold text-orange-800 text-xs mb-1">Decompose</h4>
              <p className="text-orange-700 text-xs">Break response into atomic statements</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 text-center">
              <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
              <h4 className="font-semibold text-orange-800 text-xs mb-1">Verify</h4>
              <p className="text-orange-700 text-xs">Check each statement against context</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 text-center">
              <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
              <h4 className="font-semibold text-orange-800 text-xs mb-1">Score</h4>
              <p className="text-orange-700 text-xs">Binary: supported (1) or unsupported (0)</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 text-center">
              <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">4</div>
              <h4 className="font-semibold text-orange-800 text-xs mb-1">Aggregate</h4>
              <p className="text-orange-700 text-xs">Average scores across all statements</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-semibold text-gray-700 text-sm mb-2">Faithfulness Score Formula</h4>
            <div className="font-mono text-sm text-gray-700 bg-white p-2 rounded border">
              Faithfulness = (1/N) × Σ v(sᵢ, C)
            </div>
            <div className="text-xs text-gray-500 mt-2">
              where N = number of statements, sᵢ = statement i, C = context, v() = verification function (NLI or LLM-based)
            </div>
          </div>
        </div>
      )}

      {/* Method Comparison */}
      {activeMethod === 'comparison' && (
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Faithfulness Detection Methods Compared</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">Method</th>
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">Approach</th>
                  <th className="text-center py-2 px-2 font-semibold text-gray-700">Real FPR</th>
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">Trade-off</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-2 font-medium">Embedding Similarity</td>
                  <td className="py-2 px-2 text-gray-600">Cosine distance threshold</td>
                  <td className="py-2 px-2 text-center"><span className="text-red-600 font-bold">100%</span></td>
                  <td className="py-2 px-2 text-gray-600">Fast but unreliable</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-2 font-medium">NLI (TRUE)</td>
                  <td className="py-2 px-2 text-gray-600">T5-11B entailment</td>
                  <td className="py-2 px-2 text-center"><span className="text-orange-600 font-bold">~15%</span></td>
                  <td className="py-2 px-2 text-gray-600">Good accuracy, moderate cost</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-2 font-medium">GPT-4 Reasoning</td>
                  <td className="py-2 px-2 text-gray-600">Chain-of-thought verification</td>
                  <td className="py-2 px-2 text-center"><span className="text-green-600 font-bold">7%</span></td>
                  <td className="py-2 px-2 text-gray-600">Best accuracy, highest cost</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-2 font-medium">Semantic Entropy</td>
                  <td className="py-2 px-2 text-gray-600">Sample multiple outputs</td>
                  <td className="py-2 px-2 text-center"><span className="text-green-600 font-bold">9-11%</span></td>
                  <td className="py-2 px-2 text-gray-600">89-91% detection accuracy</td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-medium">DDA</td>
                  <td className="py-2 px-2 text-gray-600">Debias & Denoise Attribution</td>
                  <td className="py-2 px-2 text-center"><span className="text-green-600 font-bold">93.49% AUC</span></td>
                  <td className="py-2 px-2 text-gray-600">Training data attribution</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Key Takeaway */}
      <div className="bg-orange-900 rounded-xl p-3 text-white">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-300 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="text-orange-200">Critical Insight:</strong>
            <span className="text-orange-100 ml-1">
              High performance on synthetic hallucination benchmarks does not transfer to real-world detection.
              Production systems should use reasoning-based verification (NLI or LLM) despite higher cost.
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default FaithfulnessSlide;
