import React, { useState, useEffect } from 'react';

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

export default AnimatedLine;

