import React, { useState, useEffect } from 'react';
import { Layers, Play, RotateCcw, ExternalLink, ArrowRight } from 'lucide-react';
import { Slide } from '../components';

const PerturbationAttributionSlide = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Template-based input example (from Captum tutorial)
  const template = {
    text: "{name} lives in {city}, {state} and is a {occupation}. {pronoun} personal interests include",
    features: [
      { key: 'name', value: 'Dave', baseline: 'Sarah', color: 'blue' },
      { key: 'city', value: 'Palm Coast', baseline: 'Seattle', color: 'emerald' },
      { key: 'state', value: 'FL', baseline: 'WA', color: 'emerald' },
      { key: 'occupation', value: 'lawyer', baseline: 'doctor', color: 'purple' },
      { key: 'pronoun', value: 'His', baseline: 'Her', color: 'blue' },
    ],
  };

  const target = "playing golf, hiking, and cooking.";

  // Attribution scores (simulated based on tutorial insights)
  const attributions = [
    { key: 'name', score: 0.12, tokenScores: [0.15, 0.08, 0.10, 0.14, 0.11, 0.09] },
    { key: 'city', score: 0.35, tokenScores: [0.42, 0.28, 0.31, 0.38, 0.35, 0.32] },
    { key: 'state', score: 0.18, tokenScores: [0.20, 0.15, 0.17, 0.19, 0.18, 0.16] },
    { key: 'occupation', score: 0.28, tokenScores: [0.25, 0.32, 0.28, 0.30, 0.26, 0.27] },
    { key: 'pronoun', score: 0.07, tokenScores: [0.05, 0.08, 0.06, 0.09, 0.07, 0.06] },
  ];

  const outputTokens = ['playing', 'golf', ',', 'hiking', ',', 'cooking'];

  // Auto-play animation showing ablation process
  useEffect(() => {
    if (isPlaying && step < template.features.length) {
      const timer = setTimeout(() => setStep(s => s + 1), 800);
      return () => clearTimeout(timer);
    } else if (step >= template.features.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, step, template.features.length]);

  const resetAnimation = () => {
    setStep(0);
    setSelectedFeature(null);
    setIsPlaying(true);
  };

  const getColorClasses = (color) => ({
    blue: { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-700', bar: 'bg-blue-500' },
    emerald: { bg: 'bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-700', bar: 'bg-emerald-500' },
    purple: { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-700', bar: 'bg-purple-500' },
  })[color];

  const maxScore = Math.max(...attributions.map(a => a.score));

  return (
    <Slide className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Layers className="w-8 h-8 text-blue-500" />
        Perturbation-Based Attribution
      </h2>

      <p className="text-gray-600 mb-4">
        Replace features with baselines and measure how output probability changes. Using <code className="bg-gray-100 px-1 rounded text-sm">TextTemplateInput</code> for semantic segments.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Left: Template Input */}
        <div className="bg-white rounded-xl border border-blue-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-sm">Input Template</h3>
            <div className="flex gap-2">
              {step >= template.features.length ? (
                <button
                  onClick={resetAnimation}
                  className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Replay
                </button>
              ) : (
                <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                  Ablating... {step}/{template.features.length}
                </div>
              )}
            </div>
          </div>

          {/* Template visualization */}
          <div className="text-sm leading-relaxed mb-4">
            {template.features.map((feature, idx) => {
              const colors = getColorClasses(feature.color);
              const isAblated = idx < step;
              const isActive = idx === step - 1;
              
              return (
                <React.Fragment key={feature.key}>
                  {idx === 0 && <span className="text-gray-600"></span>}
                  <span
                    className={`inline-block px-1.5 py-0.5 mx-0.5 rounded cursor-pointer transition-all ${
                      isAblated 
                        ? `${colors.bg} ${colors.text} ${isActive ? 'ring-2 ring-offset-1 ring-blue-400' : ''}`
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setSelectedFeature(feature.key)}
                  >
                    {isAblated ? (
                      <span className="line-through opacity-50">{feature.value}</span>
                    ) : (
                      feature.value
                    )}
                    {isAblated && (
                      <span className="ml-1 font-medium">{feature.baseline}</span>
                    )}
                  </span>
                  {idx === 0 && <span className="text-gray-600"> lives in </span>}
                  {idx === 1 && <span className="text-gray-600">, </span>}
                  {idx === 2 && <span className="text-gray-600"> and is a </span>}
                  {idx === 3 && <span className="text-gray-600">. </span>}
                  {idx === 4 && <span className="text-gray-600"> personal interests include</span>}
                </React.Fragment>
              );
            })}
          </div>

          {/* Target */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Target output:</div>
            <div className="text-sm font-medium text-gray-800">"{target}"</div>
          </div>

          {/* Baseline explanation */}
          <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
            <span className="font-medium">Baselines:</span> In-distribution replacements to keep prompt meaningful when features are "absent"
          </div>
        </div>

        {/* Right: Attribution Scores */}
        <div className="bg-white rounded-xl border border-blue-200 p-4 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-3">Feature Attribution Scores</h3>
          
          <div className="space-y-3">
            {attributions.map((attr, idx) => {
              const feature = template.features.find(f => f.key === attr.key);
              const colors = getColorClasses(feature?.color || 'blue');
              const isRevealed = idx < step;
              const barWidth = (attr.score / maxScore) * 100;
              
              return (
                <div 
                  key={attr.key}
                  className={`transition-all duration-300 ${isRevealed ? 'opacity-100' : 'opacity-30'}`}
                  onClick={() => isRevealed && setSelectedFeature(attr.key)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${selectedFeature === attr.key ? colors.text : 'text-gray-700'}`}>
                      {attr.key}
                    </span>
                    <span className="text-xs text-gray-500">
                      {isRevealed ? `${(attr.score * 100).toFixed(1)}%` : '?'}
                    </span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors.bar} transition-all duration-500 rounded-full`}
                      style={{ width: isRevealed ? `${barWidth}%` : '0%' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interpretation */}
          {step >= template.features.length && (
            <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600">
              <span className="font-medium text-blue-700">Finding:</span> "Palm Coast" has highest attribution for "golf" — location strongly influences predicted interests
            </div>
          )}
        </div>
      </div>

      {/* Token-level heatmap (shown when animation complete) */}
      {step >= template.features.length && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-900 text-sm mb-3">Token-Level Attribution Matrix</h3>
          <p className="text-xs text-gray-500 mb-3">How each input feature affects each output token (click feature above to highlight)</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left py-1 px-2 text-gray-500 font-medium">Input ↓ / Output →</th>
                  {outputTokens.map((token, i) => (
                    <th key={i} className="py-1 px-2 text-gray-700 font-medium text-center">
                      {token}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attributions.map((attr) => {
                  const feature = template.features.find(f => f.key === attr.key);
                  const colors = getColorClasses(feature?.color || 'blue');
                  const isSelected = selectedFeature === attr.key;
                  
                  return (
                    <tr 
                      key={attr.key}
                      className={`cursor-pointer transition-colors ${isSelected ? colors.bg : 'hover:bg-gray-50'}`}
                      onClick={() => setSelectedFeature(isSelected ? null : attr.key)}
                    >
                      <td className={`py-2 px-2 font-medium ${isSelected ? colors.text : 'text-gray-700'}`}>
                        {attr.key}
                      </td>
                      {attr.tokenScores.map((score, i) => {
                        const intensity = Math.round((score / 0.45) * 100);
                        return (
                          <td 
                            key={i} 
                            className="py-2 px-2 text-center"
                            style={{
                              backgroundColor: isSelected 
                                ? `rgba(59, 130, 246, ${intensity / 100})` 
                                : `rgba(107, 114, 128, ${intensity / 200})`
                            }}
                          >
                            <span className={intensity > 50 && isSelected ? 'text-white' : 'text-gray-700'}>
                              {(score * 100).toFixed(0)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Key papers */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-500">Key Papers:</span>
        <a
          href="https://arxiv.org/abs/1705.07874"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
        >
          SHAP / KernelSHAP (NeurIPS 2017)
          <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href="https://arxiv.org/abs/1602.04938"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
        >
          LIME (KDD 2016)
          <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href="https://arxiv.org/abs/2409.00729"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-cyan-100 text-cyan-800 rounded hover:bg-cyan-200"
        >
          ContextCite (NeurIPS 2024)
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </Slide>
  );
};

export default PerturbationAttributionSlide;

