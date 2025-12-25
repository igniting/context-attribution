import React, { useState, useEffect } from 'react';
import { CheckCircle, Search, FileText, ArrowRight, MessageSquare, Sparkles, AlertTriangle } from 'lucide-react';
import { Slide } from '../components';

const WhatIsAttributionSlide = () => {
  const [hoveredSource, setHoveredSource] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Interactive demo data
  const sources = [
    { id: 1, text: "The Eiffel Tower was built in 1889 for the World's Fair. It stands 330 meters tall.", color: 'emerald', attribution: 0.85 },
    { id: 2, text: "Paris is the capital of France, located along the Seine River.", color: 'blue', attribution: 0.72 },
    { id: 3, text: "The tower was designed by Gustave Eiffel's engineering company.", color: 'purple', attribution: 0.45 },
    { id: 4, text: "French cuisine is known for croissants and baguettes.", color: 'gray', attribution: 0.02 },
  ];

  const responseTokens = [
    { text: "The", sourceId: null },
    { text: "Eiffel Tower", sourceId: 1 },
    { text: "is a", sourceId: null },
    { text: "330-meter", sourceId: 1 },
    { text: "iron lattice structure in", sourceId: null },
    { text: "Paris, France", sourceId: 2 },
    { text: ", built in", sourceId: null },
    { text: "1889", sourceId: 1 },
    { text: "by", sourceId: null },
    { text: "Gustave Eiffel", sourceId: 3 },
    { text: "." , sourceId: null },
  ];

  // Auto-start animation on mount
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => {
        const next = prev + 1;
        if (next >= responseTokens.length) {
          setAnimationComplete(true);
          clearInterval(timer);
          return responseTokens.length - 1;
        }
        return next;
      });
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const getSourceColor = (sourceId, type = 'bg') => {
    const source = sources.find(s => s.id === sourceId);
    if (!source) return type === 'bg' ? 'bg-gray-100' : 'text-gray-600';
    const colors = {
      emerald: type === 'bg' ? 'bg-emerald-100 border-emerald-400' : 'text-emerald-700',
      blue: type === 'bg' ? 'bg-blue-100 border-blue-400' : 'text-blue-700',
      purple: type === 'bg' ? 'bg-purple-100 border-purple-400' : 'text-purple-700',
      gray: type === 'bg' ? 'bg-gray-100 border-gray-300' : 'text-gray-500',
    };
    return colors[source.color];
  };

  const resetDemo = () => {
    setAnimationStep(0);
    setAnimationComplete(false);
    setSelectedWord(null);
    setHoveredSource(null);
  };

  return (
    <Slide
      className="bg-gradient-to-br from-slate-50 via-white to-indigo-50"
      references={['contextCite', 'alce', 'anthropicBiology', 'selfRag']}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2">What is Context Attribution?</h2>

      <p className="text-lg text-gray-600 mb-4">
        Answering: <span className="text-gray-900 font-semibold">which parts of the input context influenced the model's output?</span>
      </p>

      {/* Interactive Demo */}
      <div className="space-y-4">
        {/* Query */}
        <div className="bg-indigo-900 rounded-xl p-3 text-white">
          <div className="flex items-center gap-2 text-indigo-300 text-xs mb-1">
            <MessageSquare className="w-4 h-4" />
            User Query
          </div>
          <p className="font-medium">"Tell me about the Eiffel Tower"</p>
        </div>

        {/* Sources Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
              <FileText className="w-4 h-4" />
              Retrieved Context Sources
            </div>
            <div className="text-xs text-gray-400">Hover to highlight attributions</div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-2">
            {sources.map((source) => (
              <div
                key={source.id}
                onMouseEnter={() => setHoveredSource(source.id)}
                onMouseLeave={() => setHoveredSource(null)}
                className={`relative rounded-lg p-3 border-2 cursor-pointer transition-all duration-200 ${
                  hoveredSource === source.id || selectedWord === source.id
                    ? getSourceColor(source.id, 'bg') + ' scale-[1.02]'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-700">{source.text}</div>
                  <div className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                    source.attribution > 0.5 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : source.attribution > 0.1 
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-500'
                  }`}>
                    {(source.attribution * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response with Attribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Model Response with Attributions
            </div>
            {animationComplete && (
              <button
                onClick={resetDemo}
                className="px-3 py-1 bg-indigo-500 text-white text-xs rounded-lg hover:bg-indigo-600 transition-colors"
              >
                ▶ Replay
              </button>
            )}
          </div>
          
          <div className="text-lg leading-relaxed">
            {responseTokens.map((token, idx) => {
              const isVisible = idx <= animationStep;
              const isHighlighted = hoveredSource && token.sourceId === hoveredSource;
              const isActive = selectedWord === token.sourceId && token.sourceId !== null;
              
              return (
                <span
                  key={idx}
                  onClick={() => token.sourceId && setSelectedWord(token.sourceId === selectedWord ? null : token.sourceId)}
                  onMouseEnter={() => token.sourceId && setHoveredSource(token.sourceId)}
                  onMouseLeave={() => setHoveredSource(null)}
                  className={`transition-all duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  } ${
                    token.sourceId 
                      ? `cursor-pointer border-b-2 ${getSourceColor(token.sourceId, 'bg')} px-1 mx-0.5 rounded ${
                          isHighlighted || isActive ? 'ring-2 ring-offset-1 ring-indigo-400' : ''
                        }`
                      : ''
                  }`}
                >
                  {token.text}
                  {token.text !== '.' && ' '}
                </span>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-100">
            {sources.filter(s => s.attribution > 0.1).map(source => (
              <div key={source.id} className="flex items-center gap-1.5 text-xs">
                <div className={`w-3 h-3 rounded ${getSourceColor(source.id, 'bg').split(' ')[0]}`} />
                <span className="text-gray-600">Source {source.id}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-3 h-3 rounded bg-gray-200" />
              <span>No attribution</span>
            </div>
          </div>
        </div>

        {/* Attribution Types */}
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-emerald-500">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Corroborative Attribution</h3>
            </div>
            <p className="text-gray-600 text-sm mb-2">
              What context <em className="text-emerald-700 font-semibold">supports</em> a generated statement?
            </p>
            <div className="bg-white/70 rounded-lg p-2 text-xs border border-emerald-100">
              <span className="font-medium text-emerald-700">Use case:</span> Citation verification, fact-checking
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-blue-500">
                <Search className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Contributive Attribution</h3>
            </div>
            <p className="text-gray-600 text-sm mb-2">
              What context <em className="text-blue-700 font-semibold">caused</em> the generation?
            </p>
            <div className="bg-white/70 rounded-lg p-2 text-xs border border-blue-100">
              <span className="font-medium text-blue-700">Use case:</span> Debugging, hallucination tracing
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Key insight:</span> A source may <em>support</em> a claim without being the <em>cause</em> of its generation.
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default WhatIsAttributionSlide;
