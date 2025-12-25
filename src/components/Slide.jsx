import React from 'react';

const Slide = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 ${className}`}>
      <div className="max-w-5xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default Slide;

