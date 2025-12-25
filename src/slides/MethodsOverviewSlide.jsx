import React, { useState } from 'react';
import { Zap, Layers, GitBranch, Database, Eye, Target, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { Slide, Cite } from '../components';

const MethodsOverviewSlide = () => {
  const [selectedMethod, setSelectedMethod] = useState(0);
  
  const methods = [
    {
      name: 'Gradient-Based',
      icon: Zap,
      color: 'amber',
      desc: 'Computes attribution by analyzing how gradients flow through the network. Integrated Gradients satisfies key axioms (Sensitivity, Implementation Invariance).',
      pros: ['Mathematically principled', 'Satisfies axioms like sensitivity', 'Single backward pass'],
      cons: ['Attention self-repair invalidates gradients', 'Requires model access', 'Computationally expensive at scale'],
      examples: [
        { name: 'Integrated Gradients', citation: 'integratedGradients', desc: 'ICML 2017' },
        { name: 'GIM Framework', citation: 'gim', desc: 'Temperature-adjusted gradients' },
        { name: 'Captum LLMAttribution', citation: 'captum', desc: 'PyTorch library' }
      ]
    },
    {
      name: 'Perturbation-Based',
      icon: Layers,
      color: 'blue',
      desc: 'Measures importance by removing or modifying input parts and observing changes. Model-agnostic and works with any LLM API.',
      pros: ['Model-agnostic (API-only)', 'Intuitive interpretation', 'Production-ready'],
      cons: ['Requires ~32 forward passes', 'May miss feature interactions'],
      examples: [
        { name: 'ContextCite', citation: 'contextCite', desc: 'NeurIPS 2024, MIT' },
        { name: 'CAMAB', citation: 'camab', desc: 'Thompson Sampling optimization' },
        { name: 'SelfCite', citation: 'selfCite', desc: 'Self-supervised alignment' }
      ]
    },
    {
      name: 'Circuit Tracing',
      icon: GitBranch,
      color: 'purple',
      desc: 'Maps interpretable features and their interactions through model layers using sparse autoencoders with 30M features.',
      pros: ['Deep mechanistic insight', 'Traces multi-step reasoning', 'Open-source tools available'],
      cons: ['Only ~25% satisfying explanations', 'Complex implementation', 'Requires full model access'],
      examples: [
        { name: 'Anthropic Attribution Graphs', citation: 'anthropicBiology', desc: '30M interpretable features' },
        { name: 'circuit-tracer', citation: 'anthropicCircuitTools', desc: 'Gemma-2-2b, Llama-3.2-1b' },
        { name: 'TransformerLens', citation: 'transformerLens', desc: '2.8k stars, activation patching' }
      ]
    },
    {
      name: 'Influence Functions',
      icon: Database,
      color: 'emerald',
      desc: 'Traces predictions back to influential training examples. Useful for data attribution but scales poorly to LLMs.',
      pros: ['Links predictions to training data', 'Useful for data debugging'],
      cons: ['Performs poorly on LLMs', 'BM25 often outperforms', 'Computationally prohibitive'],
      examples: [
        { name: 'LoGra', citation: 'logra', desc: '6,500x throughput improvement' },
        { name: 'RepSim', citation: 'influenceFunctionsWork', desc: 'Near 100% where IF fails' },
        { name: 'DDA', citation: 'dda', desc: '93.49% AUC on hallucination tracing' }
      ]
    },
    {
      name: 'Self-Reflection',
      icon: Eye,
      color: 'rose',
      desc: 'Model generates special tokens to assess its own retrieval and generation quality at runtime.',
      pros: ['Runtime controllable', 'Improves factuality', 'No external tools needed'],
      cons: ['Requires fine-tuning', 'May not reflect true reasoning'],
      examples: [
        { name: 'Self-RAG', citation: 'selfRag', desc: '55.8% vs 24.4% baseline on PopQA' },
        { name: 'START', citation: 'start', desc: '25.13% improvement, no human annotations' },
        { name: 'LongCite', citation: 'longCite', desc: '6.4% over GPT-4o citation F1' }
      ]
    }
  ];
  
  const getColorClasses = (color, selected) => {
    const colors = {
      amber: selected ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-amber-300',
      blue: selected ? 'bg-blue-100 border-blue-400 text-blue-800' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-300',
      purple: selected ? 'bg-purple-100 border-purple-400 text-purple-800' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-purple-300',
      emerald: selected ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-emerald-300',
      rose: selected ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-rose-300'
    };
    return colors[color];
  };
  
  const method = methods[selectedMethod];
  
  return (
    <Slide className="bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Target className="w-8 h-8 text-indigo-500" />
        Core Attribution Methods
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {methods.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelectedMethod(i)}
            className={`px-3 py-1.5 rounded-lg border-2 text-sm font-medium transition-all flex items-center gap-2 ${getColorClasses(m.color, selectedMethod === i)}`}
          >
            <m.icon className="w-4 h-4" />
            {m.name}
          </button>
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-2.5 rounded-xl ${getColorClasses(method.color, true)}`}>
            <method.icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{method.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{method.desc}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
            <h4 className="text-emerald-700 font-semibold mb-2 flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4" /> Strengths
            </h4>
            <ul className="space-y-1">
              {method.pros.map((pro, i) => (
                <li key={i} className="text-emerald-800 text-xs">• {pro}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <h4 className="text-red-700 font-semibold mb-2 flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4" /> Limitations
            </h4>
            <ul className="space-y-1">
              {method.cons.map((con, i) => (
                <li key={i} className="text-red-800 text-xs">• {con}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <h4 className="text-gray-500 text-xs mb-2 font-medium">Key Implementations:</h4>
          <div className="grid md:grid-cols-3 gap-2">
            {method.examples.map((ex, i) => (
              <div key={i} className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs">
                <div className="font-medium text-gray-800 flex items-center gap-1">
                  {ex.name}
                  <Cite refKey={ex.citation} />
                </div>
                <div className="text-gray-500 mt-0.5">{ex.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default MethodsOverviewSlide;
