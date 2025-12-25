import React, { useState } from 'react';
import { Code, Users, AlertTriangle, Building, ChevronDown, ChevronUp } from 'lucide-react';
import { Slide } from '../components';

const UseCasesSlide = () => {
  const [expanded, setExpanded] = useState(null);
  
  const useCases = [
    {
      icon: Code,
      title: 'Agent Debugging',
      color: 'blue',
      preview: 'Trace multi-step reasoning to find errors',
      detail: 'Comprehensive logging of prompt history, model actions, and retrieval events enables error localization and performance bottleneck identification. Tools like CometLLM and LangSmith provide experiment tracking.',
      stat: '78%',
      statLabel: 'reduction in false info with multi-model verification'
    },
    {
      icon: Users,
      title: 'Trust Calibration',
      color: 'emerald',
      preview: 'Help users appropriately rely on AI outputs',
      detail: 'Research shows LLM-powered analysis as a secondary advisor improves appropriate reliance. However, explanations only increase trust when users can compare responses—gains disappear in isolation.',
      stat: 'CHI 2025',
      statLabel: 'Human trust research findings'
    },
    {
      icon: AlertTriangle,
      title: 'Hallucination Detection',
      color: 'orange',
      preview: 'Identify unsupported claims in outputs',
      detail: 'Semantic entropy analysis detects hallucinations with 89-91% accuracy. RAG-HAT generates labels and descriptions of hallucinations, then uses GPT-4 for correction.',
      stat: '89-91%',
      statLabel: 'accuracy with semantic entropy'
    },
    {
      icon: Building,
      title: 'Regulatory Compliance',
      color: 'purple',
      preview: 'Meet EU AI Act and GDPR requirements',
      detail: 'EU AI Act (effective Aug 2024, compliance by Aug 2026) requires high-risk systems to be transparent. GDPR Article 22 mandates meaningful information about automated decision logic.',
      stat: '€35M',
      statLabel: 'maximum penalty for violations'
    }
  ];
  
  const getColor = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 border-blue-400',
      emerald: 'from-emerald-500 to-emerald-600 border-emerald-400',
      orange: 'from-orange-500 to-orange-600 border-orange-400',
      purple: 'from-purple-500 to-purple-600 border-purple-400'
    };
    return colors[color];
  };
  
  return (
    <Slide className="bg-gradient-to-br from-gray-50 to-white">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Building className="w-10 h-10 text-purple-500" />
        Use Cases in LLM Agents
      </h2>
      
      <p className="text-xl text-gray-600 mb-8">
        Attribution enables debugging, trust, and compliance across agent applications
      </p>
      
      <div className="grid md:grid-cols-2 gap-4">
        {useCases.map((uc, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${getColor(uc.color)} rounded-2xl p-5 border cursor-pointer transition-all hover:scale-[1.02] shadow-lg`}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur">
                  <uc.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{uc.title}</h4>
                  <p className="text-white/80 text-sm">{uc.preview}</p>
                </div>
              </div>
              {expanded === i ? (
                <ChevronUp className="w-5 h-5 text-white/60" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white/60" />
              )}
            </div>
            
            {expanded === i && (
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-white/90 text-sm mb-4">{uc.detail}</p>
                <div className="bg-white/20 backdrop-blur rounded-xl p-4 flex items-center gap-4">
                  <div className="text-3xl font-bold text-white">{uc.stat}</div>
                  <div className="text-white/70 text-sm">{uc.statLabel}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Slide>
  );
};

export default UseCasesSlide;

