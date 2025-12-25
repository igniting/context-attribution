import React from 'react';
import { Code } from 'lucide-react';
import { Slide } from '../components';

const IndustryToolsSlide = () => {
  const tools = [
    { name: 'Anthropic Citations', type: 'API', category: 'Production', metric: '+15% recall vs prompting' },
    { name: 'ContextCite', type: 'Research', category: 'Perturbation', metric: '~32 ablations needed' },
    { name: 'TransformerLens', type: 'Open Source', category: 'Mechanistic', metric: '2.8k GitHub stars' },
    { name: 'Langfuse', type: 'Open Source', category: 'Observability', metric: 'Full trace capture' },
    { name: 'LangSmith', type: 'Commercial', category: 'Observability', metric: 'Real-time monitoring' },
    { name: 'Self-RAG', type: 'Research', category: 'Self-Reflection', metric: '55.8% PopQA accuracy' },
  ];
  
  const getTypeColor = (type) => {
    const colors = {
      'API': 'bg-blue-100 text-blue-700 border-blue-200',
      'Research': 'bg-purple-100 text-purple-700 border-purple-200',
      'Commercial': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Open Source': 'bg-cyan-100 text-cyan-700 border-cyan-200'
    };
    return colors[type];
  };
  
  return (
    <Slide className="bg-white">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Code className="w-10 h-10 text-indigo-500" />
        Industry Tools & Frameworks
      </h2>
      
      <p className="text-xl text-gray-600 mb-8">
        The gap between research and production has narrowed substantially
      </p>
      
      <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-100">
              <th className="text-left py-4 px-6 text-gray-700 text-sm font-semibold">Tool</th>
              <th className="text-left py-4 px-6 text-gray-700 text-sm font-semibold">Type</th>
              <th className="text-left py-4 px-6 text-gray-700 text-sm font-semibold">Category</th>
              <th className="text-left py-4 px-6 text-gray-700 text-sm font-semibold">Key Metric</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-gray-900 font-medium">{tool.name}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(tool.type)}`}>
                    {tool.type}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600 text-sm">{tool.category}</td>
                <td className="py-4 px-6 text-gray-700 text-sm">{tool.metric}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-2">Native Citation APIs</h4>
          <p className="text-gray-600 text-sm">Anthropic, Google Gemini, OpenAI all offer structured citation data</p>
        </div>
        <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
          <h4 className="font-semibold text-gray-900 mb-2">RAG Frameworks</h4>
          <p className="text-gray-600 text-sm">LlamaIndex CitationQueryEngine, LangChain with 4 approaches</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h4 className="font-semibold text-gray-900 mb-2">Interpretability</h4>
          <p className="text-gray-600 text-sm">Captum LLMAttribution, TransformerLens for causal interventions</p>
        </div>
      </div>
    </Slide>
  );
};

export default IndustryToolsSlide;

