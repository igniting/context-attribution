import React from 'react';
import { Scale, Globe, Shield, CheckCircle } from 'lucide-react';
import { Slide } from '../components';

const RegulatorySlide = () => {
  return (
    <Slide className="bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Scale className="w-10 h-10 text-purple-500" />
        Regulatory Landscape
      </h2>
      
      <p className="text-xl text-gray-600 mb-8">
        Attribution is becoming a legal requirement, not just a best practice
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">EU AI Act</h3>
          </div>
          <div className="space-y-3 text-gray-600">
            <p><span className="font-semibold text-gray-900">Effective:</span> August 2024</p>
            <p><span className="font-semibold text-gray-900">Compliance:</span> August 2026</p>
            <p>High-risk systems (credit, employment, law enforcement) must be transparent enough for deployers to interpret outputs appropriately</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">GDPR Article 22</h3>
          </div>
          <div className="space-y-3 text-gray-600">
            <p>Mandates <span className="font-semibold text-gray-900">meaningful information about logic</span> when automated decisions produce legal or significant effects</p>
            <p>Applies to any AI system making consequential decisions about individuals</p>
          </div>
        </div>
      </div>
      
      <div className="bg-red-50 rounded-2xl p-6 border border-red-200 mb-6">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-red-600">€35M</div>
            <div className="text-red-700 text-sm">or 7% global turnover</div>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2">Maximum Penalty for Violations</h4>
            <p className="text-gray-600">
              The AI Act provides abstract regulations making it challenging to define specific compliance metrics — 
              creating both risk and opportunity for organizations implementing attribution systems.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Enterprise Requirements:</h4>
        <div className="grid md:grid-cols-4 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" /> Prompt history logging
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" /> Model decision capture
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" /> Guardrail execution logs
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" /> Tamper-proof records
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default RegulatorySlide;

