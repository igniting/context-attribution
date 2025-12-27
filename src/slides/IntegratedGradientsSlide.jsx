import React, { useState, useEffect } from 'react';
import { Zap, RotateCcw, ExternalLink, ArrowDown, Layers } from 'lucide-react';
import { Slide } from '../components';

const IntegratedGradientsSlide = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const maxSteps = 10;

  // Example from Captum tutorial - token-level attribution
  const prompt = "Dave lives in Palm Coast, FL and is a lawyer.";
  const tokens = [
    { word: 'Dave', score: 0.08 },
    { word: 'lives', score: 0.42 },
    { word: 'in', score: 0.05 },
    { word: 'Palm', score: 0.28 },
    { word: 'Coast', score: 0.22 },
    { word: ',', score: 0.02 },
    { word: 'FL', score: 0.15 },
    { word: 'and', score: 0.03 },
    { word: 'is', score: 0.04 },
    { word: 'a', score: 0.02 },
    { word: 'lawyer', score: 0.35 },
    { word: '.', score: 0.01 },
  ];

  const target = "playing golf, hiking, and cooking.";

  // Auto-play animation
  useEffect(() => {
    if (isPlaying && step < maxSteps) {
      const timer = setTimeout(() => setStep(s => s + 1), 300);
      return () => clearTimeout(timer);
    } else if (step >= maxSteps) {
      setIsPlaying(false);
    }
  }, [isPlaying, step]);

  const resetAnimation = () => {
    setStep(0);
    setIsPlaying(true);
  };

  const getInterpolatedScore = (token) => {
    const progress = step / maxSteps;
    return token.score * progress;
  };

  const maxScore = Math.max(...tokens.map(t => t.score));

  const getBarColor = (score, maxS) => {
    const ratio = score / maxS;
    if (ratio > 0.7) return 'bg-amber-500';
    if (ratio > 0.4) return 'bg-amber-400';
    if (ratio > 0.2) return 'bg-amber-300';
    return 'bg-gray-300';
  };

  return (
    <Slide className="bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Zap className="w-8 h-8 text-amber-500" />
        Gradient-Based Attribution
      </h2>

      <p className="text-gray-600 mb-4">
        Compute gradients of output log-probability with respect to embedding layer.
        Using <code className="bg-gray-100 px-1 rounded text-sm">LayerIntegratedGradients</code> on <code className="bg-gray-100 px-1 rounded text-sm">model.embed_tokens</code>
      </p>

      <div className="grid md:grid-cols-5 gap-4 mb-4">
        {/* Left: Path visualization */}
        <div className="md:col-span-2 bg-white rounded-xl border border-amber-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-sm">Integration Path</h3>
            {step >= maxSteps ? (
              <button
                onClick={resetAnimation}
                className="px-2 py-1 bg-amber-500 text-white text-xs rounded hover:bg-amber-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Replay
              </button>
            ) : (
              <div className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">
                α = {(step / maxSteps).toFixed(1)}
              </div>
            )}
          </div>

          {/* Path visualization */}
          <div className="relative mb-4">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-center w-full">
                <div className="text-gray-500 text-xs mb-1">Baseline (α=0)</div>
                <code className="text-xs text-gray-600">Zero embeddings</code>
              </div>
              
              <div className="relative w-full h-32">
                {/* Gradient path */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2" />
                
                {/* Current position indicator */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg transition-all duration-300"
                  style={{ top: `${(step / maxSteps) * 100}%`, transform: 'translate(-50%, -50%)' }}
                >
                  ∇
                </div>
                
                {/* Path markers */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-colors ${
                      (i / 4) <= (step / maxSteps) ? 'bg-amber-400' : 'bg-gray-300'
                    }`}
                    style={{ top: `${(i / 4) * 100}%`, transform: 'translate(-50%, -50%)' }}
                  />
                ))}
              </div>
              
              <div className="bg-amber-100 rounded-lg px-3 py-2 text-sm text-center w-full border border-amber-200">
                <div className="text-amber-600 text-xs mb-1">Input (α=1)</div>
                <code className="text-xs text-amber-700">Actual embeddings</code>
              </div>
            </div>
          </div>

          {/* Formula */}
          <div className="bg-gray-50 rounded-lg p-3 text-xs font-mono text-gray-700">
            <div className="text-amber-600 mb-1">// Sum gradients along path</div>
            IG(x) = (x - x') × ∫₀¹ ∇F(x' + α(x-x')) dα
          </div>
        </div>

        {/* Right: Token attributions */}
        <div className="md:col-span-3 bg-white rounded-xl border border-amber-200 p-4 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-2">Token Attribution (Sequence Level)</h3>
          <p className="text-xs text-gray-500 mb-3">
            Attribution scores summed across all output tokens
          </p>

          {/* Token bars */}
          <div className="space-y-2 mb-4">
            {tokens.map((token, idx) => {
              const score = getInterpolatedScore(token);
              const barWidth = (score / maxScore) * 100;
              
              return (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-16 text-right font-mono text-xs text-gray-600 truncate">
                    {token.word}
                  </div>
                  <div className="flex-1 bg-gray-100 rounded h-5 overflow-hidden">
                    <div
                      className={`h-full ${getBarColor(token.score, maxScore)} transition-all duration-200 rounded flex items-center justify-end pr-1`}
                      style={{ width: `${Math.max(barWidth, 2)}%` }}
                    >
                      {barWidth > 15 && (
                        <span className="text-xs text-white font-medium">
                          {(score * 100).toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-10 text-xs text-gray-400 text-right">
                    {(score * 100).toFixed(0)}%
                  </div>
                </div>
              );
            })}
          </div>

          {/* Target */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Target output:</div>
            <div className="text-sm text-gray-800">"{target}"</div>
          </div>
        </div>
      </div>

      {/* Key insight */}
      {step >= maxSteps && (
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-4">
          <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600" />
            Interpretation
          </h3>
          <p className="text-gray-700 text-sm">
            <span className="font-medium text-amber-700">"lives"</span> has highest attribution (42%) — the verb strongly signals the model to predict personal activities.
            <span className="font-medium text-amber-700"> "lawyer"</span> and <span className="font-medium text-amber-700">"Palm Coast"</span> follow, linking occupation and location to predicted hobbies.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Note: Attribution varies by layer — explore <code className="bg-gray-100 px-1 rounded">model.model.layers[N]</code> for different perspectives.
          </p>
        </div>
      )}

      {/* Key papers */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-500">Key Papers:</span>
        <a
          href="https://arxiv.org/abs/1703.01365"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded hover:bg-amber-200"
        >
          Integrated Gradients (ICML 2017)
          <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href="https://arxiv.org/abs/2505.17630"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded hover:bg-amber-200"
        >
          GIM Framework (2025)
          <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href="https://captum.ai/tutorials/Llama2_LLM_Attribution"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Captum Tutorial
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </Slide>
  );
};

export default IntegratedGradientsSlide;
