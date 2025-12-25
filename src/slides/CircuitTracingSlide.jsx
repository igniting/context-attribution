import React, { useState, useEffect } from 'react';
import { GitBranch, Play, Pause, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
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
    <Slide className="bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <GitBranch className="w-10 h-10 text-purple-500" />
          Anthropic's Circuit Tracing
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-lg"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={reset}
            className="p-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-5 mb-6 border border-purple-200 shadow-sm">
        <p className="text-gray-700 mb-3">
          <span className="font-semibold">Query:</span> "What is the capital of the state where Dallas is located?"
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1.5 rounded-lg bg-purple-100 text-purple-700 font-medium">Dallas → Texas</span>
          <ArrowRight className="w-4 h-4 text-purple-400" />
          <span className="px-3 py-1.5 rounded-lg bg-purple-100 text-purple-700 font-medium">Texas → Capital</span>
          <ArrowRight className="w-4 h-4 text-purple-400" />
          <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 font-medium">Austin</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-4 mb-6 border border-purple-200">
        <svg viewBox="0 0 400 200" className="w-full h-56">
          {/* Connection lines */}
          <AnimatedLine x1={60} y1={50} x2={140} y2={70} active={step >= 1} delay={0} />
          <AnimatedLine x1={60} y1={100} x2={140} y2={100} active={step >= 1} delay={100} />
          <AnimatedLine x1={60} y1={150} x2={140} y2={130} active={step >= 1} delay={200} />
          
          <AnimatedLine x1={180} y1={70} x2={240} y2={70} active={step >= 2} delay={300} />
          <AnimatedLine x1={180} y1={100} x2={240} y2={100} active={step >= 2} delay={400} />
          <AnimatedLine x1={180} y1={130} x2={240} y2={130} active={step >= 2} delay={500} />
          
          <AnimatedLine x1={280} y1={70} x2={340} y2={100} active={step >= 3} delay={600} />
          <AnimatedLine x1={280} y1={100} x2={340} y2={100} active={step >= 3} delay={700} />
          <AnimatedLine x1={280} y1={130} x2={340} y2={100} active={step >= 3} delay={800} />
          
          {/* Input layer */}
          <AnimatedNode x={60} y={50} label="Dallas" active={step >= 0} delay={0} />
          <AnimatedNode x={60} y={100} label="capital" active={step >= 0} delay={50} />
          <AnimatedNode x={60} y={150} label="state" active={step >= 0} delay={100} />
          
          {/* Layer 1 */}
          <AnimatedNode x={160} y={70} label="city" active={step >= 1} delay={200} />
          <AnimatedNode x={160} y={100} label="Texas" active={step >= 1} delay={250} />
          <AnimatedNode x={160} y={130} label="query" active={step >= 1} delay={300} />
          
          {/* Layer 2 */}
          <AnimatedNode x={260} y={70} label="state" active={step >= 2} delay={400} />
          <AnimatedNode x={260} y={100} label="capital" active={step >= 2} delay={450} />
          <AnimatedNode x={260} y={130} label="US" active={step >= 2} delay={500} />
          
          {/* Output */}
          <AnimatedNode x={340} y={100} label="Austin" active={step >= 3} delay={700} size={50} />
          
          {/* Layer labels */}
          <text x={60} y={185} textAnchor="middle" fill="#6366f1" fontSize="11" fontWeight="600">Input</text>
          <text x={160} y={185} textAnchor="middle" fill="#6366f1" fontSize="11" fontWeight="600">Features L1</text>
          <text x={260} y={185} textAnchor="middle" fill="#6366f1" fontSize="11" fontWeight="600">Features L2</text>
          <text x={340} y={185} textAnchor="middle" fill="#6366f1" fontSize="11" fontWeight="600">Output</text>
        </svg>
      </div>
      
      <div className="bg-purple-900 rounded-2xl p-5 text-white">
        <p className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-300 flex-shrink-0 mt-0.5" />
          <span>
            Uses cross-layer transcoders with <span className="text-purple-300 font-bold">30 million interpretable features</span> to 
            create attribution graphs. Open-sourced for Gemma-2-2b and Llama-3.2-1b via their circuit-tracer library.
          </span>
        </p>
      </div>
    </Slide>
  );
};

export default CircuitTracingSlide;

