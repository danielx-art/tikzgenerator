import type { vector } from "../math/linear-algebra/vetores";
import { distancePointToLine, findEquidistantCenter } from "../math/linear-algebra/distancesAndAreas";
import configStore from "../store/configStore";

export function getCircleFromOnePoint(p: vector, r?: number) {
  return {
    center: p,
    radius: r ? r : configStore.getState().DEFAULT_CIRCLE_RADIUS,
  }
}

export function getCircleFromTwoPoints(p: vector, q: vector) {
  return {
    center: p,
    radius: p.dist(q)
  };
}

export function getCircleFromPointAndTangent(p: vector, a: vector, b: vector){
  return {
    center: p,
    radius: distancePointToLine(p, a, b)
  }
}

export function getCircleFromThreePoints(
  a: vector,
  b: vector,
  c: vector,
) {
    
  const center = findEquidistantCenter(a, b, c);

  const radius = center.dist(a);

  return { center, radius };
}