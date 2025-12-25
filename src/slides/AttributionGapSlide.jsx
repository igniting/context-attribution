import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Slide } from '../components';

const AttributionGapSlide = () => {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedPercent(p => p >= 25 ? 25 : p + 1);
      }, 40);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Slide className="bg-gradient-to-br from-orange-50 via-white to-red-50">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <AlertTriangle className="w-10 h-10 text-orange-500" />
        The Attribution Gap
      </h2>
      
      <p className="text-xl text-gray-600 mb-10">
        Despite significant progress, fundamental challenges remain in explaining model behavior.
      </p>
      
      <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="none"
              stroke="#fed7aa"
              strokeWidth="16"
            />
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="none"
              stroke="#f97316"
              strokeWidth="16"
              strokeDasharray={`${animatedPercent * 5.03} 503`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-gray-900">{animatedPercent}%</span>
            <span className="text-sm text-gray-500">explained</span>
          </div>
        </div>
        
        <div className="flex-1">
          <p className="text-lg text-gray-700 mb-4">
            Even Anthropic's state-of-the-art circuit tracing provides 
            <span className="text-orange-600 font-bold"> satisfying explanations for only ~25%</span> of prompts examined.
          </p>
          <p className="text-gray-500">
            The remaining 75% involves complex interactions that current methods cannot fully explain.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="text-orange-500 font-bold text-lg mb-2">Polysemanticity</div>
          <p className="text-gray-600 text-sm">Network neurons encode multiple meanings, making direct interpretation difficult</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="text-orange-500 font-bold text-lg mb-2">Faithfulness</div>
          <p className="text-gray-600 text-sm">LLM-generated explanations may sound plausible but not reflect actual reasoning</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="text-orange-500 font-bold text-lg mb-2">Scale</div>
          <p className="text-gray-600 text-sm">Billions of parameters to trace; traditional XAI methods require substantial compute</p>
        </div>
      </div>
    </Slide>
  );
};

export default AttributionGapSlide;

