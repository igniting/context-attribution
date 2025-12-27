import React, { useState, useEffect } from 'react';
import { Layers, ExternalLink, Github, CheckCircle, AlertTriangle } from 'lucide-react';
import { Slide } from '../components';

const ContextCiteSlide = () => {
  const [hoveredSource, setHoveredSource] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);

  // Auto-animate the ablation count
  useEffect(() => {
    if (animationStep < 32) {
      const timer = setTimeout(() => setAnimationStep(s => s + 1), 50);
      return () => clearTimeout(timer);
    }
  }, [animationStep]);

  // Example context sources for RAG scenario
  const sources = [
    { id: 1, text: "The Eiffel Tower is located in Paris, France.", score: 0.82, relevant: true },
    { id: 2, text: "It was constructed from 1887 to 1889 as the entrance to the World's Fair.", score: 0.75, relevant: true },
    { id: 3, text: "Gustave Eiffel's company designed and built the tower.", score: 0.45, relevant: true },
    { id: 4, text: "The tower is 330 metres tall, about the same height as an 81-storey building.", score: 0.68, relevant: true },
    { id: 5, text: "French cuisine includes dishes like coq au vin and croissants.", score: 0.03, relevant: false },
    { id: 6, text: "The Seine River flows through Paris.", score: 0.08, relevant: false },
  ];

  return (
    <Slide className="bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Layers className="w-8 h-8 text-cyan-600" />
          ContextCite: Scalable Context Attribution
        </h2>
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

      <p className="text-gray-600 mb-4">
        MIT/MadryLab (NeurIPS 2024) — LASSO-based sparse linear surrogate for efficient RAG context attribution
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {/* Key Innovation */}
        <div className="bg-white rounded-xl border border-cyan-200 p-4 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-3">Key Innovation</h3>
          
          <div className="text-center mb-3">
            <div className="text-5xl font-bold text-cyan-600">~{animationStep}</div>
            <div className="text-gray-600 text-sm">ablations needed</div>
            <div className="text-xs text-gray-400">even with 100s of sources</div>
          </div>

          <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100 text-xs">
            <div className="font-mono text-cyan-800 mb-1">
              minimize ||y - Xβ||² + λ||β||₁
            </div>
            <p className="text-cyan-700">
              LASSO's L1 penalty forces sparsity — most sources have zero influence, so few samples suffice.
            </p>
          </div>
        </div>

        {/* RAG Attribution Demo */}
        <div className="md:col-span-2 bg-white rounded-xl border border-cyan-200 p-4 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-3">RAG Source Attribution</h3>
          
          <div className="space-y-2 mb-3">
            {sources.map((source) => (
              <div
                key={source.id}
                onMouseEnter={() => setHoveredSource(source.id)}
                onMouseLeave={() => setHoveredSource(null)}
                className={`flex items-center gap-3 p-2 rounded-lg border transition-all cursor-pointer ${
                  hoveredSource === source.id
                    ? source.relevant 
                      ? 'bg-emerald-50 border-emerald-300' 
                      : 'bg-gray-50 border-gray-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="w-6 text-xs text-gray-400 font-mono">[{source.id}]</div>
                <div className="flex-1 text-xs text-gray-700 truncate">{source.text}</div>
                <div className={`w-16 h-2 rounded-full overflow-hidden bg-gray-200`}>
                  <div 
                    className={`h-full rounded-full ${source.relevant ? 'bg-cyan-500' : 'bg-gray-400'}`}
                    style={{ width: `${source.score * 100}%` }}
                  />
                </div>
                <div className={`text-xs font-mono w-10 text-right ${source.relevant ? 'text-cyan-700' : 'text-gray-400'}`}>
                  {(source.score * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Generated Response:</div>
            <div className="text-sm text-gray-800">
              "The Eiffel Tower is a <span className="bg-cyan-100 px-0.5 rounded">330-meter</span> iron structure in <span className="bg-cyan-100 px-0.5 rounded">Paris</span>, built <span className="bg-cyan-100 px-0.5 rounded">1887-1889</span> by <span className="bg-cyan-100 px-0.5 rounded">Gustave Eiffel's company</span>."
            </div>
          </div>
        </div>
      </div>

      {/* Two Types of Attribution */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-emerald-800">Corroborative Attribution</h3>
          </div>
          <p className="text-emerald-700 text-sm mb-2">
            Which sources <em>support</em> the generated claim?
          </p>
          <div className="bg-white/70 rounded-lg p-3 text-xs border border-emerald-100">
            <div className="text-gray-600 mb-1"><strong>Use case:</strong> Citation verification</div>
            <div className="text-emerald-700">
              Given output "Tower is 330m tall", find sources containing height information.
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-blue-800">Contributive Attribution</h3>
          </div>
          <p className="text-blue-700 text-sm mb-2">
            Which sources <em>caused</em> this specific generation?
          </p>
          <div className="bg-white/70 rounded-lg p-3 text-xs border border-blue-100">
            <div className="text-gray-600 mb-1"><strong>Use case:</strong> Debugging hallucinations</div>
            <div className="text-blue-700">
              If output says "Tower is 500m", which source led to this error?
            </div>
          </div>
        </div>
      </div>

      {/* Methodology & Comparison */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-3">ContextCite Methodology</h3>
          <ol className="space-y-2 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center flex-shrink-0">1</span>
              <span>Partition context into n sources (sentences, paragraphs, or docs)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center flex-shrink-0">2</span>
              <span>Generate ~32 random binary masks to include/exclude sources</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center flex-shrink-0">3</span>
              <span>Measure log-prob of target response under each masked context</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center flex-shrink-0">4</span>
              <span>Fit LASSO model: sparse coefficients = attribution scores</span>
            </li>
          </ol>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-3">vs Other Methods</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span><strong>Model-agnostic:</strong> Works with any LLM API (no gradients needed)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span><strong>Interpretable:</strong> LASSO coefficients directly = source importance</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span><strong>Efficient:</strong> ~32 forward passes vs 2ⁿ for exact Shapley</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span><strong>No self-repair:</strong> Avoids attention mechanism issues in gradients</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              <strong>Related:</strong> CAMAB uses Thompson Sampling for even fewer queries; 
              SelfCite trains models to self-cite without external attribution.
            </div>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-cyan-900 rounded-xl p-4 text-white">
        <p className="text-sm">
          <strong className="text-cyan-200">Key insight:</strong>
          <span className="text-cyan-100 ml-1">
            Corroborative ≠ Contributive. A source may <em>support</em> a claim without being the <em>cause</em> of its generation.
            ContextCite handles both via targeted ablation design — use corroborative for citations, contributive for debugging.
          </span>
        </p>
      </div>
    </Slide>
  );
};

export default ContextCiteSlide;
