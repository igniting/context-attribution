import React, { useState, useEffect } from 'react';
import { Search, Database, CheckCircle, Brain, Shield, FileText, Workflow, ArrowRight } from 'lucide-react';
import { Slide } from '../components';

const SelfRAGSlide = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const steps = [
    { icon: Search, label: 'Query', desc: 'User asks a question', color: 'blue' },
    { icon: Database, label: 'Retrieve', desc: 'Fetch relevant documents', color: 'cyan' },
    { icon: CheckCircle, label: '[IsRel]', desc: 'Check relevance', color: 'emerald' },
    { icon: Brain, label: 'Generate', desc: 'LLM creates response', color: 'purple' },
    { icon: Shield, label: '[IsSup]', desc: 'Verify support', color: 'orange' },
    { icon: FileText, label: 'Cite', desc: 'Add citations', color: 'rose' }
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
    <Slide className="bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <Workflow className="w-10 h-10 text-cyan-500" />
          Self-RAG Pipeline
        </h2>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm ${
            isAnimating ? 'bg-red-500 hover:bg-red-400 text-white' : 'bg-cyan-500 hover:bg-cyan-400 text-white'
          }`}
        >
          {isAnimating ? 'Stop' : 'Animate'}
        </button>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        Self-RAG introduces <span className="font-semibold text-gray-900">reflection tokens</span> that enable the model to assess its own retrieval and generation quality.
      </p>
      
      <div className="flex items-center justify-between gap-2 mb-8">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div 
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                activeStep === i ? 'scale-110' : 'scale-100'
              }`}
              onClick={() => setActiveStep(i)}
            >
              <div className={`p-3 rounded-xl border-2 transition-all duration-300 ${getColor(step.color, activeStep === i)}`}>
                <step.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs mt-2 font-medium ${activeStep === i ? 'text-gray-900' : 'text-gray-500'}`}>
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
      
      <div className="bg-gray-50 rounded-2xl p-5 min-h-32 border border-gray-200 mb-6">
        <h4 className="text-gray-900 font-semibold mb-2">{steps[activeStep].label}</h4>
        <p className="text-gray-600 text-sm mb-3">{steps[activeStep].desc}</p>
        
        {activeStep === 0 && (
          <div className="bg-blue-50 rounded-xl p-4 text-blue-800 border border-blue-200">
            "What are the health benefits of green tea?"
          </div>
        )}
        
        {activeStep === 1 && (
          <div className="space-y-2">
            {['Doc 1: Antioxidants in green tea...', 'Doc 2: Caffeine and metabolism...', 'Doc 3: Historical uses of tea...'].map((doc, i) => (
              <div key={i} className="bg-cyan-50 rounded-lg p-3 text-cyan-800 text-sm flex items-center gap-2 border border-cyan-200">
                <FileText className="w-4 h-4" /> {doc}
              </div>
            ))}
          </div>
        )}
        
        {activeStep === 2 && (
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-sm border border-emerald-200">✓ Doc 1: Relevant</span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-sm border border-emerald-200">✓ Doc 2: Relevant</span>
            <span className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-sm border border-red-200">✗ Doc 3: Not Relevant</span>
          </div>
        )}
        
        {activeStep === 3 && (
          <div className="bg-purple-50 rounded-xl p-4 text-purple-800 border border-purple-200">
            "Green tea contains powerful antioxidants called catechins, which may help reduce inflammation..."
          </div>
        )}
        
        {activeStep === 4 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700">"catechins" → Supported by Doc 1</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700">"reduce inflammation" → Supported by Doc 2</span>
            </div>
          </div>
        )}
        
        {activeStep === 5 && (
          <div className="bg-rose-50 rounded-xl p-4 text-rose-800 border border-rose-200">
            "Green tea contains powerful antioxidants called catechins<sup className="text-rose-600">[1]</sup>, which may help reduce inflammation<sup className="text-rose-600">[2]</sup>..."
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
          <div className="text-emerald-600 text-3xl font-bold">55.8%</div>
          <div className="text-emerald-700 text-sm">Self-RAG accuracy on PopQA</div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <div className="text-red-600 text-3xl font-bold">~50%</div>
          <div className="text-red-700 text-sm">GPT-4 citations lacking support</div>
        </div>
      </div>
    </Slide>
  );
};

export default SelfRAGSlide;

