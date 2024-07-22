import type { vector } from "../math/linear-algebra/vetores";
import { distancePointToLine, findEquidistantCenter } from "../math/linear-algebra/distancesAndAreas";
import configStore from "../store/configStore";
import { Tpoint, Tsegment } from "../store/entities/types";

export function calcCircleFromOnePoint(p: vector, r?: number) {
  return {
    center: p,
    radius: r ? r : configStore.getState().DEFAULT_CIRCLE_RADIUS,
  }
}



export function calcCircleFromTwoPoints(p: vector, q: vector) {
  return {
    center: p,
    radius: p.dist(q)
  };
}



export function calcCircleFromPointAndTangent(p: vector, a: vector, b: vector){
  return {
    center: p,
    radius: distancePointToLine(p, a, b) || 0
  }
}



export function calcCircleFromThreePoints(
  a: vector,
  b: vector,
  c: vector,
) {
    
  const center = findEquidistantCenter(a, b, c);

  const radius = center.dist(a);

  return { center, radius };
}


