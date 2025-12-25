import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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

export default SlideNavigation;

