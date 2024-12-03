import { useState, useEffect } from 'react';

export function useScrollProgress(elementRef: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      // Calculate how far through the element we've scrolled
      const scrollProgress = (scrollPosition + windowHeight - elementTop) / (elementHeight + windowHeight);
      
      // Clamp the value between 0 and 1
      const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);
      
      setProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  return progress;
}
