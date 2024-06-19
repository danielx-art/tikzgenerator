import { type Tpoint, segmento, Tsegment } from "public/entidades";
import type { Action, State } from "../store/store";
import { getSelected } from "./entityGetters";

export const connectPoints = (
  store: (State & Action) | undefined,
  cyclic: boolean = false,
) => {
  if (!store) return;

  const { points, segments, generateId } = store;

  const selectedPoints = getSelected("point", store);

  for (let i = 0; i < selectedPoints.length - 1; i++) {
    const pA = selectedPoints[i];
    const pB = selectedPoints[i + 1];

    if (!pA || !pB) continue;

    const segAlreadyExistys = doesSegAlreadyExists(
      Array.from(segments.values()),
      pA,
      pB,
    );

    if (segAlreadyExistys) {
      continue;
    }

    const newSegId = generateId("segment");
    const newSeg = segmento(pA, pB, newSegId);
    store.update(newSeg);
  }

  if (cyclic) {
    const closingSegId = generateId("segment");
    const lastPoint = selectedPoints[selectedPoints.length - 1];
    const firstPoint = selectedPoints[0];

    if (lastPoint && firstPoint) {
      const segAlreadyExistys = doesSegAlreadyExists(
        Array.from(segments.values()),
        lastPoint,
        firstPoint,
      );

      if (!segAlreadyExistys) {
        const closingSeg = segmento(lastPoint, firstPoint, closingSegId);
        store.update(closingSeg);
      }
    }
  }

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
