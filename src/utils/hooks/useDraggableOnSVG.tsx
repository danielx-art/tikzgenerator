import {
  type RefObject,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

type Tpos = { x: number; y: number };
export type DragState = { start: Tpos; diff: Tpos; curr: Tpos };

const useDraggableOnSVG = (svgRef?: RefObject<SVGSVGElement>) => {
  //const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
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
      isDraggingRef.current = true;
      //setIsDragging(true);
      const newDrag = {
        start: initialPosition,
        diff: { x: 0, y: 0 },
        curr: initialPosition,
      };
      setCurrentDrag(newDrag);
    },
    [transformCoordinates],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const newPosition = transformCoordinates(event.clientX, event.clientY);
      if (!newPosition || !currentDrag) return;
      const diff = {
        x: newPosition.x - currentDrag.curr.x,
        y: newPosition.y - currentDrag.curr.y,
      };
      //console.log(newPosition); //debugg
      const newDrag = {
        start: currentDrag.start,
        diff: diff,
        curr: newPosition,
      };
      setCurrentDrag(newDrag);
    },
    [transformCoordinates, currentDrag],
  );

  useEffect(() => {
    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setCurrentDrag(null);
      //setIsDragging(false);
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
  }, [handleMouseDown, handleMouseMove]);

  return { isDragging: isDraggingRef.current, currentDrag };
};

export default useDraggableOnSVG;
