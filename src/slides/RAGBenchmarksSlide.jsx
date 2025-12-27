import React from 'react';
import { TrendingUp, BookOpen, CheckCircle, XCircle, ExternalLink, Github } from 'lucide-react';
import { Slide } from '../components';

const RAGBenchmarksSlide = () => {
  const datasets = [
    {
      name: 'ASQA',
      type: 'Ambiguous Factoid QA',
      example: '"When did the US enter WW2?" → Multiple valid dates',
      challenge: 'Must cite sources for each interpretation',
      color: 'blue'
    },
    {
      name: 'QAMPARI',
      type: 'List QA',
      example: '"Films directed by Nolan" → List with per-item citations',
      challenge: 'Each list item needs separate source',
      color: 'purple'
    },
    {
      name: 'ELI5',
      type: 'Long-form How/Why',
      example: '"Why is the sky blue?" → Multi-paragraph explanation',
      challenge: 'GPT-4 fails ~50% on citation support',
      color: 'amber'
    }
  ];

  return (
    <Slide className="bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-cyan-500" />
          ALCE: Citation Quality Benchmark
        </h2>
        <div className="flex gap-2">
          <a
            href="https://arxiv.org/abs/2305.14627"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <ExternalLink className="w-3 h-3" /> arXiv
          </a>
          <a
            href="https://github.com/princeton-nlp/ALCE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <Github className="w-3 h-3" /> Code
          </a>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        Princeton NLP (EMNLP 2023) — First systematic framework for RAG attribution evaluation
      </p>

      {/* Three Datasets */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {datasets.map((dataset) => (
          <div 
            key={dataset.name}
            className={`bg-white rounded-xl p-4 border border-${dataset.color}-200 shadow-sm`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-medium bg-${dataset.color}-100 text-${dataset.color}-700`}>
                {dataset.name}
              </span>
              <span className="text-xs text-gray-500">{dataset.type}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 mb-3 text-xs font-mono text-gray-700">
              {dataset.example}
            </div>
            <div className="text-xs text-gray-600">
              <span className="font-medium">Challenge:</span> {dataset.challenge}
            </div>
          </div>
        ))}
      </div>

      {/* NLI-Based Evaluation */}
      <div className="bg-white rounded-xl p-4 border border-indigo-200 shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-gray-900">NLI-Based Citation Verification (TRUE Model)</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mb-3">
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
            <h4 className="font-semibold text-indigo-800 text-sm mb-1">Architecture</h4>
            <p className="text-indigo-700 text-xs">
              T5-11B fine-tuned on NLI. Checks if cited passage <em>entails</em> the statement.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
            <h4 className="font-semibold text-indigo-800 text-sm mb-1">Citation Recall</h4>
            <p className="text-indigo-700 text-xs">
              Fraction of statements with supporting citations. <code className="bg-white px-1 rounded">|supported| / |statements|</code>
            </p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
            <h4 className="font-semibold text-indigo-800 text-sm mb-1">Citation Precision</h4>
            <p className="text-indigo-700 text-xs">
              Fraction of citations that support claims. Penalizes over-citation.
            </p>
          </div>
        </div>

        {/* Key stat */}
        <div className="flex items-center justify-center gap-6 py-3 bg-amber-50 rounded-lg border border-amber-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600">~50%</div>
            <div className="text-xs text-amber-700">GPT-4 lacks complete citation support on ELI5</div>
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <div className="bg-cyan-900 rounded-xl p-4 text-white">
        <h4 className="font-semibold mb-2 text-sm">Key ALCE Findings</h4>
        <div className="grid md:grid-cols-3 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
            <span className="text-cyan-100">Post-hoc citation (retrieve after generation) performs worse than inline</span>
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
