import React from 'react';
import { Sparkles } from 'lucide-react';
import { Slide } from '../components';

const ConclusionSlide = () => {
  return (
    <Slide className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Sparkles className="w-10 h-10 text-indigo-500" />
        Future Directions & Key Takeaways
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-indigo-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Emerging Research</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
              <div>
                <span className="font-semibold text-gray-900">Explainability by Design</span>
                <p className="text-gray-600 text-sm">Hybrid neurosymbolic models combining knowledge graphs with LLMs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
              <div>
                <span className="font-semibold text-gray-900">Self-Improving Attribution</span>
                <p className="text-gray-600 text-sm">START uses synthetic data + preference optimization for continuous improvement</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <div>
                <span className="font-semibold text-gray-900">Causal Inference Integration</span>
                <p className="text-gray-600 text-sm">Moving beyond correlation to counterfactual reasoning</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Researchers</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-semibold text-purple-700">Anthropic Interpretability Team</span>
              <p className="text-gray-600">Chris Olah, Jack Lindsey, Trenton Bricken — Circuit tracing pioneers</p>
            </div>
            <div>
              <span className="font-semibold text-blue-700">MIT CSAIL/Madry Lab</span>
              <p className="text-gray-600">Aleksander Mądry — ContextCite creators</p>
            </div>
            <div>
              <span className="font-semibold text-emerald-700">Princeton NLP</span>
              <p className="text-gray-600">Danqi Chen, Tianyu Gao — ALCE benchmark</p>
            </div>
            <div>
              <span className="font-semibold text-orange-700">University of Washington</span>
              <p className="text-gray-600">Hannaneh Hajishirzi, Akari Asai — Self-RAG</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-900 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Path Forward for Practitioners</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-indigo-300 font-semibold mb-2">Native APIs</div>
            <p className="text-indigo-100 text-sm">Use Anthropic Citations, Google Grounding for RAG applications</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-indigo-300 font-semibold mb-2">Observability</div>
            <p className="text-indigo-100 text-sm">Deploy Langfuse or LangSmith for production monitoring</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-indigo-300 font-semibold mb-2">Realistic Expectations</div>
            <p className="text-indigo-100 text-sm">Current methods provide partial, not complete explanations</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Based on research from Anthropic, MIT CSAIL, Princeton NLP, and other leading AI research groups.
        </p>
      </div>
    </Slide>
  );
};

export default ConclusionSlide;

