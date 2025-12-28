import React, { useState, useEffect, useCallback } from 'react';
import {
  TitleSlide,
  WhatIsAttributionSlide,
  MethodsOverviewSlide,
  PerturbationAttributionSlide,
  IntegratedGradientsSlide,
  ContextCiteSlide,
  CircuitTracingSlide,
  TrainingDataAttributionSlide,
  SelfRAGSlide,
  RAGBenchmarksSlide,
  FaithfulnessSlide,
  AdvancedMethodsSlide,
  ProductionAPIsSlide,
  UseCasesSlide,
  AgentAttributionSlide,
  ConclusionSlide
} from './slides';

export default function ContextAttributionPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    TitleSlide,
    WhatIsAttributionSlide,
    MethodsOverviewSlide,
    PerturbationAttributionSlide,   // Perturbation-based: Feature Ablation, Shapley
    IntegratedGradientsSlide,       // Gradient-based: Layer Integrated Gradients
    ContextCiteSlide,
    CircuitTracingSlide,
    TrainingDataAttributionSlide,  // New: Training data attribution
    SelfRAGSlide,
    RAGBenchmarksSlide,
    FaithfulnessSlide,
    AdvancedMethodsSlide,          // New: TokenShapley, AttriBoT, etc.
    ProductionAPIsSlide,           // New: Anthropic/Google/OpenAI APIs
    UseCasesSlide,
    AgentAttributionSlide,         // New: LOO vs Shapley, RAG + Tool attribution
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

      {/* Slide counter */}
      <div className="fixed bottom-8 left-8 text-xs text-gray-400">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Keyboard hint */}
      <div className="fixed bottom-8 right-8 text-xs text-gray-400">
        Use arrow keys to navigate
      </div>
    </div>
  );
}
