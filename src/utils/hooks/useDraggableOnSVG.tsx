import { useState, useEffect, useRef, RefObject } from "react";

type Tpos = { x: number; y: number };
export type DragState = { start: Tpos; diff: Tpos; curr: Tpos };
export type OnDragCallback = (
  isDragging: boolean,
  currentDrag: DragState | null,
) => void;

const useDraggableOnSVG = (
  svgRef?: RefObject<SVGSVGElement>,
  onDragCallback?: OnDragCallback,
) => {
  const isDraggingRef = useRef(false);
  const currentDragRef = useRef<DragState | null>(null);
  const [, forceUpdate] = useState({});

  const transformCoordinates = (clientX: number, clientY: number) => {
    if (!svgRef?.current) return null;

    let pt = svgRef.current.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;

    const screenCTM = svgRef.current.getScreenCTM();
    if (!screenCTM) return null;
    pt = pt.matrixTransform(screenCTM.inverse());

    return { x: pt.x, y: pt.y };
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const initialPosition = transformCoordinates(
        event.clientX,
        event.clientY,
      );
      if (!initialPosition) return;

      isDraggingRef.current = true;
      currentDragRef.current = {
        start: initialPosition,
        diff: { x: 0, y: 0 },
        curr: initialPosition,
      };

      forceUpdate({});
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !currentDragRef.current) return;

      const newPosition = transformCoordinates(event.clientX, event.clientY);
      if (!newPosition) return;

      const diff = {
        x: newPosition.x - currentDragRef.current.curr.x,
        y: newPosition.y - currentDragRef.current.curr.y,
      };

      currentDragRef.current = {
        ...currentDragRef.current,
        diff: diff,
        curr: newPosition,
      };

      onDragCallback &&
        onDragCallback(isDraggingRef.current, currentDragRef.current);

      forceUpdate({});
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      currentDragRef.current = null;
      onDragCallback &&
        onDragCallback(isDraggingRef.current, currentDragRef.current);
      forceUpdate({});
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    svgRef?.current?.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      svgRef?.current?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [svgRef?.current, onDragCallback]);

  return {
    isDragging: isDraggingRef.current,
    currentDrag: currentDragRef.current,
  };
};

export default useDraggableOnSVG;
