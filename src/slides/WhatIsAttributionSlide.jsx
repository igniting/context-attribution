import React from 'react';
import { CheckCircle, Search, BookOpen } from 'lucide-react';
import { Slide } from '../components';

const WhatIsAttributionSlide = () => {
  return (
    <Slide className="bg-white">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">What is Context Attribution?</h2>

      <p className="text-xl text-gray-600 mb-8 max-w-3xl">
        Context attribution answers a fundamental question: <span className="text-gray-900 font-semibold">which parts of the input context influenced the model's output?</span>
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Corroborative Attribution</h3>
          </div>
          <p className="text-gray-600 mb-3">
            What context <em className="text-emerald-700 font-medium">supports</em> a generated statement?
            Used for <span className="font-medium">citation verification</span> and fact-checking.
          </p>
          <div className="bg-white/60 rounded-lg p-3 text-sm text-gray-600 border border-emerald-100">
            <span className="font-medium text-emerald-700">Example:</span> Given claim "Paris is in France", which retrieved documents contain supporting evidence?
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Contributive Attribution</h3>
          </div>
          <p className="text-gray-600 mb-3">
            What context <em className="text-blue-700 font-medium">caused</em> the generation?
            Used for <span className="font-medium">debugging</span> and understanding model behavior.
          </p>
          <div className="bg-white/60 rounded-lg p-3 text-sm text-gray-600 border border-blue-100">
            <span className="font-medium text-blue-700">Example:</span> Why did the model claim "Earth is flat"? Which source led to this hallucination?
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default WhatIsAttributionSlide;
