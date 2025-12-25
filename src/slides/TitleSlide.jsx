import React, { useState, useEffect } from 'react';
import { Brain, BookOpen } from 'lucide-react';
import { Slide, Cite } from '../components';

const TitleSlide = () => {
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    setAnimateIn(true);
  }, []);
  
  return (
    <Slide className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className={`text-center transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-200">
            <Brain className="w-14 h-14 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
          Context Attribution
          <br />
          <span className="text-indigo-600">for LLM Outputs</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Tracing what an LLM says back to why it said it — 
          the foundation of AI safety, reliability, and trust
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">Mechanistic Interpretability</span>
          <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">RAG Verification</span>
          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">Agent Debugging</span>
        </div>
        
        <div className="bg-white/70 rounded-xl p-4 max-w-3xl mx-auto border border-gray-200">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-3">
            <BookOpen className="w-4 h-4" />
            <span className="font-medium">Key References</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Cite refKey="anthropicBiology" />
            <Cite refKey="contextCite" />
            <Cite refKey="selfRag" />
            <Cite refKey="alce" />
            <Cite refKey="semanticEntropy" />
            <Cite refKey="acmSurvey" />
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default TitleSlide;
