import React, { useState, useEffect } from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Slide, Cite } from '../components';

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
      
      <p className="text-xl text-gray-600 mb-8">
        Despite significant progress, fundamental challenges remain in explaining model behavior.
        <span className="ml-2"><Cite refKey="acmSurvey" /></span>
      </p>
      
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="relative w-44 h-44">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="88"
              cy="88"
              r="72"
              fill="none"
              stroke="#fed7aa"
              strokeWidth="14"
            />
            <circle
              cx="88"
              cy="88"
              r="72"
              fill="none"
              stroke="#f97316"
              strokeWidth="14"
              strokeDasharray={`${animatedPercent * 4.52} 452`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">{animatedPercent}%</span>
            <span className="text-xs text-gray-500">explained</span>
          </div>
        </div>
        
        <div className="flex-1">
          <p className="text-lg text-gray-700 mb-3">
            Anthropic's circuit tracing provides 
            <span className="text-orange-600 font-bold"> satisfying explanations for only ~25%</span> of prompts examined.
            <span className="ml-2"><Cite refKey="anthropicBiology" /></span>
          </p>
          <p className="text-gray-500 text-sm mb-3">
            The remaining 75% involves complex feature interactions that current methods cannot fully decompose.
          </p>
          <a 
            href="https://transformer-circuits.pub/2025/attribution-graphs/biology.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700"
          >
            Read the full study <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="text-orange-500 font-bold text-lg mb-2">Polysemanticity</div>
          <p className="text-gray-600 text-sm mb-3">
            Individual neurons encode multiple unrelated concepts, making direct interpretation unreliable.
          </p>
          <div className="text-xs text-gray-500">
            Addressed via sparse autoencoders with 30M features <Cite refKey="anthropicBiology" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="text-orange-500 font-bold text-lg mb-2">Attention Self-Repair</div>
          <p className="text-gray-600 text-sm mb-3">
            Gradient-based methods fail because attention mechanisms compensate when individual heads are ablated.
          </p>
          <div className="text-xs text-gray-500">
            GIM introduces temperature-adjusted gradients to address this <Cite refKey="gim" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="text-orange-500 font-bold text-lg mb-2">Scale Limitations</div>
          <p className="text-gray-600 text-sm mb-3">
            Influence functions perform poorly at LLM scale; simpler baselines like BM25 often outperform.
          </p>
          <div className="text-xs text-gray-500">
            RepSim achieves near 100% where influence functions fail <Cite refKey="influenceFunctionsWork" />
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-orange-900 rounded-xl p-4 text-white">
        <p className="text-sm">
          <span className="font-semibold text-orange-200">2027 Goal:</span>
          <span className="text-orange-100 ml-2">
            Dario Amodei articulates that interpretability research is critical for AI safety, 
            aiming for significant progress by 2027.
            <span className="ml-2"><Cite refKey="darioInterpretability" /></span>
          </span>
        </p>
      </div>
    </Slide>
  );
};

export default AttributionGapSlide;
