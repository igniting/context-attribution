import React from 'react';
import { Sparkles, Target, Clock, Layers, Brain, ExternalLink, CheckCircle } from 'lucide-react';
import { Slide } from '../components';

const AdvancedMethodsSlide = () => {
  const methods = [
    {
      name: 'TokenShapley',
      venue: 'ACL Findings 2025',
      icon: Target,
      color: 'indigo',
      stat: '+11-23%',
      statLabel: 'accuracy improvement',
      description: 'Token-level Shapley values for fine-grained attribution. Critical for numbers, years, and names.',
      url: 'https://arxiv.org/abs/2507.05261'
    },
    {
      name: 'AttriBoT',
      venue: '2024',
      icon: Clock,
      color: 'cyan',
      stat: '>300×',
      statLabel: 'speedup for LOO',
      description: 'Cached activations + hierarchical attribution + proxy models for efficient leave-one-out.',
      url: 'https://arxiv.org/abs/2411.15102'
    },
    {
      name: 'TracLLM',
      venue: '2025',
      icon: Layers,
      color: 'purple',
      stat: '89%',
      statLabel: 'poison detection',
      description: 'Long context traceback with contribution score denoising. Forensic analysis and debugging.',
      url: 'https://arxiv.org/abs/2506.04202'
    },
    {
      name: 'AT2',
      venue: '2025',
      icon: Brain,
      color: 'emerald',
      stat: '1×',
      statLabel: 'forward pass',
      description: 'Learns to attribute from attention patterns. On par with ablation at fraction of cost.',
      url: 'https://arxiv.org/abs/2504.13752'
    }
  ];

  const getColorClasses = (color) => ({
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', stat: 'text-indigo-600', badge: 'bg-indigo-100 text-indigo-700' },
    cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', stat: 'text-cyan-600', badge: 'bg-cyan-100 text-cyan-700' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', stat: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', stat: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  })[color];

  return (
    <Slide className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-indigo-500" />
        Advanced Attribution Methods (2024-2025)
      </h2>

      <p className="text-gray-600 mb-4">
        Cutting-edge research addressing efficiency, granularity, and scalability
      </p>

      {/* Methods Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {methods.map((method) => {
          const colors = getColorClasses(method.color);
          const Icon = method.icon;
          
          return (
            <div 
              key={method.name}
              className={`${colors.bg} ${colors.border} border rounded-xl p-4`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${colors.badge}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{method.name}</h3>
                    <span className="text-xs text-gray-500">{method.venue}</span>
                  </div>
                </div>
                <a
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div>
                  <div className={`text-2xl font-bold ${colors.stat}`}>{method.stat}</div>
                  <div className="text-xs text-gray-500">{method.statLabel}</div>
                </div>
              </div>

              <p className="text-sm text-gray-700">{method.description}</p>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-4">
        <h3 className="font-bold text-gray-900 text-sm mb-3">Method Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 font-semibold text-gray-700">Method</th>
                <th className="text-center py-2 px-2 font-semibold text-gray-700">Granularity</th>
                <th className="text-center py-2 px-2 font-semibold text-gray-700">LLM Calls</th>
                <th className="text-center py-2 px-2 font-semibold text-gray-700">Training</th>
                <th className="text-left py-2 px-2 font-semibold text-gray-700">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2 font-medium">TokenShapley</td>
                <td className="py-2 px-2 text-center">Token</td>
                <td className="py-2 px-2 text-center">Many</td>
                <td className="py-2 px-2 text-center">None</td>
                <td className="py-2 px-2 text-gray-600">Precise keyword attribution</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2 font-medium">AttriBoT</td>
                <td className="py-2 px-2 text-center">Sentence</td>
                <td className="py-2 px-2 text-center">~32</td>
                <td className="py-2 px-2 text-center">None</td>
                <td className="py-2 px-2 text-gray-600">Fast LOO approximation</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2 font-medium">TracLLM</td>
                <td className="py-2 px-2 text-center">Chunk</td>
                <td className="py-2 px-2 text-center">1</td>
                <td className="py-2 px-2 text-center">None</td>
                <td className="py-2 px-2 text-gray-600">Long context, poison detection</td>
              </tr>
              <tr>
                <td className="py-2 px-2 font-medium">AT2</td>
                <td className="py-2 px-2 text-center">Chunk</td>
                <td className="py-2 px-2 text-center">1</td>
                <td className="py-2 px-2 text-center">Required</td>
                <td className="py-2 px-2 text-gray-600">Production speed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-indigo-900 rounded-xl p-4 text-white">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            <strong className="text-indigo-200">Research Trend:</strong>
            <span className="text-indigo-100 ml-1">
              2024-2025 focuses on efficiency (AttriBoT, AT2), granularity (TokenShapley), and long-context (TracLLM).
              Production systems can now achieve ablation-quality attribution at practical speeds.
            </span>
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default AdvancedMethodsSlide;
