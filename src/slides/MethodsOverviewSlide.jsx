import React, { useState } from 'react';
import { Zap, Layers, GitBranch, Database, Eye, Target, CheckCircle, AlertTriangle } from 'lucide-react';
import { Slide } from '../components';

const MethodsOverviewSlide = () => {
  const [selectedMethod, setSelectedMethod] = useState(0);
  
  const methods = [
    {
      name: 'Gradient-Based',
      icon: Zap,
      color: 'amber',
      desc: 'Computes attribution by analyzing how gradients flow through the network',
      pros: ['Mathematically principled', 'Satisfies axioms like sensitivity'],
      cons: ['Computationally expensive', 'Attention self-repair issues'],
      examples: ['Integrated Gradients', 'GIM Framework', 'Randomized Path Integration']
    },
    {
      name: 'Perturbation-Based',
      icon: Layers,
      color: 'blue',
      desc: 'Measures importance by removing or modifying input parts and observing changes',
      pros: ['Model-agnostic', 'Intuitive interpretation', 'Production-ready'],
      cons: ['Requires multiple forward passes', 'May miss feature interactions'],
      examples: ['ContextCite (MIT)', 'LIME', 'Ablation Studies']
    },
    {
      name: 'Circuit Tracing',
      icon: GitBranch,
      color: 'purple',
      desc: 'Maps interpretable features and their interactions through model layers',
      pros: ['Deep mechanistic insight', 'Traces multi-step reasoning'],
      cons: ['Complex to implement', 'Only ~25% satisfying explanations'],
      examples: ['Anthropic Attribution Graphs', 'Sparse Autoencoders', 'TransformerLens']
    },
    {
      name: 'Influence Functions',
      icon: Database,
      color: 'emerald',
      desc: 'Traces predictions back to influential training examples',
      pros: ['Links to training data', 'Useful for debugging'],
      cons: ['Scales poorly', 'BM25 often outperforms'],
      examples: ['LoGra (6500x speedup)', 'DataInf', 'RepSim']
    },
    {
      name: 'Self-Reflection',
      icon: Eye,
      color: 'rose',
      desc: 'Model generates special tokens to assess its own retrieval and generation',
      pros: ['Runtime controllable', 'Improves factuality'],
      cons: ['Requires fine-tuning', 'May not reflect true reasoning'],
      examples: ['Self-RAG', '[IsRel] tokens', '[IsSup] verification']
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
      <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Target className="w-10 h-10 text-indigo-500" />
        Core Attribution Methods
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {methods.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelectedMethod(i)}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all flex items-center gap-2 ${getColorClasses(m.color, selectedMethod === i)}`}
          >
            <m.icon className="w-4 h-4" />
            {m.name}
          </button>
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-3 rounded-xl ${getColorClasses(method.color, true)}`}>
            <method.icon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{method.name}</h3>
            <p className="text-gray-600 mt-1">{method.desc}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h4 className="text-emerald-700 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Strengths
            </h4>
            <ul className="space-y-1">
              {method.pros.map((pro, i) => (
                <li key={i} className="text-emerald-800 text-sm">• {pro}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <h4 className="text-red-700 font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Limitations
            </h4>
            <ul className="space-y-1">
              {method.cons.map((con, i) => (
                <li key={i} className="text-red-800 text-sm">• {con}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-gray-500 text-sm mb-2">Key Implementations:</h4>
          <div className="flex flex-wrap gap-2">
            {method.examples.map((ex, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-700 text-sm">
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default MethodsOverviewSlide;

