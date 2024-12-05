import React, { useEffect, useRef, useState, useCallback } from 'react';

export const CustomCursor: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClicking, setIsClicking] = useState(false);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const trailTimeoutIds = useRef<number[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const animateCursor = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const mousemoveEvent = (e: MouseEvent) => {
        // Check if the mouse is over an iframe
        const target = e.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'iframe') {
          if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
          if (cursorRef.current) cursorRef.current.style.opacity = '0';
          return;
        }

        // Show cursor when not over iframe
        if (cursorDotRef.current) cursorDotRef.current.style.opacity = '1';
        if (cursorRef.current) cursorRef.current.style.opacity = '1';

        if (cursorDotRef.current && cursorRef.current) {
          const x = e.clientX;
          const y = e.clientY;
          
          cursorDotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
          cursorRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px) scale(${isClicking ? 0.9 : 1})`;
        }
      };

      window.addEventListener('mousemove', mousemoveEvent);
      return () => window.removeEventListener('mousemove', mousemoveEvent);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateCursor);
  }, [isClicking]);

  const createTrailElement = useCallback((x: number, y: number) => {
    if (isMobile) return;
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    document.body.appendChild(trail);

    const timeoutId = window.setTimeout(() => {
      document.body.removeChild(trail);
      trailTimeoutIds.current = trailTimeoutIds.current.filter(id => id !== timeoutId);
    }, 600);

    trailTimeoutIds.current.push(timeoutId);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    requestRef.current = requestAnimationFrame(animateCursor);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animateCursor, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.5) { // Reduce trail density for better performance
        createTrailElement(e.clientX, e.clientY);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      // Clear all trail timeouts
      trailTimeoutIds.current.forEach(id => window.clearTimeout(id));
      trailTimeoutIds.current = [];
    };
  }, [createTrailElement, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRef} className="custom-cursor" />
    </>
  );
};
