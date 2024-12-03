import { useState, useEffect, RefObject } from 'react';

interface MousePosition {
  elementX: number;
  elementY: number;
  mouseX: number;
  mouseY: number;
}

export function useMousePosition(elementRef: RefObject<HTMLElement>): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    elementX: 0,
    elementY: 0,
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      
      // Calculate position relative to the element (0-100)
      const elementX = ((ev.clientX - rect.left) / rect.width) * 100;
      const elementY = ((ev.clientY - rect.top) / rect.height) * 100;
      
      // Calculate absolute mouse position
      const mouseX = ev.clientX;
      const mouseY = ev.clientY;

      setMousePosition({
        elementX: Math.min(Math.max(elementX, 0), 100),
        elementY: Math.min(Math.max(elementY, 0), 100),
        mouseX,
        mouseY,
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [elementRef]);

  return mousePosition;
}
