import React, { useState, useEffect } from 'react';
import { Brain, Database, FileText, Search, CheckCircle, AlertTriangle, Zap, Layers, GitBranch, Shield, Eye, ArrowRight, ChevronDown, ChevronUp, Play, Pause, RotateCcw, Info, BookOpen, Code, Building, Users, Target, Workflow } from 'lucide-react';

// Animated Node Component for Circuit Visualization
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
        fill={active ? '#8b5cf6' : '#1e1b4b'}
        stroke={active ? '#c4b5fd' : '#4c1d95'}
        strokeWidth="2"
        className={active ? 'animate-pulse' : ''}
      />
      <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="500">
        {label}
      </text>
    </g>
  );
};

// Animated Connection Line
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
      stroke={active ? '#a78bfa' : '#4c1d95'}
      strokeWidth="2"
      strokeDasharray={length}
      strokeDashoffset={dashOffset}
      className="transition-all"
    />
  );
};

// Circuit Tracing Visualization
const CircuitTracingViz = () => {
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
  
  const layers = [
    { name: 'Input', nodes: ['Dallas', 'capital', 'of'] },
    { name: 'Layer 1', nodes: ['city', 'Texas', 'query'] },
    { name: 'Layer 2', nodes: ['state', 'capital', 'US'] },
    { name: 'Output', nodes: ['Austin'] }
  ];
  
  return (
    <div className="bg-gradient-to-br from-indigo-950 to-purple-950 rounded-2xl p-6 border border-purple-800/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-purple-400" />
          Circuit Tracing: Multi-Step Reasoning
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-lg bg-purple-800 hover:bg-purple-700 text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="bg-black/30 rounded-xl p-4 mb-4">
        <p className="text-purple-200 text-sm mb-2">Query: "What is the capital of the state where Dallas is located?"</p>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-purple-900/50 text-purple-300">Dallas → Texas</span>
          <ArrowRight className="w-3 h-3 text-purple-500" />
          <span className="px-2 py-1 rounded bg-purple-900/50 text-purple-300">Texas → Capital</span>
          <ArrowRight className="w-3 h-3 text-purple-500" />
          <span className="px-2 py-1 rounded bg-green-900/50 text-green-300">Austin</span>
        </div>
      </div>
      
      <svg viewBox="0 0 400 200" className="w-full h-48">
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
        <text x={60} y={185} textAnchor="middle" fill="#a78bfa" fontSize="10">Input</text>
        <text x={160} y={185} textAnchor="middle" fill="#a78bfa" fontSize="10">Features L1</text>
        <text x={260} y={185} textAnchor="middle" fill="#a78bfa" fontSize="10">Features L2</text>
        <text x={340} y={185} textAnchor="middle" fill="#a78bfa" fontSize="10">Output</text>
      </svg>
      
      <div className="mt-4 p-3 bg-purple-900/30 rounded-lg">
        <p className="text-purple-200 text-xs">
          <Info className="w-3 h-3 inline mr-1" />
          Anthropic's circuit tracing uses <span className="text-purple-300 font-semibold">30 million interpretable features</span> to trace reasoning paths. This simplified view shows how "Dallas → Texas → Austin" reasoning happens internally.
        </p>
      </div>
    </div>
  );
};

