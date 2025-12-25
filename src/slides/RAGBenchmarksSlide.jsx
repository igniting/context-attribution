import React from 'react';
import { TrendingUp, BookOpen, AlertTriangle } from 'lucide-react';
import { Slide } from '../components';

const RAGBenchmarksSlide = () => {
  return (
    <Slide className="bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <TrendingUp className="w-10 h-10 text-cyan-500" />
        RAG Attribution Benchmarks
      </h2>
      
      <p className="text-xl text-gray-600 mb-8">
        Standardized evaluation frameworks for measuring citation quality and faithfulness
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-600" />
            ALCE Benchmark
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Princeton NLP (EMNLP 2023) — First systematic evaluation framework for RAG citation quality
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">ASQA</span>
              <span className="text-gray-900 font-medium">Ambiguous factoid QA</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">QAMPARI</span>
              <span className="text-gray-900 font-medium">List QA</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">ELI5</span>
              <span className="text-gray-900 font-medium">Long-form how/why</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-orange-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Key Finding
          </h3>
          <div className="text-center py-4">
            <div className="text-5xl font-bold text-orange-600 mb-2">~50%</div>
            <p className="text-gray-600">
              Even GPT-4 lacks complete citation support on ELI5 dataset
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Faithfulness Evaluation Methods</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">NLI-Based Checking</h4>
            <p className="text-gray-600 text-sm">Models like TRUE (T5-11B) check if cited passages entail generated statements</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">RAGAS</h4>
            <p className="text-gray-600 text-sm">Breaks responses into statements, verifies each against context, averages scores</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Semantic Illusion</h4>
            <p className="text-gray-600 text-sm">2025 research: embeddings fail on real hallucinations (100% FPR)</p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default RAGBenchmarksSlide;

