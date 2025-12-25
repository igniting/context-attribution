import React, { useState, useEffect } from 'react';
import { Layers, Info } from 'lucide-react';
import { Slide } from '../components';

const ContextCiteSlide = () => {
  const [showAblations, setShowAblations] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowAblations(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Slide className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Layers className="w-10 h-10 text-blue-500" />
        ContextCite: Perturbation-Based Attribution
      </h2>
      
      <p className="text-xl text-gray-600 mb-8">
        MIT/MadryLab's breakthrough approach (NeurIPS 2024) for practical context attribution
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0">1</span>
              <span>Learn a sparse linear surrogate model approximating LLM response changes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0">2</span>
              <span>Include or exclude context parts and observe output differences</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0">3</span>
              <span>Use LASSO for sparsity — identify the few truly influential sources</span>
            </li>
          </ol>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Metric</h3>
          <div className={`text-center transition-all duration-700 ${showAblations ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="text-6xl font-bold text-blue-600 mb-2">~32</div>
            <div className="text-gray-600">context ablations needed</div>
            <div className="text-sm text-gray-500 mt-2">Even with hundreds of sources</div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-900 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <Info className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-2">Critical Distinction</h4>
            <p className="text-blue-100">
              ContextCite distinguishes between <span className="text-blue-300 font-semibold">corroborative attribution</span> (what supports a statement) 
              and <span className="text-blue-300 font-semibold">contributive attribution</span> (what caused the generation) — 
              a distinction critical for verification workflows.
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default ContextCiteSlide;

