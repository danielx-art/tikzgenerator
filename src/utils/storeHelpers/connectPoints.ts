import { type Tpoint, segmento, Tsegment } from "public/entidades";
import type { Action, State } from "../store/store";
import { getSelected } from "./miscEntity";

export const connectPoints = (
  store: (State & Action) | undefined,
  cyclic: boolean = false,
) => {
  if (!store) return;

  const { points, segments, generateId, setSegments } = store;

  // const selectedPoints = Array.from(points.values()).filter(
  //   (point) => point.selected,
  // );

  const selectedPoints = getSelected("point", store);

  const updatedSegments = new Map(segments);

  for (let i = 0; i < selectedPoints.length - 1; i++) {
    const pA = selectedPoints[i];
    const pB = selectedPoints[i + 1];

    if (!pA || !pB) continue;

    const segAlreadyExistys = doesSegAlreadyExists(
      Array.from(updatedSegments.values()),
      pA,
      pB,
    );

    if (segAlreadyExistys) {
      continue;
    }

    const newSegId = generateId("segment");
    const newSeg = segmento(pA, pB, newSegId);
    updatedSegments.set(newSegId, newSeg);
  }

  if (cyclic) {
    const closingSegId = generateId("segment");
    const lastPoint = selectedPoints[selectedPoints.length - 1];
    const firstPoint = selectedPoints[0];

    if (lastPoint && firstPoint) {
      const segAlreadyExistys = doesSegAlreadyExists(
        Array.from(updatedSegments.values()),
        lastPoint,
        firstPoint,
      );

      if (!segAlreadyExistys) {
        const closingSeg = segmento(lastPoint, firstPoint, closingSegId);
        updatedSegments.set(closingSegId, closingSeg);
      }
    }
  }

  setSegments(updatedSegments);
};

function doesSegAlreadyExists(segments: Tsegment[], pA: Tpoint, pB: Tpoint) {
  const foundSegment = segments.find(
    (seg) =>
      (seg.p1.coords.x === pA.coords.x &&
        seg.p1.coords.y === pA.coords.y &&
        seg.p2.coords.x === pB.coords.x &&
        seg.p2.coords.y === pB.coords.y) ||
      (seg.p2.coords.x === pA.coords.x &&
        seg.p2.coords.y === pA.coords.y &&
        seg.p1.coords.x === pB.coords.x &&
        seg.p1.coords.y === pB.coords.y),
  );

  if (foundSegment) return true;

  return false;
}
