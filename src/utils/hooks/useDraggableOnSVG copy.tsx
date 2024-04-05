import { type RefObject, useState, useEffect, useCallback } from "react";

type Tpos = { x: number; y: number };
export type DragState = { start: Tpos; diff: Tpos; curr: Tpos };
type DragCallback = (dragState: Partial<DragState>) => void;

const useDraggableOnSVG = (
  svgRef?: RefObject<SVGSVGElement>,
  onMove?: DragCallback,
  onStart?: DragCallback,
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentDrag, setCurrentDrag] = useState<DragState | null>(null);

  const transformCoordinates = useCallback(
    (clientX: number, clientY: number) => {
      if (!svgRef || !svgRef.current) return;

      let pt = svgRef.current.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;

      // Transform the point to the SVG coordinate system
      const screenCTM = svgRef.current.getScreenCTM();
      if (!screenCTM) return;
      pt = pt.matrixTransform(screenCTM.inverse());

      return { x: pt.x, y: pt.y };
    },
    [svgRef],
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      const initialPosition = transformCoordinates(
        event.clientX,
        event.clientY,
      );
      if (!initialPosition) return;
      console.log("HEYO"); //debugg
      setIsDragging(true);
      const newDrag = {
        start: initialPosition,
        diff: { x: 0, y: 0 },
        curr: initialPosition,
      };
      setCurrentDrag(newDrag);
      onStart && onStart(newDrag);
    },
    [svgRef],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      console.log(isDragging); //debugg
      if (!isDragging) return;
      const newPosition = transformCoordinates(event.clientX, event.clientY);
      if (!newPosition || !currentDrag) return;
      const diff = {
        x: newPosition.x - currentDrag.start.x,
        y: newPosition.y - currentDrag.start.y,
      };
      const newDrag = {
        start: currentDrag.start,
        diff: diff,
        curr: newPosition,
      };
      setCurrentDrag(newDrag);
      onMove && onMove(newDrag);
    },
    [svgRef, onMove, isDragging],
  );

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const svgElement = svgRef && svgRef.current;
    if (svgElement) {
      svgElement.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (svgElement) {
        svgElement.removeEventListener("mousedown", handleMouseDown);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [svgRef]);

  return { isDragging, currentDrag };
};

export default useDraggableOnSVG;