// RAG Attribution Pipeline
const RAGPipeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const steps = [
    { icon: Search, label: 'Query', desc: 'User asks a question', color: 'blue' },
    { icon: Database, label: 'Retrieve', desc: 'Fetch relevant documents', color: 'cyan' },
    { icon: CheckCircle, label: '[IsRel]', desc: 'Check relevance', color: 'green' },
    { icon: Brain, label: 'Generate', desc: 'LLM creates response', color: 'purple' },
    { icon: Shield, label: '[IsSup]', desc: 'Verify support', color: 'orange' },
    { icon: FileText, label: 'Cite', desc: 'Add citations', color: 'pink' }
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
      blue: active ? 'bg-blue-500 border-blue-400' : 'bg-blue-900/50 border-blue-800',
      cyan: active ? 'bg-cyan-500 border-cyan-400' : 'bg-cyan-900/50 border-cyan-800',
      green: active ? 'bg-green-500 border-green-400' : 'bg-green-900/50 border-green-800',
      purple: active ? 'bg-purple-500 border-purple-400' : 'bg-purple-900/50 border-purple-800',
      orange: active ? 'bg-orange-500 border-orange-400' : 'bg-orange-900/50 border-orange-800',
      pink: active ? 'bg-pink-500 border-pink-400' : 'bg-pink-900/50 border-pink-800'
    };
    return colors[color];
  };
  
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Workflow className="w-5 h-5 text-cyan-400" />
          Self-RAG Pipeline with Reflection Tokens
        </h3>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isAnimating ? 'bg-red-600 hover:bg-red-500' : 'bg-cyan-600 hover:bg-cyan-500'
          } text-white`}
        >
          {isAnimating ? 'Stop' : 'Animate'}
        </button>
      </div>
      
      <div className="flex items-center justify-between gap-2 mb-6">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div 
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                activeStep === i ? 'scale-110' : 'scale-100'
              }`}
              onClick={() => setActiveStep(i)}
            >
              <div className={`p-3 rounded-xl border-2 transition-all duration-300 ${getColor(step.color, activeStep === i)}`}>
                <step.icon className={`w-6 h-6 ${activeStep === i ? 'text-white' : 'text-slate-400'}`} />
              </div>
              <span className={`text-xs mt-2 font-medium ${activeStep === i ? 'text-white' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-colors ${
                activeStep > i ? 'text-cyan-400' : 'text-slate-700'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="bg-slate-800/50 rounded-xl p-4 min-h-24">
        <h4 className="text-white font-medium mb-2">{steps[activeStep].label}</h4>
        <p className="text-slate-400 text-sm mb-3">{steps[activeStep].desc}</p>
        
        {activeStep === 0 && (
          <div className="bg-blue-900/30 rounded-lg p-3 text-blue-200 text-sm">
            "What are the health benefits of green tea?"
          </div>
        )}
        
        {activeStep === 1 && (
          <div className="space-y-2">
            {['Doc 1: Antioxidants in green tea...', 'Doc 2: Caffeine and metabolism...', 'Doc 3: Historical uses of tea...'].map((doc, i) => (
              <div key={i} className="bg-cyan-900/30 rounded-lg p-2 text-cyan-200 text-xs flex items-center gap-2">
                <FileText className="w-3 h-3" /> {doc}
              </div>
            ))}
          </div>
        )}
        
        {activeStep === 2 && (
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded bg-green-900/50 text-green-300 text-xs">✓ Doc 1: Relevant</span>
            <span className="px-2 py-1 rounded bg-green-900/50 text-green-300 text-xs">✓ Doc 2: Relevant</span>
            <span className="px-2 py-1 rounded bg-red-900/50 text-red-300 text-xs">✗ Doc 3: Not Relevant</span>
          </div>
        )}
        
        {activeStep === 3 && (
          <div className="bg-purple-900/30 rounded-lg p-3 text-purple-200 text-sm">
            "Green tea contains powerful antioxidants called catechins, which may help reduce inflammation..."
          </div>
        )}
        
        {activeStep === 4 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-slate-300">"catechins" → Supported by Doc 1</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-slate-300">"reduce inflammation" → Supported by Doc 2</span>
            </div>
          </div>
        )}
        
        {activeStep === 5 && (
          <div className="bg-pink-900/30 rounded-lg p-3 text-pink-200 text-sm">
            "Green tea contains powerful antioxidants called catechins<sup>[1]</sup>, which may help reduce inflammation<sup>[2]</sup>..."
          </div>
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-green-900/20 rounded-lg p-3 border border-green-800/50">
          <div className="text-green-400 text-2xl font-bold">55.8%</div>
          <div className="text-green-300 text-xs">Self-RAG accuracy on PopQA</div>
        </div>
        <div className="bg-red-900/20 rounded-lg p-3 border border-red-800/50">
          <div className="text-red-400 text-2xl font-bold">~50%</div>
          <div className="text-red-300 text-xs">GPT-4 citations lacking support</div>
        </div>
      </div>
    </div>
  );
};

// Attribution Methods Comparison
const MethodsComparison = () => {
  const [selectedMethod, setSelectedMethod] = useState(0);
  
  const methods = [
    {
      name: 'Gradient-Based',
      icon: Zap,
      color: 'yellow',
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
      color: 'green',
      desc: 'Traces predictions back to influential training examples',
      pros: ['Links to training data', 'Useful for debugging'],
      cons: ['Scales poorly', 'BM25 often outperforms'],
      examples: ['LoGra (6500x speedup)', 'DataInf', 'RepSim']
    },
    {
      name: 'Self-Reflection',
      icon: Eye,
      color: 'pink',
      desc: 'Model generates special tokens to assess its own retrieval and generation',
      pros: ['Runtime controllable', 'Improves factuality'],
      cons: ['Requires fine-tuning', 'May not reflect true reasoning'],
      examples: ['Self-RAG', '[IsRel] tokens', '[IsSup] verification']
    }
  ];
  
  const getColorClasses = (color, selected) => {
    const colors = {
      yellow: selected ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-yellow-800',
      blue: selected ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-blue-800',
      purple: selected ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-purple-800',
      green: selected ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-green-800',
      pink: selected ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-pink-800'
    };
    return colors[color];
  };
  
  const method = methods[selectedMethod];
  
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-blue-400" />
        Attribution Methods Comparison
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {methods.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelectedMethod(i)}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${getColorClasses(m.color, selectedMethod === i)}`}
          >
            <m.icon className="w-4 h-4 inline mr-2" />
            {m.name}
          </button>
        ))}
      </div>
      
      <div className="bg-slate-800/50 rounded-xl p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-xl ${getColorClasses(method.color, true)}`}>
            <method.icon className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-white text-xl font-semibold">{method.name}</h4>
            <p className="text-slate-400 mt-1">{method.desc}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-800/50">
            <h5 className="text-green-400 font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Strengths
            </h5>
            <ul className="space-y-1">
              {method.pros.map((pro, i) => (
                <li key={i} className="text-green-200 text-sm">• {pro}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-800/50">
            <h5 className="text-red-400 font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Limitations
            </h5>
            <ul className="space-y-1">
              {method.cons.map((con, i) => (
                <li key={i} className="text-red-200 text-sm">• {con}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-700">
          <h5 className="text-slate-400 text-sm mb-2">Key Implementations:</h5>
          <div className="flex flex-wrap gap-2">
            {method.examples.map((ex, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-xs">
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Use Cases Section
const UseCases = () => {
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
      color: 'green',
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
      detail: 'Semantic entropy analysis detects hallucinations with 89-91% accuracy. RAG-HAT generates labels and descriptions of hallucinations, then uses GPT-4 for correction. LRP4RAG applies Layer-wise Relevance Propagation.',
      stat: '89-91%',
      statLabel: 'accuracy with semantic entropy'
    },
    {
      icon: Building,
      title: 'Regulatory Compliance',
      color: 'purple',
      preview: 'Meet EU AI Act and GDPR requirements',
      detail: 'EU AI Act (effective Aug 2024, compliance by Aug 2026) requires high-risk systems to be transparent. GDPR Article 22 mandates meaningful information about automated decision logic. Penalties reach €35M or 7% of global turnover.',
      stat: '€35M',
      statLabel: 'maximum penalty for violations'
    }
  ];
  
  const getColor = (color) => {
    const colors = {
      blue: 'from-blue-600 to-blue-800 border-blue-500',
      green: 'from-green-600 to-green-800 border-green-500',
      orange: 'from-orange-600 to-orange-800 border-orange-500',
      purple: 'from-purple-600 to-purple-800 border-purple-500'
    };
    return colors[color];
  };
  
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {useCases.map((uc, i) => (
        <div
          key={i}
          className={`bg-gradient-to-br ${getColor(uc.color)} rounded-xl p-5 border cursor-pointer transition-all hover:scale-[1.02]`}
          onClick={() => setExpanded(expanded === i ? null : i)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <uc.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold">{uc.title}</h4>
                <p className="text-white/70 text-sm">{uc.preview}</p>
              </div>
            </div>
            {expanded === i ? (
              <ChevronUp className="w-5 h-5 text-white/50" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white/50" />
            )}
          </div>
          
          {expanded === i && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-white/80 text-sm mb-4">{uc.detail}</p>
              <div className="bg-black/20 rounded-lg p-3 flex items-center gap-3">
                <div className="text-2xl font-bold text-white">{uc.stat}</div>
                <div className="text-white/60 text-xs">{uc.statLabel}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Tools Landscape
const ToolsLandscape = () => {
  const tools = [
    { name: 'Anthropic Citations', type: 'API', category: 'Production', accuracy: '+15% recall vs prompting' },
    { name: 'ContextCite', type: 'Research', category: 'Perturbation', accuracy: '~32 ablations needed' },
    { name: 'TransformerLens', type: 'Open Source', category: 'Mechanistic', accuracy: '2.8k GitHub stars' },
    { name: 'Langfuse', type: 'Open Source', category: 'Observability', accuracy: 'Full trace capture' },
    { name: 'LangSmith', type: 'Commercial', category: 'Observability', accuracy: 'Real-time monitoring' },
    { name: 'Self-RAG', type: 'Research', category: 'Self-Reflection', accuracy: '55.8% PopQA accuracy' },
  ];
  
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-cyan-400" />
        Tools & Frameworks Landscape
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">Tool</th>
              <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">Type</th>
              <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">Category</th>
              <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">Key Metric</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, i) => (
              <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-white font-medium">{tool.name}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    tool.type === 'API' ? 'bg-blue-900/50 text-blue-300' :
                    tool.type === 'Research' ? 'bg-purple-900/50 text-purple-300' :
                    tool.type === 'Commercial' ? 'bg-green-900/50 text-green-300' :
                    'bg-cyan-900/50 text-cyan-300'
                  }`}>
                    {tool.type}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400 text-sm">{tool.category}</td>
                <td className="py-3 px-4 text-slate-300 text-sm">{tool.accuracy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// The Gap Visualization
const TheGap = () => {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedPercent(p => p >= 25 ? 25 : p + 1);
      }, 40);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="bg-gradient-to-br from-red-950 to-orange-950 rounded-2xl p-6 border border-red-800/50">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-orange-400" />
        The Attribution Gap
      </h3>
      
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="#7f1d1d"
              strokeWidth="12"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="#ef4444"
              strokeWidth="12"
              strokeDasharray={`${animatedPercent * 3.52} 352`}
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{animatedPercent}%</span>
          </div>
        </div>
        
        <div className="flex-1">
          <p className="text-orange-200 mb-2">
            Even Anthropic's state-of-the-art circuit tracing provides <span className="text-white font-semibold">satisfying explanations for only ~25%</span> of prompts examined.
          </p>
          <p className="text-orange-300/70 text-sm">
            The remaining 75% involves complex interactions that current methods cannot fully explain.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-red-900/30 rounded-lg p-3 text-center">
          <div className="text-red-300 text-xs mb-1">Polysemanticity</div>
          <div className="text-white text-sm">Neurons encode multiple meanings</div>
        </div>
        <div className="bg-red-900/30 rounded-lg p-3 text-center">
          <div className="text-red-300 text-xs mb-1">Faithfulness</div>
          <div className="text-white text-sm">Explanations may not reflect true reasoning</div>
        </div>
        <div className="bg-red-900/30 rounded-lg p-3 text-center">
          <div className="text-red-300 text-xs mb-1">Scale</div>
          <div className="text-white text-sm">Billions of parameters to trace</div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function ContextAttributionViz() {
  const [activeSection, setActiveSection] = useState('overview');
  
  const sections = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'methods', label: 'Methods', icon: Target },
    { id: 'rag', label: 'RAG Pipeline', icon: Workflow },
    { id: 'circuits', label: 'Circuit Tracing', icon: GitBranch },
    { id: 'usecases', label: 'Use Cases', icon: Building },
    { id: 'tools', label: 'Tools', icon: Code }
  ];
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 border-b border-purple-700">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur">
              <Brain className="w-10 h-10 text-purple-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Context Attribution for LLMs</h1>
              <p className="text-purple-200">Interactive exploration of how we trace what models say to why they said it</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-wrap gap-2 mt-6">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeSection === s.id
                    ? 'bg-white text-purple-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-xl p-5 border border-purple-700">
                <div className="text-4xl font-bold text-purple-300 mb-2">30M</div>
                <div className="text-purple-200 text-sm">Interpretable features in Anthropic's circuit tracing</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl p-5 border border-blue-700">
                <div className="text-4xl font-bold text-blue-300 mb-2">~32</div>
                <div className="text-blue-200 text-sm">Context ablations needed for ContextCite attribution</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-900 to-cyan-950 rounded-xl p-5 border border-cyan-700">
                <div className="text-4xl font-bold text-cyan-300 mb-2">6,500x</div>
                <div className="text-cyan-200 text-sm">Throughput improvement with LoGra scaling</div>
              </div>
            </div>
            
            <TheGap />
            
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4">What is Context Attribution?</h3>
              <p className="text-slate-300 mb-4">
                Context attribution answers a fundamental question: <span className="text-white font-medium">which parts of the input context influenced the model's output?</span> This matters for verifying factual claims, debugging agent behavior, detecting hallucinations, and meeting regulatory requirements.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="text-green-400 font-medium mb-2">Corroborative Attribution</h4>
                  <p className="text-slate-400 text-sm">What context <em>supports</em> a generated statement? Used for citation verification.</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="text-blue-400 font-medium mb-2">Contributive Attribution</h4>
                  <p className="text-slate-400 text-sm">What context <em>caused</em> the generation? Used for debugging and understanding.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'methods' && <MethodsComparison />}
        
        {activeSection === 'rag' && <RAGPipeline />}
        
        {activeSection === 'circuits' && <CircuitTracingViz />}
        
        {activeSection === 'usecases' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Use Cases in LLM Agents</h2>
            <UseCases />
          </div>
        )}
        
        {activeSection === 'tools' && <ToolsLandscape />}
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="text-slate-500 text-sm text-center">
            Based on research from Anthropic, MIT CSAIL, Princeton NLP, and other leading AI research groups. 
            Key frameworks: ContextCite, Self-RAG, Circuit Tracing, ALCE Benchmark.
          </p>
        </div>
      </footer>
    </div>
  );
}