import React from 'react';
import { Sparkles, ExternalLink, Github, BookOpen } from 'lucide-react';
import { Slide } from '../components';

const ConclusionSlide = () => {
  return (
    <Slide className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-indigo-500" />
        Future Directions & Key Takeaways
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4 border border-indigo-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Emerging Research</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5" />
              <div>
                <span className="font-semibold text-gray-900">Self-Improving Attribution</span>
                <p className="text-gray-600 text-xs">START uses synthetic data + preference optimization for 25.13% improvement</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5" />
              <div>
                <span className="font-semibold text-gray-900">Efficient Context Attribution</span>
                <p className="text-gray-600 text-xs">CAMAB uses Thompson Sampling for fewer queries than ContextCite</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
              <div>
                <span className="font-semibold text-gray-900">Scalable Training Attribution</span>
                <p className="text-gray-600 text-xs">LoGra achieves 6,500x throughput improvement on Llama3-8B</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
              <div>
                <span className="font-semibold text-gray-900">Fine-grained Long-context Citation</span>
                <p className="text-gray-600 text-xs">LongCite-8B/9B for sentence-level attribution in long documents</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Key Research Groups</h3>
          <div className="space-y-2 text-sm">
            <div>
              <a href="https://www.anthropic.com/research" target="_blank" rel="noopener noreferrer" className="font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1">
                Anthropic Interpretability Team <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-gray-600 text-xs">Chris Olah, Jack Lindsey, Trenton Bricken — Circuit tracing pioneers</p>
            </div>
            <div>
              <a href="https://madry-lab.ml/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1">
                MIT CSAIL/Madry Lab <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-gray-600 text-xs">Aleksander Mądry — ContextCite creators</p>
            </div>
            <div>
              <a href="https://nlp.cs.princeton.edu/" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
                Princeton NLP <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-gray-600 text-xs">Danqi Chen, Tianyu Gao — ALCE benchmark</p>
            </div>
            <div>
              <a href="https://transformer-circuits.pub/" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-700 hover:text-orange-900 flex items-center gap-1">
                Transformer Circuits Thread <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-gray-600 text-xs">Ongoing mechanistic interpretability research</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Github className="w-5 h-5" />
          Key Resources
        </h3>
        <div className="grid md:grid-cols-4 gap-2 text-xs">
          <a href="https://github.com/MadryLab/context-cite" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-lg p-2 border hover:bg-gray-100 transition-colors">
            <div className="font-medium text-gray-800">context-cite</div>
            <p className="text-gray-500">MIT ContextCite implementation</p>
          </a>
          <a href="https://github.com/safety-research/circuit-tracer" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-lg p-2 border hover:bg-gray-100 transition-colors">
            <div className="font-medium text-gray-800">circuit-tracer</div>
            <p className="text-gray-500">Anthropic attribution graphs</p>
          </a>
          <a href="https://github.com/TransformerLensOrg/TransformerLens" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-lg p-2 border hover:bg-gray-100 transition-colors">
            <div className="font-medium text-gray-800">TransformerLens</div>
            <p className="text-gray-500">Mechanistic interpretability (2.8k ⭐)</p>
          </a>
          <a href="https://github.com/JShollaj/awesome-llm-interpretability" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-lg p-2 border hover:bg-gray-100 transition-colors">
            <div className="font-medium text-gray-800">awesome-llm-interpretability</div>
            <p className="text-gray-500">Curated paper list</p>
          </a>
        </div>
      </div>

      <div className="bg-indigo-900 rounded-xl p-4 text-white">
        <h3 className="text-lg font-bold mb-3">Path Forward for Practitioners</h3>
        <div className="grid md:grid-cols-4 gap-3">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-indigo-300 font-semibold mb-1 text-sm">Agent Attribution</div>
            <p className="text-indigo-100 text-xs">Use LOO + log-prob for fast tool/response attribution — O(n) passes, works across models</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-indigo-300 font-semibold mb-1 text-sm">Native APIs</div>
            <p className="text-indigo-100 text-xs">Use Anthropic Citations, Google Grounding for RAG with built-in attribution</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-indigo-300 font-semibold mb-1 text-sm">Observability</div>
            <p className="text-indigo-100 text-xs">Deploy Langfuse or LangSmith for production monitoring and tracing</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-indigo-300 font-semibold mb-1 text-sm">Model Agnostic</div>
            <p className="text-indigo-100 text-xs">Attribution rankings stay consistent across Qwen, Gemma, Llama — swap freely</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4" />
          Based on research from Anthropic, MIT CSAIL, Princeton NLP, and other leading AI research groups.
        </p>
      </div>
    </Slide>
  );
};

export default ConclusionSlide;
