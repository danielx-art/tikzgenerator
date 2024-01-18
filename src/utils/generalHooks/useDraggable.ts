import { useState, useCallback, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

const useDraggable = (initialPosition: Position) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const startDrag = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    setPosition({ x: clientX, y: clientY });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    startDrag(e.clientX, e.clientY);
  }, [startDrag]);

  const handleTouchStart = useCallback((e: React.TouchEvent<SVGPathElement>) => {
    if (e.touches[0]) {
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    }
  }, [startDrag]);

  const handleDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (isDragging) {
        setPosition((prevPosition) => ({
          x: prevPosition.x + clientX - prevPosition.x,
          y: prevPosition.y + clientY - prevPosition.y,
        }));
      }
    },
    [isDragging]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleDrag(e.clientX, e.clientY);
    },
    [handleDrag]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        const touch = e.touches[0];
        handleDrag(touch.clientX, touch.clientY);
      }
    },
    [isDragging, handleDrag]
  );

  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', stopDrag);
      window.addEventListener('touchcancel', stopDrag);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopDrag);
      window.removeEventListener('touchcancel', stopDrag);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, stopDrag]);

  return { position, handleMouseDown, handleTouchStart };
};

export default useDraggable;