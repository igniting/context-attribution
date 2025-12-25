# Context Attribution Research Sources
## Ranked by Relevance for LLM Agent Development

---

## Tier 1: Essential Reading (Core Research)

### Mechanistic Interpretability & Circuit Tracing

1. **On the Biology of a Large Language Model** - Anthropic
   - https://transformer-circuits.pub/2025/attribution-graphs/biology.html
   - *Why it matters*: Foundational work on attribution graphs with 30M interpretable features. Shows multi-step reasoning traces like "Dallas → Texas → Austin"

2. **Open-sourcing circuit-tracing tools** - Anthropic
   - https://www.anthropic.com/research/open-source-circuit-tracing
   - *Why it matters*: Production-ready tools for circuit analysis, applicable to Gemma-2-2b and Llama-3.2-1b

3. **The Urgency of Interpretability** - Dario Amodei
   - https://www.darioamodei.com/post/the-urgency-of-interpretability
   - *Why it matters*: Strategic vision for interpretability research, 2027 goal articulation

### RAG Attribution & Citation

4. **ALCE: Automatic Benchmark for LLM Generations with Citations**
   - https://arxiv.org/abs/2305.14627
   - https://ar5iv.labs.arxiv.org/html/2305.14627
   - *Why it matters*: The standard benchmark for citation quality evaluation (ASQA, QAMPARI, ELI5 datasets)

5. **Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection**
   - https://arxiv.org/abs/2310.11511
   - https://selfrag.github.io/
   - *Why it matters*: Introduces [Retrieve], [IsRel], [IsSup] reflection tokens. 55.8% accuracy on PopQA vs 24.4% baseline

6. **VISA: Retrieval Augmented Generation with Visual Source Attribution**
   - https://arxiv.org/html/2412.14457
   - *Why it matters*: Visual bounding box attribution for document-level evidence location

7. **RAGentA: Multi-Agent RAG for Attributed Question Answering**
   - https://arxiv.org/html/2506.16988
   - *Why it matters*: +10.7% faithfulness improvement through specialized agents for filtering, generation, verification

---

## Tier 2: Technical Deep Dives

### Attribution Methods

8. **ContextCite** - MIT CSAIL / Madry Lab
   - https://arxiv.org/abs/2409.00729
   - https://github.com/MadryLab/context-cite
   - *Why it matters*: Leading perturbation-based method. ~32 ablations for attribution. Distinguishes corroborative vs contributive attribution

9. **FaithLens: Detecting and Explaining Faithfulness Hallucination**
   - https://arxiv.org/html/2512.20182
   - *Why it matters*: Hallucination detection and explanation framework

10. **The Semantic Illusion: Certified Limits of Embedding-Based Hallucination Detection**
    - https://arxiv.org/html/2512.15068
    - *Why it matters*: Critical finding - embedding methods fail catastrophically on real hallucinations (100% FPR). GPT-4 reasoning succeeds where embeddings fail

11. **Why Would You Suggest That? Human Trust in Language Model Responses**
    - https://arxiv.org/html/2406.02018v1
    - *Why it matters*: CHI 2025 research on trust calibration - explanations only help when users can compare responses

### Explainability Surveys

12. **Explainability for Large Language Models: A Survey** - ACM TIST
    - https://dl.acm.org/doi/10.1145/3639372
    - *Why it matters*: Comprehensive academic survey of LLM explainability methods

---

## Tier 3: Production Tools & Implementation

### Observability Platforms

13. **Langfuse** - Open Source LLM Engineering Platform
    - https://github.com/langfuse/langfuse
    - *Why it matters*: Open-source tracing, RAG retrieval step tracking, cost monitoring. Production-ready

14. **LangSmith Observability** - LangChain
    - https://www.langchain.com/langsmith/observability
    - *Why it matters*: Commercial agent behavior tracing with real-time monitoring dashboards

15. **LLM Observability with Langfuse: A Complete Guide**
    - https://www.paulmduvall.com/llm-observability-with-langfuse-a-complete-guide/
    - *Why it matters*: Practical implementation guide

### Interpretability Libraries

16. **TransformerLens** - Mechanistic Interpretability Library
    - https://github.com/TransformerLensOrg/TransformerLens
    - *Why it matters*: 2.8k stars, enables activation patching and causal interventions. Easy hooking into any layer

17. **Captum** - Meta/PyTorch Attribution Library
    - https://captum.ai
    - https://captum.ai/api/llm_attr.html (LLM Attribution API)
    - https://captum.ai/tutorials/Llama2_LLM_Attribution (Tutorial)
    - https://github.com/pytorch/captum
    - https://arxiv.org/abs/2312.05491 (Paper: Using Captum to Explain Generative Language Models)
    - *Why it matters*: LLMAttribution wrapper for perturbation and gradient-based methods

