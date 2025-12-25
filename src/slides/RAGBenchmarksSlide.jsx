import React, { useState } from 'react';
import { TrendingUp, BookOpen, Database, CheckCircle, XCircle } from 'lucide-react';
import { Slide } from '../components';

const RAGBenchmarksSlide = () => {
  const [activeDataset, setActiveDataset] = useState('asqa');
  
  const datasets = {
    asqa: {
      name: 'ASQA',
      fullName: 'Answer Summaries for Questions Asked',
      type: 'Ambiguous Factoid QA',
      description: 'Questions with multiple valid interpretations requiring disambiguation',
      example: '"When did the US enter WW2?" → Pacific vs European theater dates',
      metrics: ['EM (Exact Match)', 'Citation Recall', 'Citation Precision'],
      challenge: 'Must cite sources for each interpretation'
    },
    qampari: {
      name: 'QAMPARI',
      fullName: 'QA with Multiple Paragraph Answers Required for Inference',
      type: 'List QA',
      description: 'Questions requiring multiple entity answers with individual citations',
      example: '"Name films directed by Christopher Nolan" → List with per-item citations',
      metrics: ['Recall@k', 'Per-answer Citation F1'],
      challenge: 'Each list item needs separate source attribution'
    },
    eli5: {
      name: 'ELI5',
      fullName: 'Explain Like Im 5',
      type: 'Long-form How/Why',
      description: 'Complex explanatory questions requiring synthesized multi-source answers',
      example: '"Why is the sky blue?" → Multi-paragraph explanation with citations',
      metrics: ['ROUGE-L', 'Citation Coverage', 'Faithfulness'],
      challenge: 'Longest answers, most citations needed, GPT-4 fails ~50%'
    }
  };
  
  const activeData = datasets[activeDataset];
  
  return (
    <Slide className="bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <TrendingUp className="w-8 h-8 text-cyan-500" />
        ALCE Benchmark: Citation Quality Evaluation
      </h2>
      
      <p className="text-lg text-gray-600 mb-4">
        Princeton NLP (EMNLP 2023) — First systematic framework for RAG attribution evaluation
      </p>
      
      {/* Dataset Selector */}
      <div className="flex gap-2 mb-4">
        {Object.entries(datasets).map(([key, data]) => (
          <button
            key={key}
            onClick={() => setActiveDataset(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeDataset === key
                ? 'bg-cyan-600 text-white'
                : 'bg-white border border-cyan-200 text-cyan-700 hover:bg-cyan-50'
            }`}
          >
            {data.name}
          </button>
        ))}
      </div>
      
      {/* Dataset Details */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4 border border-cyan-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-5 h-5 text-cyan-600" />
            <h3 className="text-lg font-bold text-gray-900">{activeData.name}</h3>
            <span className="text-xs text-gray-500">({activeData.type})</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{activeData.description}</p>
          
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="text-xs text-gray-500 mb-1">Example Query:</div>
            <div className="text-sm text-gray-700 font-mono">{activeData.example}</div>
          </div>
          
          <div className="text-xs">
            <span className="font-semibold text-gray-700">Key Challenge: </span>
            <span className="text-gray-600">{activeData.challenge}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-cyan-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Evaluation Metrics</h3>
          <div className="space-y-2">
            {activeData.metrics.map((metric, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-cyan-500" />
                <span className="text-gray-700">{metric}</span>
              </div>
            ))}
          </div>
          
          {activeDataset === 'eli5' && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-orange-600">~50%</div>
                <div className="text-xs text-gray-600">
                  GPT-4 lacks complete<br />citation support
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* NLI-Based Evaluation */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          NLI-Based Citation Verification (TRUE Model)
        </h3>
        
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
            <h4 className="font-semibold text-indigo-800 text-sm mb-2">Model Architecture</h4>
            <p className="text-indigo-700 text-xs">
              <strong>TRUE:</strong> T5-11B fine-tuned on NLI datasets. 
              Checks if cited passage <em>entails</em> the generated statement.
            </p>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
            <h4 className="font-semibold text-indigo-800 text-sm mb-2">Citation Recall</h4>
            <p className="text-indigo-700 text-xs">
              Fraction of generated statements that have at least one supporting citation. 
              Formula: <code className="bg-white px-1 rounded">|supported| / |statements|</code>
            </p>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
            <h4 className="font-semibold text-indigo-800 text-sm mb-2">Citation Precision</h4>
            <p className="text-indigo-700 text-xs">
              Fraction of citations that actually support their claims. 
              Penalizes over-citation and irrelevant references.
            </p>
          </div>
        </div>
      </div>
      
      {/* Key Findings */}
      <div className="bg-cyan-900 rounded-xl p-4 text-white">
        <h4 className="font-semibold mb-2 text-sm">Key ALCE Findings</h4>
        <div className="grid md:grid-cols-3 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
            <span className="text-cyan-100">Post-hoc citation (retrieve after generation) performs worse than inline citation</span>
          </div>
          <div className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
            <span className="text-cyan-100">Longer responses have lower citation precision — more hallucination opportunities</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-cyan-100">Fine-tuning on ALCE significantly improves citation quality over prompting</span>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default RAGBenchmarksSlide;
