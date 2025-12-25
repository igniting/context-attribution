import React, { useState } from 'react';

const Citation = ({ id, authors, title, venue, year, url, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <span className="relative inline-block">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors cursor-pointer no-underline"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children || `[${id}]`}
      </a>
      
      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl pointer-events-none">
          <div className="font-semibold text-gray-100 mb-1">{title}</div>
          <div className="text-gray-300 mb-1">{authors}</div>
          <div className="text-gray-400">{venue} {year}</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
            <div className="border-8 border-transparent border-t-gray-900" />
          </div>
        </div>
      )}
    </span>
  );
};

// Pre-defined citations from citations.md
export const CITATIONS = {
  anthropicBiology: {
    id: '1',
    authors: 'Anthropic',
    title: 'On the Biology of a Large Language Model',
    venue: 'Transformer Circuits',
    year: '2025',
    url: 'https://transformer-circuits.pub/2025/attribution-graphs/biology.html'
  },
  anthropicCircuitTools: {
    id: '2',
    authors: 'Anthropic',
    title: 'Open-sourcing circuit-tracing tools',
    venue: 'Anthropic Research',
    year: '2025',
    url: 'https://www.anthropic.com/research/open-source-circuit-tracing'
  },
  darioInterpretability: {
    id: '3',
    authors: 'Dario Amodei',
    title: 'The Urgency of Interpretability',
    venue: 'Blog Post',
    year: '2025',
    url: 'https://www.darioamodei.com/post/the-urgency-of-interpretability'
  },
  alce: {
    id: '4',
    authors: 'Gao et al.',
    title: 'ALCE: Automatic Benchmark for LLM Generations with Citations',
    venue: 'EMNLP',
    year: '2023',
    url: 'https://arxiv.org/abs/2305.14627'
  },
  selfRag: {
    id: '5',
    authors: 'Asai et al.',
    title: 'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection',
    venue: 'arXiv',
    year: '2023',
    url: 'https://arxiv.org/abs/2310.11511'
  },
  contextCite: {
    id: '8',
    authors: 'Gao et al.',
    title: 'ContextCite: Attributing Model Generation to Context',
    venue: 'NeurIPS',
    year: '2024',
    url: 'https://arxiv.org/abs/2409.00729'
  },
  faithLens: {
    id: '9',
    authors: 'Authors',
    title: 'FaithLens: Detecting and Explaining Faithfulness Hallucination',
    venue: 'arXiv',
    year: '2024',
    url: 'https://arxiv.org/html/2512.20182'
  },
  semanticIllusion: {
    id: '10',
    authors: 'Authors',
    title: 'The Semantic Illusion: Certified Limits of Embedding-Based Hallucination Detection',
    venue: 'arXiv',
    year: '2025',
    url: 'https://arxiv.org/html/2512.15068'
  },
  humanTrust: {
    id: '11',
    authors: 'Authors',
    title: 'Why Would You Suggest That? Human Trust in Language Model Responses',
    venue: 'CHI',
    year: '2025',
    url: 'https://arxiv.org/html/2406.02018v1'
  },
  acmSurvey: {
    id: '12',
    authors: 'Zhao et al.',
    title: 'Explainability for Large Language Models: A Survey',
    venue: 'ACM TIST',
    year: '2024',
    url: 'https://dl.acm.org/doi/10.1145/3639372'
  },
  transformerLens: {
    id: '16',
    authors: 'Neel Nanda et al.',
    title: 'TransformerLens: Mechanistic Interpretability Library',
    venue: 'GitHub',
    year: '2024',
    url: 'https://github.com/TransformerLensOrg/TransformerLens'
  },
  captum: {
    id: '17',
    authors: 'Meta/PyTorch',
    title: 'Captum: Model Interpretability for PyTorch',
    venue: 'GitHub',
    year: '2024',
    url: 'https://captum.ai'
  },
  integratedGradients: {
    id: '32',
    authors: 'Sundararajan et al.',
    title: 'Axiomatic Attribution for Deep Networks (Integrated Gradients)',
    venue: 'ICML',
    year: '2017',
    url: 'https://arxiv.org/abs/1703.01365'
  },
  logra: {
    id: '33',
    authors: 'CMU/Toronto',
    title: 'LoGra: LLM-Scale Data Valuation with Influence Functions',
    venue: 'ICLR',
    year: '2025',
    url: 'https://arxiv.org/abs/2405.13954'
  },
  semanticEntropy: {
    id: '34',
    authors: 'Farquhar et al.',
    title: 'Detecting Hallucinations Using Semantic Entropy',
    venue: 'Nature',
    year: '2024',
    url: 'https://www.nature.com/articles/s41586-024-07421-0'
  },
  gim: {
    id: '35',
    authors: 'Authors',
    title: 'GIM: Gradient Interaction Modifications for Improved Interpretability',
    venue: 'arXiv',
    year: '2025',
    url: 'https://arxiv.org/abs/2505.17630'
  },
  start: {
    id: '36',
    authors: 'Authors',
    title: 'START: Self-Taught AttRibuTion Framework',
    venue: 'EMNLP',
    year: '2024',
    url: 'https://arxiv.org/abs/2410.13298'
  },
  selfCite: {
    id: '43',
    authors: 'Authors',
    title: 'SelfCite: Self-Supervised Alignment for Context Attribution',
    venue: 'arXiv',
    year: '2025',
    url: 'https://arxiv.org/html/2502.09604'
  },
  camab: {
    id: '44',
    authors: 'Authors',
    title: 'CAMAB: Context Attribution with Multi-Armed Bandit Optimization',
    venue: 'arXiv',
    year: '2025',
    url: 'https://arxiv.org/html/2506.19977'
  },
  influenceFunctionsWork: {
    id: '45',
    authors: 'Authors',
    title: 'Do Influence Functions Work on Large Language Models?',
    venue: 'arXiv',
    year: '2024',
    url: 'https://arxiv.org/html/2409.19998v1'
  },
  dda: {
    id: '46',
    authors: 'Authors',
    title: 'Enhancing Training Data Attribution with Fitting Error (DDA)',
    venue: 'arXiv',
    year: '2024',
    url: 'https://arxiv.org/abs/2410.01285'
  },
  longCite: {
    id: '48',
    authors: 'THUDM',
    title: 'LongCite: Enabling LLMs to Generate Fine-grained Citations in Long-context QA',
    venue: 'arXiv',
    year: '2024',
    url: 'https://arxiv.org/abs/2409.02897'
  }
};

// Helper component for quick citation usage
export const Cite = ({ refKey }) => {
  const citation = CITATIONS[refKey];
  if (!citation) return <span className="text-red-500">[?]</span>;
  
  return (
    <Citation {...citation}>
      [{citation.id}]
    </Citation>
  );
};

export default Citation;