---

## Tier 4: Compliance & Enterprise

### Regulatory Requirements

18. **AI Transparency Requirements: Compliance and Implementation** - GDPR Local
    - https://gdprlocal.com/ai-transparency-requirements/
    - *Why it matters*: EU AI Act requirements, €35M/7% penalties, Aug 2026 compliance deadline

19. **LLM Regulatory Compliance Requirements for Enterprises** - Datavid
    - https://datavid.com/blog/what-are-llm-regulatory-compliance-requirements-for-enterprises
    - *Why it matters*: Enterprise compliance framework overview

20. **Enhancing Legal Compliance with LLM-Augmented Audit Trails**
    - https://dataprocorp.tech/enhancing-legal-compliance/
    - *Why it matters*: Practical audit trail implementation patterns

21. **The AI Audit Trail: Compliance and Transparency with LLM Observability**
    - https://medium.com/@kuldeep.paul08/the-ai-audit-trail-how-to-ensure-compliance-and-transparency-with-llm-observability-74fd5f1968ef
    - *Why it matters*: Implementation guidance for compliance logging

---

## Tier 5: Practitioner Guides & Tutorials

### RAG Evaluation

22. **Mastering RAG: How To Evaluate LLMs For RAG** - Galileo AI
    - https://galileo.ai/blog/how-to-evaluate-llms-for-rag
    - *Why it matters*: Practical RAG evaluation metrics and methods

23. **Self-RAG Explained** - Medium
    - https://medium.com/@sahin.samia/self-rag-self-reflective-retrieval-augmented-generation-the-game-changer-in-factual-ai-dd32e59e3ff9
    - *Why it matters*: Accessible explanation of Self-RAG architecture

### Explainability Techniques

24. **Explainability Techniques for LLMs & AI Agents** - testRigor
    - https://testrigor.com/blog/explainability-techniques-for-llms-ai-agents/
    - *Why it matters*: Practical overview of agent explainability methods

25. **A Hands-on Guide on CometLLM for LLM Explainability** - ADaSci
    - https://adasci.org/a-hands-on-guide-on-cometllm-for-llm-explainability/
    - *Why it matters*: Tutorial on experiment tracking for LLM debugging

26. **LLMs, Explanations, and Appropriate Trust** - AEM Corp
    - https://www.aemcorp.com/ai/blog/llms-explanations-and-appropriate-trust
    - *Why it matters*: Discussion of trust calibration challenges

### Tracing & Debugging

27. **What is LLM Tracing? Tools & Challenges** - Deepchecks
    - https://www.deepchecks.com/glossary/llm-tracing/
    - *Why it matters*: Overview of tracing concepts and tool landscape

28. **LLM Tracing: Your Guide to How AI Models Really Think** - Sandgarden
    - https://www.sandgarden.com/learn/llm-tracing
    - *Why it matters*: Accessible introduction to tracing concepts

29. **A Comprehensive Guide to Observability in AI Agents** - DEV Community
    - https://dev.to/kuldeep_paul/a-comprehensive-guide-to-observability-in-ai-agents-best-practices-4bd4
    - *Why it matters*: Best practices for agent monitoring

---

## Tier 6: News & Commentary

30. **Anthropic Open-Sources Tool to Trace LLM Thoughts** - InfoQ
    - https://www.infoq.com/news/2025/06/anthropic-circuit-tracing/
    - *Why it matters*: News coverage of circuit tracing release

31. **Anthropic's Amazing Report on LLM Interpretability** - Medium
    - https://medium.com/@lee.fischman/anthropic-drops-an-amazing-report-on-llm-interpretability-d3fbcd5ba762
    - *Why it matters*: Commentary on Anthropic's interpretability research

---

## Additional Resources (Not Directly Cited but Relevant)

### Key Papers to Search For

32. **Integrated Gradients (Axiomatic Attribution for Deep Networks)** - Sundararajan et al., 2017
    - https://arxiv.org/abs/1703.01365
    - https://proceedings.mlr.press/v70/sundararajan17a/sundararajan17a.pdf
    - https://github.com/ankurtaly/Integrated-Gradients
    - *Why it matters*: Foundation for gradient-based attribution, satisfies Sensitivity and Implementation Invariance axioms

33. **LoGra: LLM-Scale Data Valuation with Influence Functions** - CMU/Toronto, 2024
    - https://arxiv.org/abs/2405.13954
    - https://openreview.net/forum?id=jZw0CWXuDc (ICLR 2025)
    - *Why it matters*: 6,500x throughput improvement for training data attribution on Llama3-8B

