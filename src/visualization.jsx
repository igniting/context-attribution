import React, { useState, useEffect, useCallback } from 'react';
import { Brain, Database, FileText, Search, CheckCircle, AlertTriangle, Zap, Layers, GitBranch, Shield, Eye, ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Play, Pause, RotateCcw, Info, BookOpen, Code, Building, Users, Target, Workflow, Scale, TrendingUp, Globe, Sparkles } from 'lucide-react';

// ============================================================================
// SLIDE NAVIGATION COMPONENT
// ============================================================================

const SlideNavigation = ({ currentSlide, totalSlides, onPrev, onNext, onGoTo }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200 z-50">
      <button
        onClick={onPrev}
        disabled={currentSlide === 0}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentSlide === i 
                ? 'bg-indigo-600 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
      
      <button
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ArrowRight className="w-5 h-5 text-gray-700" />
      </button>
      
      <span className="text-sm text-gray-500 ml-2 font-medium">
        {currentSlide + 1} / {totalSlides}
      </span>
    </div>
  );
};

// ============================================================================
// SLIDE WRAPPER COMPONENT
// ============================================================================

const Slide = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 ${className}`}>
      <div className="max-w-5xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// ANIMATED NODE COMPONENT FOR CIRCUIT VISUALIZATION (LIGHT MODE)
// ============================================================================

const AnimatedNode = ({ x, y, label, active, delay = 0, size = 40 }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <g className={`transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <circle
        cx={x}
        cy={y}
        r={size/2}
        fill={active ? '#6366f1' : '#e0e7ff'}
        stroke={active ? '#4f46e5' : '#a5b4fc'}
        strokeWidth="2"
        className={active ? 'animate-pulse' : ''}
      />
      <text x={x} y={y + 4} textAnchor="middle" fill={active ? 'white' : '#4338ca'} fontSize="10" fontWeight="600">
        {label}
      </text>
    </g>
  );
};

// ============================================================================
// ANIMATED CONNECTION LINE (LIGHT MODE)
// ============================================================================

const AnimatedLine = ({ x1, y1, x2, y2, active, delay = 0 }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(p => p >= 100 ? 100 : p + 5);
      }, 20);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const dashOffset = length - (length * progress / 100);
  
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={active ? '#6366f1' : '#c7d2fe'}
      strokeWidth="2"
      strokeDasharray={length}
      strokeDashoffset={dashOffset}
      className="transition-all"
    />
  );
};

// ============================================================================
// SLIDE 1: TITLE SLIDE
// ============================================================================

