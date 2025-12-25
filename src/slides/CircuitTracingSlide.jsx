import React, { useState, useEffect } from 'react';
import { GitBranch, Play, Pause, RotateCcw, ArrowRight, Sparkles, ExternalLink, Github } from 'lucide-react';
import { Slide, AnimatedNode, AnimatedLine } from '../components';

const CircuitTracingSlide = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && step < 4) {
      const timer = setTimeout(() => setStep(s => s + 1), 1200);
      return () => clearTimeout(timer);
    } else if (step >= 4) {
      setIsPlaying(false);
    }
  }, [isPlaying, step]);

  const reset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <Slide
      className="bg-gradient-to-br from-purple-50 via-white to-indigo-50"
      references={['anthropicBiology', 'anthropicCircuitTools', 'transformerLens', 'darioInterpretability']}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <GitBranch className="w-8 h-8 text-purple-500" />
          Anthropic's Circuit Tracing
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-lg"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={reset}
            className="p-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <p className="text-gray-600">
          Mechanistic interpretability using sparse autoencoders and cross-layer transcoders
        </p>
        <div className="flex gap-2">
          <a
            href="https://transformer-circuits.pub/2025/attribution-graphs/biology.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <ExternalLink className="w-3 h-3" /> Paper
          </a>
          <a
            href="https://github.com/safety-research/circuit-tracer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <Github className="w-3 h-3" /> circuit-tracer
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4 border border-purple-200 shadow-sm">
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Query:</span> "What is the capital of the state where Dallas is located?"
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-1 rounded-lg bg-purple-100 text-purple-700 font-medium">Dallas → Texas</span>
          <ArrowRight className="w-4 h-4 text-purple-400" />
          <span className="px-2 py-1 rounded-lg bg-purple-100 text-purple-700 font-medium">Texas → Capital</span>
          <ArrowRight className="w-4 h-4 text-purple-400" />
          <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 font-medium">Austin</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-3 mb-4 border border-purple-200">
        <svg viewBox="0 0 400 180" className="w-full h-48">
          {/* Connection lines */}
          <AnimatedLine x1={60} y1={45} x2={140} y2={60} active={step >= 1} delay={0} />
          <AnimatedLine x1={60} y1={90} x2={140} y2={90} active={step >= 1} delay={100} />
          <AnimatedLine x1={60} y1={135} x2={140} y2={120} active={step >= 1} delay={200} />

          <AnimatedLine x1={180} y1={60} x2={240} y2={60} active={step >= 2} delay={300} />
          <AnimatedLine x1={180} y1={90} x2={240} y2={90} active={step >= 2} delay={400} />
          <AnimatedLine x1={180} y1={120} x2={240} y2={120} active={step >= 2} delay={500} />

          <AnimatedLine x1={280} y1={60} x2={340} y2={90} active={step >= 3} delay={600} />
          <AnimatedLine x1={280} y1={90} x2={340} y2={90} active={step >= 3} delay={700} />
          <AnimatedLine x1={280} y1={120} x2={340} y2={90} active={step >= 3} delay={800} />

          {/* Input layer */}
          <AnimatedNode x={60} y={45} label="Dallas" active={step >= 0} delay={0} />
          <AnimatedNode x={60} y={90} label="capital" active={step >= 0} delay={50} />
          <AnimatedNode x={60} y={135} label="state" active={step >= 0} delay={100} />

          {/* Layer 1 */}
          <AnimatedNode x={160} y={60} label="city" active={step >= 1} delay={200} />
          <AnimatedNode x={160} y={90} label="Texas" active={step >= 1} delay={250} />
          <AnimatedNode x={160} y={120} label="query" active={step >= 1} delay={300} />

          {/* Layer 2 */}
          <AnimatedNode x={260} y={60} label="state" active={step >= 2} delay={400} />
          <AnimatedNode x={260} y={90} label="capital" active={step >= 2} delay={450} />
          <AnimatedNode x={260} y={120} label="US" active={step >= 2} delay={500} />

          {/* Output */}
          <AnimatedNode x={340} y={90} label="Austin" active={step >= 3} delay={700} size={50} />

          {/* Layer labels */}
          <text x={60} y={165} textAnchor="middle" fill="#6366f1" fontSize="10" fontWeight="600">Input</text>
          <text x={160} y={165} textAnchor="middle" fill="#6366f1" fontSize="10" fontWeight="600">Features L1</text>
          <text x={260} y={165} textAnchor="middle" fill="#6366f1" fontSize="10" fontWeight="600">Features L2</text>
          <text x={340} y={165} textAnchor="middle" fill="#6366f1" fontSize="10" fontWeight="600">Output</text>
        </svg>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-lg p-3 border border-purple-200">
          <div className="text-2xl font-bold text-purple-600 mb-1">30M</div>
          <div className="text-xs text-gray-600">Interpretable features via sparse autoencoders</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-purple-200">
          <div className="text-2xl font-bold text-purple-600 mb-1">~25%</div>
          <div className="text-xs text-gray-600">Prompts with satisfying explanations (current limitation)</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-purple-200">
          <div className="text-2xl font-bold text-purple-600 mb-1">2027</div>
          <div className="text-xs text-gray-600">Target for significant interpretability progress</div>
        </div>
      </div>

      <div className="bg-purple-900 rounded-xl p-4 text-white">
        <p className="flex items-start gap-3 text-sm">
          <Sparkles className="w-5 h-5 text-purple-300 flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-purple-200">Open-source tools:</strong> Circuit-tracer available for Gemma-2-2b and Llama-3.2-1b.
            TransformerLens provides activation patching with 2.8k stars on GitHub. Interactive frontend at
            <a href="https://www.neuronpedia.org/gemma-2-2b/graph" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 ml-1">Neuronpedia</a>.
          </span>
        </p>
      </div>
    </Slide>
  );
};

export default CircuitTracingSlide;
