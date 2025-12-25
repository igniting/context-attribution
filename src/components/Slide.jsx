import React from 'react';
import { CITATIONS } from './Citation';

const Slide = ({ children, className = '', references = [] }) => {
  // Get unique citations
  const refs = references
    .map(key => CITATIONS[key])
    .filter(Boolean);

  return (
    <div className={`min-h-screen w-full flex flex-col px-8 md:px-16 lg:px-24 py-12 ${className}`}>
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center">
        {children}
      </div>

      {refs.length > 0 && (
        <div className="max-w-5xl mx-auto w-full mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            {refs.map((ref, i) => (
              <a
                key={i}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700 hover:underline"
              >
                [{ref.id}] {ref.authors}, {ref.venue} {ref.year}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slide;