const TitleSlide = () => {
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    setAnimateIn(true);
  }, []);
  
  return (
    <Slide className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className={`text-center transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex justify-center mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-200">
            <Brain className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          Context Attribution
          <br />
          <span className="text-indigo-600">for LLM Outputs</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Tracing what an LLM says back to why it said it — 
          the foundation of AI safety, reliability, and trust
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">Mechanistic Interpretability</span>
          <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">RAG Verification</span>
          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">Agent Debugging</span>
        </div>
      </div>
    </Slide>
  );
};

// ============================================================================
// SLIDE 2: WHAT IS CONTEXT ATTRIBUTION?
// ============================================================================

const WhatIsAttributionSlide = () => {
  return (
    <Slide className="bg-white">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">What is Context Attribution?</h2>
      
      <p className="text-xl text-gray-600 mb-10 max-w-3xl">
        Context attribution answers a fundamental question: <span className="text-gray-900 font-semibold">which parts of the input context influenced the model's output?</span>
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Corroborative Attribution</h3>
          </div>
          <p className="text-gray-600">
            What context <em className="text-emerald-700 font-medium">supports</em> a generated statement? 
            Used for <span className="font-medium">citation verification</span> and fact-checking.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Contributive Attribution</h3>
          </div>
          <p className="text-gray-600">
            What context <em className="text-blue-700 font-medium">caused</em> the generation? 
            Used for <span className="font-medium">debugging</span> and understanding model behavior.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Why it matters:</h4>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-500" /> Verify factual claims
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-500" /> Debug agent behavior
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-500" /> Detect hallucinations
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-500" /> Meet regulatory requirements
          </div>
        </div>
      </div>
    </Slide>
  );
};

// ============================================================================
// SLIDE 3: THE ATTRIBUTION GAP
// ============================================================================

const AttributionGapSlide = () => {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedPercent(p => p >= 25 ? 25 : p + 1);
      }, 40);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Slide className="bg-gradient-to-br from-orange-50 via-white to-red-50">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <AlertTriangle className="w-10 h-10 text-orange-500" />
        The Attribution Gap
      </h2>
      
      <p className="text-xl text-gray-600 mb-10">
        Despite significant progress, fundamental challenges remain in explaining model behavior.
      </p>
      
      <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="none"
              stroke="#fed7aa"
              strokeWidth="16"
            />
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="none"
              stroke="#f97316"
              strokeWidth="16"
              strokeDasharray={`${animatedPercent * 5.03} 503`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-gray-900">{animatedPercent}%</span>
            <span className="text-sm text-gray-500">explained</span>
          </div>
        </div>
        
        <div className="flex-1">
          <p className="text-lg text-gray-700 mb-4">
            Even Anthropic's state-of-the-art circuit tracing provides 
            <span className="text-orange-600 font-bold"> satisfying explanations for only ~25%</span> of prompts examined.
          </p>
          <p className="text-gray-500">
            The remaining 75% involves complex interactions that current methods cannot fully explain.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="text-orange-500 font-bold text-lg mb-2">Polysemanticity</div>
          <p className="text-gray-600 text-sm">Network neurons encode multiple meanings, making direct interpretation difficult</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="text-orange-500 font-bold text-lg mb-2">Faithfulness</div>
          <p className="text-gray-600 text-sm">LLM-generated explanations may sound plausible but not reflect actual reasoning</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="text-orange-500 font-bold text-lg mb-2">Scale</div>
          <p className="text-gray-600 text-sm">Billions of parameters to trace; traditional XAI methods require substantial compute</p>
        </div>
      </div>
    </Slide>
  );
};

// ============================================================================
// SLIDE 4: CORE METHODS OVERVIEW
// ============================================================================

const MethodsOverviewSlide = () => {
  const [selectedMethod, setSelectedMethod] = useState(0);
  
  const methods = [
    {
      name: 'Gradient-Based',
      icon: Zap,
      color: 'amber',
      desc: 'Computes attribution by analyzing how gradients flow through the network',
      pros: ['Mathematically principled', 'Satisfies axioms like sensitivity'],
      cons: ['Computationally expensive', 'Attention self-repair issues'],
      examples: ['Integrated Gradients', 'GIM Framework', 'Randomized Path Integration']
    },
    {
      name: 'Perturbation-Based',
      icon: Layers,
      color: 'blue',
      desc: 'Measures importance by removing or modifying input parts and observing changes',
      pros: ['Model-agnostic', 'Intuitive interpretation', 'Production-ready'],
      cons: ['Requires multiple forward passes', 'May miss feature interactions'],
      examples: ['ContextCite (MIT)', 'LIME', 'Ablation Studies']
    },
    {
      name: 'Circuit Tracing',
      icon: GitBranch,
      color: 'purple',
      desc: 'Maps interpretable features and their interactions through model layers',
      pros: ['Deep mechanistic insight', 'Traces multi-step reasoning'],
      cons: ['Complex to implement', 'Only ~25% satisfying explanations'],
      examples: ['Anthropic Attribution Graphs', 'Sparse Autoencoders', 'TransformerLens']
    },
    {
      name: 'Influence Functions',
      icon: Database,
      color: 'emerald',
      desc: 'Traces predictions back to influential training examples',
      pros: ['Links to training data', 'Useful for debugging'],
      cons: ['Scales poorly', 'BM25 often outperforms'],
      examples: ['LoGra (6500x speedup)', 'DataInf', 'RepSim']
    },
    {
      name: 'Self-Reflection',
      icon: Eye,
      color: 'rose',
      desc: 'Model generates special tokens to assess its own retrieval and generation',
      pros: ['Runtime controllable', 'Improves factuality'],
      cons: ['Requires fine-tuning', 'May not reflect true reasoning'],
      examples: ['Self-RAG', '[IsRel] tokens', '[IsSup] verification']
    }
  ];
  
  const getColorClasses = (color, selected) => {
    const colors = {
      amber: selected ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-amber-300',
      blue: selected ? 'bg-blue-100 border-blue-400 text-blue-800' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-300',
      purple: selected ? 'bg-purple-100 border-purple-400 text-purple-800' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-purple-300',
      emerald: selected ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-emerald-300',
      rose: selected ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-rose-300'
    };
    return colors[color];
  };
  
  const method = methods[selectedMethod];
  
  return (
    <Slide className="bg-white">
      <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Target className="w-10 h-10 text-indigo-500" />
        Core Attribution Methods
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {methods.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelectedMethod(i)}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all flex items-center gap-2 ${getColorClasses(m.color, selectedMethod === i)}`}
          >
            <m.icon className="w-4 h-4" />
            {m.name}
          </button>
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-3 rounded-xl ${getColorClasses(method.color, true)}`}>
            <method.icon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{method.name}</h3>
            <p className="text-gray-600 mt-1">{method.desc}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h4 className="text-emerald-700 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Strengths
            </h4>
            <ul className="space-y-1">
              {method.pros.map((pro, i) => (
                <li key={i} className="text-emerald-800 text-sm">• {pro}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <h4 className="text-red-700 font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Limitations
            </h4>
            <ul className="space-y-1">
              {method.cons.map((con, i) => (
                <li key={i} className="text-red-800 text-sm">• {con}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-gray-500 text-sm mb-2">Key Implementations:</h4>
          <div className="flex flex-wrap gap-2">
            {method.examples.map((ex, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-700 text-sm">
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

// ============================================================================
// SLIDE 5: CONTEXTCITE & PERTURBATION METHODS
// ============================================================================

const ContextCiteSlide = () => {
  const [showAblations, setShowAblations] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowAblations(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Slide className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Layers className="w-10 h-10 text-blue-500" />
        ContextCite: Perturbation-Based Attribution
      </h2>
      
      <p className="text-xl text-gray-600 mb-8">
        MIT/MadryLab's breakthrough approach (NeurIPS 2024) for practical context attribution
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0">1</span>
              <span>Learn a sparse linear surrogate model approximating LLM response changes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0">2</span>
              <span>Include or exclude context parts and observe output differences</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0">3</span>
              <span>Use LASSO for sparsity — identify the few truly influential sources</span>
            </li>
          </ol>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Metric</h3>
          <div className={`text-center transition-all duration-700 ${showAblations ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="text-6xl font-bold text-blue-600 mb-2">~32</div>
            <div className="text-gray-600">context ablations needed</div>
            <div className="text-sm text-gray-500 mt-2">Even with hundreds of sources</div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-900 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <Info className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-2">Critical Distinction</h4>
            <p className="text-blue-100">
              ContextCite distinguishes between <span className="text-blue-300 font-semibold">corroborative attribution</span> (what supports a statement) 
              and <span className="text-blue-300 font-semibold">contributive attribution</span> (what caused the generation) — 
              a distinction critical for verification workflows.
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

// ============================================================================
// SLIDE 6: CIRCUIT TRACING (INTERACTIVE)
// ============================================================================

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

// ============================================================================
// SLIDE 7: SELF-RAG PIPELINE (INTERACTIVE)
// ============================================================================

const SelfRAGSlide = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const steps = [
    { icon: Search, label: 'Query', desc: 'User asks a question', color: 'blue' },
    { icon: Database, label: 'Retrieve', desc: 'Fetch relevant documents', color: 'cyan' },
    { icon: CheckCircle, label: '[IsRel]', desc: 'Check relevance', color: 'emerald' },
    { icon: Brain, label: 'Generate', desc: 'LLM creates response', color: 'purple' },
    { icon: Shield, label: '[IsSup]', desc: 'Verify support', color: 'orange' },
    { icon: FileText, label: 'Cite', desc: 'Add citations', color: 'rose' }
  ];
  
  useEffect(() => {
    if (isAnimating) {
      const timer = setInterval(() => {
        setActiveStep(s => (s + 1) % steps.length);
      }, 1500);
      return () => clearInterval(timer);
    }
  }, [isAnimating]);
  
  const getColor = (color, active) => {
    const colors = {
      blue: active ? 'bg-blue-500 border-blue-400 text-white' : 'bg-blue-50 border-blue-200 text-blue-600',
      cyan: active ? 'bg-cyan-500 border-cyan-400 text-white' : 'bg-cyan-50 border-cyan-200 text-cyan-600',
      emerald: active ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-emerald-50 border-emerald-200 text-emerald-600',
      purple: active ? 'bg-purple-500 border-purple-400 text-white' : 'bg-purple-50 border-purple-200 text-purple-600',
      orange: active ? 'bg-orange-500 border-orange-400 text-white' : 'bg-orange-50 border-orange-200 text-orange-600',
      rose: active ? 'bg-rose-500 border-rose-400 text-white' : 'bg-rose-50 border-rose-200 text-rose-600'
    };
    return colors[color];
  };
  
  return (
    <Slide className="bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <Workflow className="w-10 h-10 text-cyan-500" />
          Self-RAG Pipeline
        </h2>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm ${
            isAnimating ? 'bg-red-500 hover:bg-red-400 text-white' : 'bg-cyan-500 hover:bg-cyan-400 text-white'
          }`}
        >
          {isAnimating ? 'Stop' : 'Animate'}
        </button>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        Self-RAG introduces <span className="font-semibold text-gray-900">reflection tokens</span> that enable the model to assess its own retrieval and generation quality.
      </p>
      
      <div className="flex items-center justify-between gap-2 mb-8">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div 
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                activeStep === i ? 'scale-110' : 'scale-100'
              }`}
              onClick={() => setActiveStep(i)}
            >
              <div className={`p-3 rounded-xl border-2 transition-all duration-300 ${getColor(step.color, activeStep === i)}`}>
                <step.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs mt-2 font-medium ${activeStep === i ? 'text-gray-900' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-colors ${
                activeStep > i ? 'text-cyan-500' : 'text-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-2xl p-5 min-h-32 border border-gray-200 mb-6">
        <h4 className="text-gray-900 font-semibold mb-2">{steps[activeStep].label}</h4>
        <p className="text-gray-600 text-sm mb-3">{steps[activeStep].desc}</p>
        
        {activeStep === 0 && (
          <div className="bg-blue-50 rounded-xl p-4 text-blue-800 border border-blue-200">
            "What are the health benefits of green tea?"
          </div>
        )}
        
        {activeStep === 1 && (
          <div className="space-y-2">
            {['Doc 1: Antioxidants in green tea...', 'Doc 2: Caffeine and metabolism...', 'Doc 3: Historical uses of tea...'].map((doc, i) => (
              <div key={i} className="bg-cyan-50 rounded-lg p-3 text-cyan-800 text-sm flex items-center gap-2 border border-cyan-200">
                <FileText className="w-4 h-4" /> {doc}
              </div>
            ))}
          </div>
        )}
        
        {activeStep === 2 && (
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-sm border border-emerald-200">✓ Doc 1: Relevant</span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-sm border border-emerald-200">✓ Doc 2: Relevant</span>
            <span className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-sm border border-red-200">✗ Doc 3: Not Relevant</span>
          </div>
        )}
        
        {activeStep === 3 && (
          <div className="bg-purple-50 rounded-xl p-4 text-purple-800 border border-purple-200">
            "Green tea contains powerful antioxidants called catechins, which may help reduce inflammation..."
          </div>
        )}
        
        {activeStep === 4 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700">"catechins" → Supported by Doc 1</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700">"reduce inflammation" → Supported by Doc 2</span>
            </div>
          </div>
        )}
        
        {activeStep === 5 && (
          <div className="bg-rose-50 rounded-xl p-4 text-rose-800 border border-rose-200">
            "Green tea contains powerful antioxidants called catechins<sup className="text-rose-600">[1]</sup>, which may help reduce inflammation<sup className="text-rose-600">[2]</sup>..."
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
          <div className="text-emerald-600 text-3xl font-bold">55.8%</div>
          <div className="text-emerald-700 text-sm">Self-RAG accuracy on PopQA</div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <div className="text-red-600 text-3xl font-bold">~50%</div>
          <div className="text-red-700 text-sm">GPT-4 citations lacking support</div>
        </div>
      </div>
    </Slide>
  );
};

// ============================================================================
// SLIDE 8: RAG BENCHMARKS
// ============================================================================

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

// ============================================================================
// SLIDE 9: INDUSTRY TOOLS
// ============================================================================

const IndustryToolsSlide = () => {
  const tools = [
    { name: 'Anthropic Citations', type: 'API', category: 'Production', metric: '+15% recall vs prompting' },
    { name: 'ContextCite', type: 'Research', category: 'Perturbation', metric: '~32 ablations needed' },
    { name: 'TransformerLens', type: 'Open Source', category: 'Mechanistic', metric: '2.8k GitHub stars' },
    { name: 'Langfuse', type: 'Open Source', category: 'Observability', metric: 'Full trace capture' },
    { name: 'LangSmith', type: 'Commercial', category: 'Observability', metric: 'Real-time monitoring' },
    { name: 'Self-RAG', type: 'Research', category: 'Self-Reflection', metric: '55.8% PopQA accuracy' },
  ];
  
  const getTypeColor = (type) => {
    const colors = {
      'API': 'bg-blue-100 text-blue-700 border-blue-200',
      'Research': 'bg-purple-100 text-purple-700 border-purple-200',
      'Commercial': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Open Source': 'bg-cyan-100 text-cyan-700 border-cyan-200'
    };
    return colors[type];
  };
  
  return (
    <Slide className="bg-white">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Code className="w-10 h-10 text-indigo-500" />
        Industry Tools & Frameworks
      </h2>
      
      <p className="text-xl text-gray-600 mb-8">
        The gap between research and production has narrowed substantially
      </p>
      
      <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-100">
              <th className="text-left py-4 px-6 text-gray-700 text-sm font-semibold">Tool</th>
              <th className="text-left py-4 px-6 text-gray-700 text-sm font-semibold">Type</th>
              <th className="text-left py-4 px-6 text-gray-700 text-sm font-semibold">Category</th>
              <th className="text-left py-4 px-6 text-gray-700 text-sm font-semibold">Key Metric</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-gray-900 font-medium">{tool.name}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(tool.type)}`}>
                    {tool.type}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600 text-sm">{tool.category}</td>
                <td className="py-4 px-6 text-gray-700 text-sm">{tool.metric}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-2">Native Citation APIs</h4>
          <p className="text-gray-600 text-sm">Anthropic, Google Gemini, OpenAI all offer structured citation data</p>
        </div>
        <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
          <h4 className="font-semibold text-gray-900 mb-2">RAG Frameworks</h4>
          <p className="text-gray-600 text-sm">LlamaIndex CitationQueryEngine, LangChain with 4 approaches</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h4 className="font-semibold text-gray-900 mb-2">Interpretability</h4>
          <p className="text-gray-600 text-sm">Captum LLMAttribution, TransformerLens for causal interventions</p>
        </div>
      </div>
    </Slide>
  );
};

// ============================================================================
// SLIDE 10: USE CASES
// ============================================================================

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

// ============================================================================
// SLIDE 11: REGULATORY LANDSCAPE
// ============================================================================

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

// ============================================================================
// SLIDE 12: FUTURE & CONCLUSION
// ============================================================================

const ConclusionSlide = () => {
  return (
    <Slide className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Sparkles className="w-10 h-10 text-indigo-500" />
        Future Directions & Key Takeaways
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-indigo-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Emerging Research</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
              <div>
                <span className="font-semibold text-gray-900">Explainability by Design</span>
                <p className="text-gray-600 text-sm">Hybrid neurosymbolic models combining knowledge graphs with LLMs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
              <div>
                <span className="font-semibold text-gray-900">Self-Improving Attribution</span>
                <p className="text-gray-600 text-sm">START uses synthetic data + preference optimization for continuous improvement</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <div>
                <span className="font-semibold text-gray-900">Causal Inference Integration</span>
                <p className="text-gray-600 text-sm">Moving beyond correlation to counterfactual reasoning</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Researchers</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-semibold text-purple-700">Anthropic Interpretability Team</span>
              <p className="text-gray-600">Chris Olah, Jack Lindsey, Trenton Bricken — Circuit tracing pioneers</p>
            </div>
            <div>
              <span className="font-semibold text-blue-700">MIT CSAIL/Madry Lab</span>
              <p className="text-gray-600">Aleksander Mądry — ContextCite creators</p>
            </div>
            <div>
              <span className="font-semibold text-emerald-700">Princeton NLP</span>
              <p className="text-gray-600">Danqi Chen, Tianyu Gao — ALCE benchmark</p>
            </div>
            <div>
              <span className="font-semibold text-orange-700">University of Washington</span>
              <p className="text-gray-600">Hannaneh Hajishirzi, Akari Asai — Self-RAG</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-900 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Path Forward for Practitioners</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-indigo-300 font-semibold mb-2">Native APIs</div>
            <p className="text-indigo-100 text-sm">Use Anthropic Citations, Google Grounding for RAG applications</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-indigo-300 font-semibold mb-2">Observability</div>
            <p className="text-indigo-100 text-sm">Deploy Langfuse or LangSmith for production monitoring</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-indigo-300 font-semibold mb-2">Realistic Expectations</div>
            <p className="text-indigo-100 text-sm">Current methods provide partial, not complete explanations</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Based on research from Anthropic, MIT CSAIL, Princeton NLP, and other leading AI research groups.
        </p>
      </div>
    </Slide>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function ContextAttributionPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    TitleSlide,
    WhatIsAttributionSlide,
    AttributionGapSlide,
    MethodsOverviewSlide,
    ContextCiteSlide,
    CircuitTracingSlide,
    SelfRAGSlide,
    RAGBenchmarksSlide,
    IndustryToolsSlide,
    UseCasesSlide,
    RegulatorySlide,
    ConclusionSlide
  ];
  
  const goToSlide = useCallback((index) => {
    setCurrentSlide(Math.max(0, Math.min(index, slides.length - 1)));
  }, [slides.length]);
  
  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);
  
  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(slides.length - 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, slides.length]);
  
  const CurrentSlideComponent = slides[currentSlide];
  
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Slide Container with transition */}
      <div className="transition-opacity duration-300">
        <CurrentSlideComponent />
      </div>
      
      {/* Navigation */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrev={prevSlide}
        onNext={nextSlide}
        onGoTo={goToSlide}
      />
      
      {/* Keyboard hint */}
      <div className="fixed bottom-8 right-8 text-xs text-gray-400">
        Use arrow keys to navigate
      </div>
    </div>
  );
}
