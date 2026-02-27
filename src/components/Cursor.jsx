import React, { useEffect, useState, useRef } from 'react';

const Cursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    const updateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
      }
      frameRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      positionRef.current = { x: e.clientX - 8, y: e.clientY - 8 };
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    updateCursor();

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{ willChange: 'transform' }}
    />
  );
};

export default Cursor;
