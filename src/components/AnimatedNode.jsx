import React, { useState, useEffect } from 'react';

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

export default AnimatedNode;

