import React from 'react';
import { Cloud, Code, CheckCircle, Zap, ExternalLink } from 'lucide-react';
import { Slide } from '../components';

const ProductionAPIsSlide = () => {
  const apis = [
    {
      name: 'Anthropic Citations',
      color: 'purple',
      stat: '+15%',
      statLabel: 'recall vs prompting',
      features: ['Sentence-level chunking', 'Zero token cost for citations', 'Structured citation data'],
      code: `"citations": [{ "document_id": "doc_1", "cited_text": "..." }]`
    },
    {
      name: 'Google Gemini Grounding',
      color: 'blue',
      stat: '$35',
      statLabel: 'per 1k queries',
      features: ['groundingMetadata', 'Confidence scores', 'Dynamic retrieval threshold'],
      code: `"groundingSupports": [{ "segment": {...}, "confidenceScores": [0.95] }]`
    },
    {
      name: 'OpenAI Web Search',
      color: 'emerald',
      stat: 'Built-in',
      statLabel: 'inline citations',
      features: ['url_citation annotations', 'Automatic source verification', 'Streaming compatible'],
      code: `"annotations": [{ "type": "url_citation", "url": "...", "title": "..." }]`
    }
  ];

  const getColorClasses = (color) => ({
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', stat: 'text-purple-600' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', stat: 'text-blue-600' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', stat: 'text-emerald-600' },
  })[color];

  return (
    <Slide className="bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Cloud className="w-8 h-8 text-slate-600" />
        Production Citation APIs
      </h2>

      <p className="text-gray-600 mb-4">
        Native attribution from major AI providers — ready for production deployment
      </p>

      {/* APIs Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {apis.map((api) => {
          const colors = getColorClasses(api.color);
          
          return (
            <div 
              key={api.name}
              className={`${colors.bg} ${colors.border} border rounded-xl p-4`}
            >
              <h3 className="font-bold text-gray-900 mb-2">{api.name}</h3>
              
              <div className="flex items-baseline gap-2 mb-3">
                <span className={`text-2xl font-bold ${colors.stat}`}>{api.stat}</span>
                <span className="text-xs text-gray-500">{api.statLabel}</span>
              </div>

              <div className="space-y-1 mb-3">
                {api.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 rounded-lg p-2 text-xs font-mono text-gray-300 overflow-x-auto">
                {api.code}
              </div>
            </div>
          );
        })}
      </div>

      {/* Observability Tools */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-gray-900">Observability & Tracing Infrastructure</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 border">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-gray-800 text-sm">Langfuse</span>
              <a href="https://github.com/langfuse/langfuse" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>
            </div>
            <div className="text-xs text-gray-500 mb-2">Open-source LLM engineering</div>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" /> Full traces
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" /> RAG step tracking
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" /> Cost monitoring
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-gray-800 text-sm">LangSmith</span>
              <a href="https://www.langchain.com/langsmith" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>
            </div>
            <div className="text-xs text-gray-500 mb-2">LangChain's commercial platform</div>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" /> Real-time dashboards
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" /> Agent behavior tracing
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" /> Evaluation datasets
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-gray-800 text-sm">Azure AI Content Safety</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">Enterprise groundedness</div>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" /> Ungrounded text detection
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" /> Correction suggestions
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" /> Compliance logging
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-slate-900 rounded-xl p-4 text-white">
        <div className="flex items-start gap-3">
          <Code className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            <strong className="text-slate-200">Integration Strategy:</strong>
            <span className="text-slate-300 ml-1">
              Start with native APIs (Anthropic/Google) for RAG. Add Langfuse for observability.
              Use ContextCite for debugging when native citations don't explain behavior.
            </span>
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default ProductionAPIsSlide;
