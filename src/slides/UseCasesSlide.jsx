import React, { useState } from 'react';
import { Code, Users, AlertTriangle, Building, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Slide, Cite } from '../components';

const UseCasesSlide = () => {
  const [expanded, setExpanded] = useState(null);
  
  const useCases = [
    {
      icon: Code,
      title: 'Agent Debugging',
      color: 'blue',
      preview: 'Trace multi-step reasoning to find errors',
      detail: 'Comprehensive logging of prompt history, model actions, and retrieval events enables error localization. Circuit tracing reveals multi-step reasoning like "Dallas → Texas → Austin".',
      citations: ['anthropicBiology', 'transformerLens'],
      stat: '30M',
      statLabel: 'interpretable features in Anthropic circuit tracing'
    },
    {
      icon: Users,
      title: 'Trust Calibration',
      color: 'emerald',
      preview: 'Help users appropriately rely on AI outputs',
      detail: 'CHI 2025 research shows explanations only increase appropriate trust when users can compare responses. Gains disappear in isolation. LLM-powered analysis as secondary advisor improves reliance.',
      citations: ['humanTrust'],
      stat: 'CHI 2025',
      statLabel: 'Human trust research findings'
    },
    {
      icon: AlertTriangle,
      title: 'Hallucination Detection',
      color: 'orange',
      preview: 'Identify unsupported claims in outputs',
      detail: 'Semantic entropy detects hallucinations with 89-91% accuracy by measuring uncertainty over meanings rather than tokens. DDA achieves 93.49% AUC on hallucination tracing.',
      citations: ['semanticEntropy', 'dda'],
      stat: '89-91%',
      statLabel: 'accuracy with semantic entropy'
    },
    {
      icon: Building,
      title: 'Regulatory Compliance',
      color: 'purple',
      preview: 'Meet EU AI Act and GDPR requirements',
      detail: 'EU AI Act (effective Aug 2024, compliance by Aug 2026) requires high-risk systems to be transparent. GDPR Article 22 mandates meaningful information about automated decision logic. €35M/7% revenue penalties.',
      citations: [],
      stat: '€35M',
      statLabel: 'maximum penalty for violations',
      link: 'https://gdprlocal.com/ai-transparency-requirements/'
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
      <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
        <Building className="w-8 h-8 text-purple-500" />
        Use Cases in LLM Agents
      </h2>
      
      <p className="text-gray-600 mb-6">
        Attribution enables debugging, trust, and compliance across agent applications
      </p>
      
      <div className="grid md:grid-cols-2 gap-3">
        {useCases.map((uc, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${getColor(uc.color)} rounded-xl p-4 border cursor-pointer transition-all hover:scale-[1.01] shadow-lg`}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur">
                  <uc.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{uc.title}</h4>
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
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-white/90 text-sm mb-3">{uc.detail}</p>
                
                {uc.citations.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {uc.citations.map((ref, j) => (
                      <Cite key={j} refKey={ref} />
                    ))}
                  </div>
                )}
                
                {uc.link && (
                  <a 
                    href={uc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-white/80 hover:text-white mb-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" /> GDPR Local Guide
                  </a>
                )}
                
                <div className="bg-white/20 backdrop-blur rounded-lg p-3 flex items-center gap-3">
                  <div className="text-2xl font-bold text-white">{uc.stat}</div>
                  <div className="text-white/70 text-xs">{uc.statLabel}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 bg-gray-900 rounded-xl p-4 text-white">
        <h4 className="font-semibold mb-2 text-sm">Production Tools</h4>
        <div className="grid md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/10 rounded-lg p-2">
            <div className="font-medium text-gray-200">Langfuse</div>
            <p className="text-gray-400">Open-source LLM tracing, RAG retrieval tracking, cost monitoring</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="font-medium text-gray-200">LangSmith</div>
            <p className="text-gray-400">Commercial agent behavior tracing with real-time monitoring</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="font-medium text-gray-200">TransformerLens <Cite refKey="transformerLens" /></div>
            <p className="text-gray-400">Activation patching and causal interventions (2.8k stars)</p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default UseCasesSlide;
