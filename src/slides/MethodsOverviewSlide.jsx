import React from 'react';
import { Zap, Layers, GitBranch, Database, Eye, Target, ExternalLink } from 'lucide-react';
import { Slide } from '../components';

const MethodsOverviewSlide = () => {
  const methods = [
    {
      name: 'Gradient-Based',
      icon: Zap,
      color: 'amber',
      desc: 'Computes attribution by analyzing how gradients flow through the network. Integrated Gradients satisfies key axioms like sensitivity and implementation invariance, though attention self-repair can invalidate results.',
      papers: [
        { name: 'Integrated Gradients', venue: 'ICML 2017', url: 'https://arxiv.org/abs/1703.01365' },
        { name: 'GIM Framework', venue: '2025', url: 'https://arxiv.org/abs/2505.17630' },
      ]
    },
    {
      name: 'Perturbation-Based',
      icon: Layers,
      color: 'blue',
      desc: 'Measures importance by removing or modifying input parts and observing output changes. Model-agnostic and works with any LLM API—ContextCite needs only ~32 ablations even with hundreds of sources.',
      papers: [
        { name: 'ContextCite', venue: 'NeurIPS 2024', url: 'https://arxiv.org/abs/2409.00729' },
        { name: 'CAMAB', venue: '2025', url: 'https://arxiv.org/html/2506.19977' },
        { name: 'SelfCite', venue: 'ICML 2025', url: 'https://arxiv.org/abs/2502.09604' },
      ]
    },
    {
      name: 'Circuit Tracing',
      icon: GitBranch,
      color: 'purple',
      desc: 'Maps interpretable features through model layers using sparse autoencoders. Anthropic\'s approach uses 30M features to trace multi-step reasoning paths like "Dallas → Texas → Austin".',
      papers: [
        { name: 'Attribution Graphs', venue: 'Anthropic 2025', url: 'https://transformer-circuits.pub/2025/attribution-graphs/biology.html' },
        { name: 'circuit-tracer', venue: 'Open Source', url: 'https://github.com/anthropics/circuit-tracer' },
      ]
    },
    {
      name: 'Training Data Attribution',
      icon: Database,
      color: 'emerald',
      desc: 'Traces predictions back to influential training examples. Traditional influence functions scale poorly to LLMs—LoGra achieves 6,500x speedup, though BM25 often outperforms for factual attribution.',
      papers: [
        { name: 'LoGra', venue: 'ICLR 2025', url: 'https://arxiv.org/abs/2405.13954' },
        { name: 'DDA', venue: '2024', url: 'https://arxiv.org/abs/2410.01285' },
      ]
    },
    {
      name: 'Self-Reflection',
      icon: Eye,
      color: 'rose',
      desc: 'Model generates special tokens to assess its own retrieval and generation quality at runtime. Self-RAG achieves 55.8% accuracy on PopQA vs 24.4% baseline through [Retrieve], [IsRel], [IsSup] tokens.',
      papers: [
        { name: 'Self-RAG', venue: 'ICLR 2024', url: 'https://arxiv.org/abs/2310.11511' },
        { name: 'START', venue: 'EMNLP 2024', url: 'https://arxiv.org/abs/2410.13298' },
        { name: 'LongCite', venue: '2024', url: 'https://arxiv.org/abs/2409.02897' },
      ]
    }
  ];

  const colorClasses = {
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'bg-amber-500', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-800' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-500', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-500', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'bg-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-200', icon: 'bg-rose-500', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-800' },
  };

  return (
    <Slide
      className="bg-white"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Target className="w-8 h-8 text-indigo-500" />
        Core Attribution Methods
      </h2>

      <div className="space-y-3">
        {methods.map((method, idx) => {
          const colors = colorClasses[method.color];
          return (
            <div
              key={idx}
              className={`${colors.bg} ${colors.border} border rounded-xl p-4`}
            >
              <div className="flex items-start gap-3">
                <div className={`${colors.icon} p-2 rounded-lg flex-shrink-0`}>
                  <method.icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <h3 className="font-bold text-gray-900">{method.name}</h3>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {method.papers.map((paper, i) => (
                        <a
                          key={i}
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${colors.badge} hover:opacity-80 transition-opacity`}
                        >
                          {paper.name}
                          <span className="opacity-60">({paper.venue})</span>
                          <ExternalLink className="w-3 h-3 opacity-50" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{method.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Slide>
  );
};

export default MethodsOverviewSlide;
