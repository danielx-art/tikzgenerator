import { useCallback } from "react";
import { vec, vector } from "../math/vetores";
import { TpointId } from "public/entidades";
import { RES_FACTOR } from "public/generalConfigs";

const useDraggablePoint = (
  id: TpointId,
  initialPosition: vector,
  movePoint: (id: TpointId, newPosition: vector) => void,
) => {
  const startDrag = (clientX: number, clientY: number) => {
    const startX = clientX - initialPosition.x;
    const startY = clientY - initialPosition.y;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      let clientPos = { x: 0, y: 0 };
      if (e instanceof MouseEvent) {
        clientPos = { x: e.clientX, y: e.clientY };
      } else if (e.touches[0]) {
        clientPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      const newPosition = vec(clientPos.x - startX, clientPos.y - startY);
      movePoint(id, newPosition);
    };

    const handleEnd = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
      window.removeEventListener("touchcancel", handleEnd);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);
    window.addEventListener("touchcancel", handleEnd);
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<Element, MouseEvent>) => {
      startDrag(
        e.clientX,
        e.clientY,
      );
    },
    [id, initialPosition, movePoint],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<Element>) => {
      if (e.touches[0]) {
        startDrag(
          e.touches[0].clientX,
          e.touches[0].clientY,
        );
      }
    },
    [id, initialPosition, movePoint],
  );

  return { handleMouseDown, handleTouchStart };
};

export default useDraggablePoint;
