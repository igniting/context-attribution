import React, { useState, useEffect } from 'react';
import { Search, Database, CheckCircle, Brain, Shield, FileText, Workflow, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Slide } from '../components';

const SelfRAGSlide = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { icon: Search, label: 'Query', desc: 'User asks a question', color: 'blue' },
    { icon: Database, label: '[Retrieve]', desc: 'Decide whether to retrieve', color: 'cyan' },
    { icon: CheckCircle, label: '[IsRel]', desc: 'Check relevance', color: 'emerald' },
    { icon: Brain, label: 'Generate', desc: 'LLM creates response', color: 'purple' },
    { icon: Shield, label: '[IsSup]', desc: 'Verify support', color: 'orange' },
    { icon: FileText, label: '[IsUse]', desc: 'Assess usefulness', color: 'rose' }
  ];

  useEffect(() => {
    if (isAnimating) {
      const timer = setInterval(() => {
        setActiveStep(s => (s + 1) % steps.length);
      }, 1500);
      return () => clearInterval(timer);
    }
  }, [isAnimating, steps.length]);

  const getColor = (color, active) => {
    const colors = {
      blue: active ? 'bg-blue-500 border-blue-400 text-white' : 'bg-blue-50 border-blue-200 text-blue-600',
      cyan: active ? 'bg-cyan-500 border-cyan-400 text-white' : 'bg-cyan-50 border-cyan-200 text-cyan-600',
      emerald: active ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-emerald-50 border-emerald-200 text-emerald-600',
      purple: active ? 'bg-purple-500 border-purple-400 text-white' : 'bg-purple-50 border-purple-200 text-purple-600',
      orange: active ? 'bg-orange-500 border-orange-400 text-white' : 'bg-orange-50 border-orange-200 text-orange-600',
      rose: active ? 'bg-rose-500 border-rose-400 text-white' : 'bg-rose-50 border-rose-200 text-rose-600'
    };
    return colors[color];
  };

  return (
    <Slide
      className="bg-white"
      references={['selfRag', 'start', 'longCite']}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Workflow className="w-8 h-8 text-cyan-500" />
          Self-RAG: Self-Reflective Retrieval
        </h2>
        <div className="flex gap-2">
          <a
            href="https://arxiv.org/abs/2310.11511"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <ExternalLink className="w-3 h-3" /> arXiv
          </a>
          <a
            href="https://selfrag.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <Github className="w-3 h-3" /> Project
          </a>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              isAnimating ? 'bg-red-500 hover:bg-red-400 text-white' : 'bg-cyan-500 hover:bg-cyan-400 text-white'
            }`}
          >
            {isAnimating ? 'Stop' : 'Animate'}
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-6">
        Asai et al. (2023) — Model generates <span className="font-semibold text-gray-900">reflection tokens</span> to assess its own retrieval and generation quality at runtime.
      </p>

      <div className="flex items-center justify-between gap-2 mb-6">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                activeStep === i ? 'scale-110' : 'scale-100'
              }`}
              onClick={() => setActiveStep(i)}
            >
              <div className={`p-2.5 rounded-xl border-2 transition-all duration-300 ${getColor(step.color, activeStep === i)}`}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs mt-1.5 font-medium ${activeStep === i ? 'text-gray-900' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-colors ${
                activeStep > i ? 'text-cyan-500' : 'text-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-4 min-h-28 border border-gray-200 mb-4">
        <h4 className="text-gray-900 font-semibold mb-2 text-sm">{steps[activeStep].label}</h4>
        <p className="text-gray-600 text-xs mb-2">{steps[activeStep].desc}</p>

        {activeStep === 0 && (
          <div className="bg-blue-50 rounded-lg p-3 text-blue-800 text-sm border border-blue-200">
            "What are the health benefits of green tea?"
          </div>
        )}

        {activeStep === 1 && (
          <div className="bg-cyan-50 rounded-lg p-3 text-cyan-800 text-sm border border-cyan-200">
            <span className="font-mono text-cyan-600">[Retrieve=Yes]</span> → Retrieval needed for factual accuracy
          </div>
        )}

        {activeStep === 2 && (
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-xs border border-emerald-200">[IsRel=Relevant] Doc 1: Antioxidants</span>
            <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-xs border border-emerald-200">[IsRel=Relevant] Doc 2: Caffeine</span>
            <span className="px-2 py-1 rounded-lg bg-red-100 text-red-700 text-xs border border-red-200">[IsRel=Irrelevant] Doc 3: Tea history</span>
          </div>
        )}

        {activeStep === 3 && (
          <div className="bg-purple-50 rounded-lg p-3 text-purple-800 text-sm border border-purple-200">
            "Green tea contains powerful antioxidants called catechins, which may help reduce inflammation..."
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-xs font-mono">[IsSup=Fully]</span>
              <span className="text-gray-700">"catechins" → Supported by Doc 1</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 text-xs font-mono">[IsSup=Partial]</span>
              <span className="text-gray-700">"reduce inflammation" → Partial support</span>
            </div>
          </div>
        )}

        {activeStep === 5 && (
          <div className="bg-rose-50 rounded-lg p-3 text-rose-800 text-sm border border-rose-200">
            <span className="font-mono text-rose-600">[IsUse=5]</span> → High utility rating for user query
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-lg p-3 border border-emerald-200">
          <h4 className="font-semibold text-gray-800 text-sm mb-2">Self-RAG Performance</h4>
          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
            <div className="bg-emerald-50 rounded p-2 text-center">
              <div className="text-xl font-bold text-emerald-600">55.8%</div>
              <div className="text-emerald-700">PopQA accuracy</div>
            </div>
            <div className="bg-gray-50 rounded p-2 text-center">
              <div className="text-xl font-bold text-gray-500">24.4%</div>
              <div className="text-gray-600">Baseline (Alpaca-13B)</div>
            </div>
          </div>
          <div className="text-gray-600 text-xs">
            Reflection tokens enable runtime controllability without retraining.
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-blue-200">
          <h4 className="font-semibold text-gray-800 text-sm mb-2">LongCite: Fine-Grained Long-Context</h4>
          <div className="bg-gray-50 rounded p-2 font-mono text-xs mb-2">
            <div className="text-blue-600">// Sentence-level citation in 128k+ context</div>
            <div className="text-gray-700">LongCite-8B, LongCite-9B (GLM4-based)</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-blue-50 rounded p-2 border border-blue-100">
              <div className="font-bold text-blue-700">+6.4% F1</div>
              <div className="text-blue-600">vs GPT-4o</div>
            </div>
            <div className="bg-blue-50 rounded p-2 border border-blue-100">
              <div className="font-bold text-blue-700">45k</div>
              <div className="text-blue-600">training examples</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 border border-purple-200 mb-4">
        <h4 className="font-semibold text-gray-800 text-sm mb-2">START: Self-Taught Attribution (EMNLP 2024)</h4>
        <div className="grid md:grid-cols-3 gap-2 text-xs">
          <div className="bg-purple-50 rounded p-2 border border-purple-100">
            <div className="font-semibold text-purple-800 mb-1">Synthetic Warming</div>
            <div className="text-purple-700">Bootstrap with synthetic citation data</div>
          </div>
          <div className="bg-purple-50 rounded p-2 border border-purple-100">
            <div className="font-semibold text-purple-800 mb-1">Fine-Grained DPO</div>
            <div className="text-purple-700">Preference optimization per statement</div>
          </div>
          <div className="bg-purple-50 rounded p-2 border border-purple-100">
            <div className="font-semibold text-purple-800 mb-1">+25.13%</div>
            <div className="text-purple-700">Average improvement, no human labels</div>
          </div>
        </div>
      </div>

      <div className="bg-cyan-900 rounded-xl p-4 text-white">
        <p className="text-sm">
          <span className="font-semibold text-cyan-200">Key innovation:</span>
          <span className="text-cyan-100 ml-2">
            Reflection tokens like [Retrieve], [IsRel], [IsSup], [IsUse] enable runtime controllability.
            Users can adjust retrieval threshold based on use case without retraining.
          </span>
        </p>
      </div>
    </Slide>
  );
};

export default SelfRAGSlide;
