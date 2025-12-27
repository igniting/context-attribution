import React from 'react';
import { Layers, Zap, Target, ExternalLink, Code } from 'lucide-react';
import { Slide } from '../components';

const MethodsOverviewSlide = () => {
  return (
    <Slide className="bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Target className="w-8 h-8 text-indigo-500" />
        Core Attribution Methods
      </h2>

      <p className="text-gray-600 mb-4">
        Based on <a href="https://captum.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">Captum</a>'s LLM Attribution API — two fundamental approaches to understanding model behavior.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Perturbation-Based */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-500 p-2.5 rounded-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Perturbation-Based</h3>
              <code className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">LLMAttribution</code>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm mb-4">
            Remove or modify input features and observe how output probability changes. 
            <span className="font-medium text-blue-700"> Model-agnostic</span> — works with any LLM API.
          </p>

          <div className="space-y-2 mb-4">
            <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
              <div className="font-medium text-gray-900 text-sm mb-1">Feature Ablation</div>
              <p className="text-gray-600 text-xs">Replace each feature with baseline, measure output difference</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
              <div className="font-medium text-gray-900 text-sm mb-1">Shapley Values</div>
              <p className="text-gray-600 text-xs">Game-theoretic fair attribution across all feature coalitions</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
              <div className="font-medium text-gray-900 text-sm mb-1">LIME / KernelSHAP</div>
              <p className="text-gray-600 text-xs">Train interpretable surrogate model on perturbed samples</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-700">
            <span className="font-medium">Best for:</span>
            <span>Black-box models, API-only access, production use</span>
          </div>
        </div>

        {/* Gradient-Based */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-500 p-2.5 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Gradient-Based</h3>
              <code className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">LLMGradientAttribution</code>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm mb-4">
            Compute gradients of output with respect to input embeddings.
            <span className="font-medium text-amber-700"> Requires model access</span> — single backward pass.
          </p>

          <div className="space-y-2 mb-4">
            <div className="bg-white/70 rounded-lg p-3 border border-amber-100">
              <div className="font-medium text-gray-900 text-sm mb-1">Layer Integrated Gradients</div>
              <p className="text-gray-600 text-xs">Integrate gradients along path from baseline to input</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-amber-100">
              <div className="font-medium text-gray-900 text-sm mb-1">Layer Gradient × Activation</div>
              <p className="text-gray-600 text-xs">Element-wise product of gradients and layer activations</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-amber-100">
              <div className="font-medium text-gray-900 text-sm mb-1">Layer GradientSHAP</div>
              <p className="text-gray-600 text-xs">SHAP approximation via gradient sampling</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-700">
            <span className="font-medium">Best for:</span>
            <span>Open-weight models, research, deep analysis</span>
          </div>
        </div>
      </div>

      {/* Interpretable Input Types */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Code className="w-5 h-5 text-gray-600" />
          <h3 className="font-bold text-gray-900">Interpretable Input Types</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <code className="text-sm font-medium text-purple-700">TextTokenInput</code>
            <p className="text-gray-600 text-xs mt-1">
              Attribute to individual tokens. Good for fine-grained analysis but tokens may be sub-words.
            </p>
            <div className="mt-2 font-mono text-xs bg-gray-100 p-2 rounded text-gray-700">
              "Dave" → ["D", "ave"] (tokenizer splits)
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <code className="text-sm font-medium text-purple-700">TextTemplateInput</code>
            <p className="text-gray-600 text-xs mt-1">
              Attribute to semantic segments (words, phrases). Define custom baselines for each.
            </p>
            <div className="mt-2 font-mono text-xs bg-gray-100 p-2 rounded text-gray-700">
              {"{name}"} lives in {"{city}"}, {"{state}"}
            </div>
          </div>
        </div>
      </div>

      {/* Key Papers */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-500">Key Papers:</span>
        <a
          href="https://arxiv.org/abs/2312.05491"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded hover:bg-indigo-200"
        >
          Captum LLM Attribution (2023)
          <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href="https://arxiv.org/abs/1703.01365"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded hover:bg-amber-200"
        >
          Integrated Gradients (ICML 2017)
          <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href="https://arxiv.org/abs/1705.07874"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
        >
          SHAP (NeurIPS 2017)
          <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href="https://captum.ai/tutorials/Llama2_LLM_Attribution"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Llama2 Tutorial
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </Slide>
  );
};

export default MethodsOverviewSlide;
