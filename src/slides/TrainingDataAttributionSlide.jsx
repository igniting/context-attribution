import React from 'react';
import { Database, TrendingUp, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { Slide } from '../components';

const TrainingDataAttributionSlide = () => {
  return (
    <Slide className="bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Database className="w-8 h-8 text-emerald-500" />
        Training Data Attribution
      </h2>

      <p className="text-gray-600 mb-4">
        Tracing model predictions back to influential training examples — distinct from context attribution
      </p>

      {/* Critical Finding */}
      <div className="bg-red-50 rounded-xl p-4 border border-red-200 mb-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-red-800 mb-1">Critical Finding: Influence Functions Struggle on LLMs</h3>
            <p className="text-red-700 text-sm">
              Standard influence functions (DataInf, LiSSA) perform poorly at LLM scale. 
              Simple baselines like BM25 retrieval often outperform for factual attribution.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {/* LoGra */}
        <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900">LoGra</h3>
            <a
              href="https://arxiv.org/abs/2405.13954"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="text-3xl font-bold text-emerald-600 mb-1">6,500×</div>
          <div className="text-sm text-gray-600 mb-2">throughput improvement</div>
          <p className="text-xs text-gray-500">
            Random projection of gradients to low-rank space. Scales to Llama3-8B with practical speed.
          </p>
          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-emerald-700">
            ICLR 2025
          </div>
        </div>

        {/* RepSim */}
        <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900">RepSim</h3>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-emerald-600 mb-1">~100%</div>
          <div className="text-sm text-gray-600 mb-2">identification rate</div>
          <p className="text-xs text-gray-500">
            Uses representation similarity instead of influence. Compares hidden states directly.
          </p>
          <div className="mt-2 pt-2 border-t border-gray-100 text-xs">
            <code className="bg-gray-100 px-1 rounded text-emerald-700">cos(h_test, h_z)</code>
          </div>
        </div>

        {/* DDA */}
        <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900">DDA</h3>
            <a
              href="https://arxiv.org/abs/2410.01285"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="text-3xl font-bold text-emerald-600 mb-1">93.5%</div>
          <div className="text-sm text-gray-600 mb-2">AUC on hallucination tracing</div>
          <p className="text-xs text-gray-500">
            Debias and Denoise Attribution with fitting error correction for gradient-based methods.
          </p>
          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-emerald-700">
            2024
          </div>
        </div>
      </div>

      {/* Why It's Hard */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-4">
        <h3 className="font-bold text-gray-900 text-sm mb-3">Why Influence Functions Fail at Scale</h3>
        <div className="grid md:grid-cols-4 gap-3 text-xs">
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
            <div className="font-medium text-orange-800 mb-1">Hessian Approximation</div>
            <p className="text-orange-700">Inaccurate at billions of parameters</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
            <div className="font-medium text-orange-800 mb-1">Non-Convexity</div>
            <p className="text-orange-700">Violates theoretical assumptions</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
            <div className="font-medium text-orange-800 mb-1">Training Dynamics</div>
            <p className="text-orange-700">Multiple epochs break derivation</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
            <div className="font-medium text-orange-800 mb-1">Distributed Knowledge</div>
            <p className="text-orange-700">Facts spread across many examples</p>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-emerald-900 rounded-xl p-4 text-white">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            <strong className="text-emerald-200">Key Insight:</strong>
            <span className="text-emerald-100 ml-1">
              Training data attribution ≠ context attribution. TDA identifies which training examples shaped model weights.
              For RAG systems, perturbation-based context attribution (ContextCite) is more practical.
            </span>
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default TrainingDataAttributionSlide;
