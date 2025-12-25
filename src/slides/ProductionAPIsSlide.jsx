import React, { useState } from 'react';
import { Cloud, Code, CheckCircle, DollarSign, ExternalLink, Zap } from 'lucide-react';
import { Slide } from '../components';

const ProductionAPIsSlide = () => {
  const [activeAPI, setActiveAPI] = useState('anthropic');

  const apis = {
    anthropic: {
      name: 'Anthropic Citations',
      color: 'purple',
      features: [
        '15% higher recall accuracy than prompt-based approaches',
        'Automatic sentence-level chunking of documents',
        'cited_text does not count toward output tokens',
        'Returns structured citation data with text spans'
      ],
      pricing: 'Standard Claude API pricing',
      users: 'Thomson Reuters CoCounsel for legal documents'
    },
    google: {
      name: 'Google Gemini Grounding',
      color: 'blue',
      features: [
        'Returns groundingMetadata with source URLs',
        'Includes titles and text spans linked to sources',
        'Dynamic retrieval with adjustable threshold',
        'Grounding chunks with confidence scores'
      ],
      pricing: '$35 per 1,000 grounded queries',
      users: 'Enterprise knowledge management'
    },
    openai: {
      name: 'OpenAI Web Search',
      color: 'emerald',
      features: [
        'Inline citations with url_citation annotations',
        'Returns URL, title, and source location',
        'Integrates with function calling',
        'Automatic source verification'
      ],
      pricing: 'Per-search pricing (varies)',
      users: 'ChatGPT search integration'
    }
  };

  const getColorClass = (color, isActive) => {
    const colors = {
      purple: isActive ? 'bg-purple-600 text-white' : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50',
      blue: isActive ? 'bg-blue-600 text-white' : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50',
      emerald: isActive ? 'bg-emerald-600 text-white' : 'bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50'
    };
    return colors[color];
  };

  const active = apis[activeAPI];

  return (
    <Slide
      className="bg-gradient-to-br from-slate-50 via-white to-gray-50"
      references={['langfuse', 'langsmith']}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Cloud className="w-8 h-8 text-slate-600" />
        Production Citation APIs & Infrastructure
      </h2>

      <p className="text-gray-600 mb-4">
        Native attribution capabilities from major AI providers — ready for production deployment
      </p>

      {/* API Selector */}
      <div className="flex gap-2 mb-4">
        {Object.entries(apis).map(([key, api]) => (
          <button
            key={key}
            onClick={() => setActiveAPI(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${getColorClass(api.color, activeAPI === key)}`}
          >
            {api.name}
          </button>
        ))}
      </div>

      {/* Anthropic Details */}
      {activeAPI === 'anthropic' && (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Anthropic Citations API (January 2025)</h3>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4 font-mono text-xs overflow-x-auto">
              <div className="text-purple-400 mb-2">// Response structure with citations</div>
              <div className="text-gray-300">
{`{
  "content": [
    {
      "type": "text",
      "text": "According to the document, Paris is the capital.",
      "citations": [
        {
          "type": "document_citation",
          "document_id": "doc_1",
          "start_index": 0,
          "end_index": 156,
          "cited_text": "Paris is the capital of France..."
        }
      ]
    }
  ]
}`}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                <h4 className="font-semibold text-purple-800 text-sm mb-2">Key Metrics</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-purple-700"><strong>+15%</strong> recall vs prompting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-purple-700">Sentence-level granularity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-purple-700">Zero token cost for citations</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                <h4 className="font-semibold text-purple-800 text-sm mb-2">Document Types Supported</h4>
                <div className="flex flex-wrap gap-1">
                  {['PDF', 'Plain Text', 'HTML', 'Markdown', 'Custom chunks'].map(type => (
                    <span key={type} className="px-2 py-0.5 rounded bg-white text-purple-700 text-xs border border-purple-200">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Google Details */}
      {activeAPI === 'google' && (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Google Gemini Grounding API</h3>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4 font-mono text-xs overflow-x-auto">
              <div className="text-blue-400 mb-2">// groundingMetadata response structure</div>
              <div className="text-gray-300">
{`{
  "groundingMetadata": {
    "webSearchQueries": ["Paris capital France"],
    "groundingChunks": [
      {
        "web": {
          "uri": "https://...",
          "title": "Paris - Wikipedia"
        }
      }
    ],
    "groundingSupports": [
      {
        "segment": { "startIndex": 0, "endIndex": 45 },
        "groundingChunkIndices": [0],
        "confidenceScores": [0.95]
      }
    ]
  }
}`}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <h4 className="font-semibold text-blue-800 text-sm mb-2">Dynamic Retrieval</h4>
                <p className="text-blue-700 text-xs">
                  Set <code className="bg-white px-1 rounded">dynamicRetrievalConfig</code> with threshold (0-1).
                  Higher = more selective grounding.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <h4 className="font-semibold text-blue-800 text-sm mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Pricing
                </h4>
                <p className="text-blue-700 text-xs">
                  <strong>$35</strong> per 1,000 grounded queries.
                  Additional costs for Vertex AI infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OpenAI Details */}
      {activeAPI === 'openai' && (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">OpenAI Web Search Tool</h3>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4 font-mono text-xs overflow-x-auto">
              <div className="text-emerald-400 mb-2">// url_citation annotation object</div>
              <div className="text-gray-300">
{`{
  "type": "url_citation",
  "url": "https://example.com/article",
  "title": "Article Title",
  "start_index": 42,
  "end_index": 156,
  "text": "The cited text from the source..."
}`}
              </div>
            </div>

            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
              <h4 className="font-semibold text-emerald-800 text-sm mb-2">Integration Pattern</h4>
              <p className="text-emerald-700 text-xs">
                Web search is available as a tool in the Responses API. Citations are automatically 
                embedded in responses when web sources are used. Compatible with streaming.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Observability Tools */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Observability & Tracing Infrastructure
        </h3>

        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 border">
            <div className="font-semibold text-gray-800 text-sm mb-1">Langfuse</div>
            <div className="text-xs text-gray-600 mb-2">Open-source LLM engineering platform</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1 text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500" /> Full traces (prompts, outputs, tools)
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500" /> RAG retrieval step tracking
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500" /> Cost & latency monitoring
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border">
            <div className="font-semibold text-gray-800 text-sm mb-1">LangSmith</div>
            <div className="text-xs text-gray-600 mb-2">LangChain's commercial platform</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1 text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500" /> Real-time monitoring dashboards
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500" /> Agent behavior tracing
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500" /> Evaluation datasets
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border">
            <div className="font-semibold text-gray-800 text-sm mb-1">Azure AI Content Safety</div>
            <div className="text-xs text-gray-600 mb-2">Enterprise groundedness detection</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1 text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500" /> Automatic ungrounded text detection
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500" /> Correction suggestions
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500" /> Compliance logging
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-3 text-white">
        <div className="flex items-start gap-3">
          <Code className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="text-slate-200">Integration Strategy:</strong>
            <span className="text-slate-300 ml-1">
              For RAG applications, start with native APIs (Anthropic/Google). Add Langfuse for observability.
              Use ContextCite for debugging when native citations don't explain behavior.
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default ProductionAPIsSlide;

