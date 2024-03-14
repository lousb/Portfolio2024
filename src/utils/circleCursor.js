import React, { useState, useEffect } from 'react';
import { TweenMax } from 'gsap';

const CircleCursor = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      TweenMax.to('.cursor__ball--big', 0.2, {
        x: e.clientX - 15,
        y: e.clientY - 15,
      });
    };

    document.body.addEventListener('mousemove', updateCursorPosition);

    return () => {
      document.body.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  return (
    <div className="cursor">
      <div
        className="cursor__ball cursor__ball--big"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg height="30" width="30">
          <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
        </svg>
      </div>
    </div>
  );
};

export default CircleCursor;