34. **Detecting Hallucinations Using Semantic Entropy** - Farquhar et al., Nature 2024
    - https://www.nature.com/articles/s41586-024-07421-0
    - https://oatml.cs.ox.ac.uk/blog/2024/06/19/detecting_hallucinations_2024.html (Blog)
    - https://arxiv.org/abs/2406.15927 (Semantic Entropy Probes - follow-up)
    - *Why it matters*: 89-91% accuracy for hallucination detection by measuring uncertainty over meanings rather than tokens

35. **GIM: Gradient Interaction Modifications for Improved Interpretability** - 2025
    - https://arxiv.org/abs/2505.17630
    - https://openreview.net/forum?id=ZRDYvWF1ZJ
    - *Why it matters*: Addresses attention self-repair in softmax operations through temperature-adjusted gradients; significantly improves faithfulness over existing circuit identification methods on Gemma 2B/9B, LLAMA 1B/3B/8B, Qwen 1.5B/3B

36. **START: Self-Taught AttRibuTion Framework** - EMNLP 2024
    - https://arxiv.org/abs/2410.13298
    - https://aclanthology.org/2024.emnlp-main.223/
    - *Why it matters*: Self-improving citation through synthetic data warming-up plus fine-grained preference optimization; 25.13% average improvement without human annotations

### Research Groups to Follow

37. **Anthropic Interpretability Team**
    - https://www.anthropic.com/research
    - Key people: Chris Olah, Jack Lindsey, Trenton Bricken, Sholto Douglas

38. **MIT CSAIL / Madry Lab**
    - https://madry-lab.ml/
    - Key work: ContextCite, adversarial robustness

39. **Princeton NLP**
    - https://nlp.cs.princeton.edu/
    - Key people: Danqi Chen, Tianyu Gao
    - Key work: ALCE benchmark

40. **Transformer Circuits Thread**
    - https://transformer-circuits.pub/
    - *Why it matters*: Ongoing mechanistic interpretability research

### GitHub Repositories

41. **awesome-llm-interpretability** - GitHub Repository
    - https://github.com/JShollaj/awesome-llm-interpretability
    - https://github.com/cooperleong00/Awesome-LLM-Interpretability (Alternative)
    - https://github.com/ruizheliUOA/Awesome-Interpretability-in-Large-Language-Models (Comprehensive)
    - https://github.com/gauravfs-14/awesome-mechanistic-interpretability (Mechanistic focus)
    - *Why it matters*: Curated lists of interpretability resources, papers, tools, and tutorials

42. **circuit-tracer** - Anthropic Open Source
    - https://github.com/safety-research/circuit-tracer
    - https://www.neuronpedia.org/gemma-2-2b/graph (Interactive frontend)
    - *Why it matters*: Official Anthropic circuit tracing tools for generating attribution graphs on Gemma-2-2b and Llama-3.2-1b

### Additional Papers Discovered During Research

43. **SelfCite: Self-Supervised Alignment for Context Attribution**
    - https://arxiv.org/html/2502.09604
    - *Why it matters*: Uses ablation-based contributive alignment to improve citation quality without human supervision

44. **CAMAB: Context Attribution with Multi-Armed Bandit Optimization**
    - https://arxiv.org/html/2506.19977
    - *Why it matters*: More efficient context attribution using Thompson Sampling, outperforms ContextCite with fewer queries

45. **Do Influence Functions Work on Large Language Models?**
    - https://arxiv.org/html/2409.19998v1
    - *Why it matters*: Critical evaluation showing influence functions perform poorly on LLMs; RepSim achieves near 100% identification where influence functions fail

46. **Enhancing Training Data Attribution with Fitting Error (DDA)**
    - https://arxiv.org/abs/2410.01285
    - *Why it matters*: Debias and Denoise Attribution achieves 93.49% AUC on hallucination tracing

47. **AirRep: Representational Optimization for Training Data Attribution**
    - https://arxiv.org/html/2505.18513
    - *Why it matters*: Scalable representation-based TDA that can attribute 100M+ examples vs 2M for LoGra

48. **LongCite: Enabling LLMs to Generate Fine-grained Citations in Long-context QA**
    - https://arxiv.org/abs/2409.02897
    - https://github.com/THUDM/LongCite
    - https://huggingface.co/datasets/THUDM/LongCite-45k (Dataset)
    - https://huggingface.co/THUDM/LongCite-glm4-9b (Model)
    - *Why it matters*: Fine-tuned models (LongCite-8B/9B) for sentence-level citation generation, outperforms GPT-4o by 6.4% in citation F1

---
