import React, { useState, useEffect } from 'react';
import { Waypoints } from 'lucide-react';
import { Slide } from '../components';

const TitleSlide = () => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return (
    <Slide className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className={`text-center transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex justify-center mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-200">
            <Waypoints className="w-16 h-16 text-white" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          Context Attribution
          <br />
          <span className="text-indigo-600">for LLM Outputs</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Tracing what an LLM says back to why it said it —
          the foundation of AI safety, reliability, and trust
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">Mechanistic Interpretability</span>
          <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">RAG Verification</span>
          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">Agent Debugging</span>
        </div>
      </div>
    </Slide>
  );
};

export default TitleSlide;
