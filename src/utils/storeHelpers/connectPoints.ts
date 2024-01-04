import { type Tpoint, segmento } from "public/entidades";
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
    const pA = selectedPoints[i] as Tpoint;
    const pB = selectedPoints[i + 1] as Tpoint;
    const newSegId = generateId("segment");
    const newSeg = segmento(pA, pB, newSegId);
    updatedSegments.set(newSegId, newSeg);
  }

  if (cyclic) {
    const closingSegId = generateId("segment");
    const lastPoint = selectedPoints[selectedPoints.length - 1] as Tpoint;
    const firstPoint = selectedPoints[0] as Tpoint;
    const closingSeg = segmento(lastPoint, firstPoint, closingSegId);
    updatedSegments.set(closingSegId, closingSeg);
  }

  setSegments(updatedSegments);
};
