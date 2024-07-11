import { areEqualPoints, orientation, onSegment } from "./distancesAndAreas";
import { vector } from "./vetores";

export function segmentsIntersect(
  p1: vector,
  q1: vector,
  p2: vector,
  q2: vector,
  EXCLUDE_ENDPOINT_MEETING = true
): boolean {
  // Find the four orientations needed for general and
  // special cases
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);
  
  const p1_equals_p2 = areEqualPoints(p1, p2);
  const p1_equals_q1 = areEqualPoints(p1, q1);
  const p1_equals_q2 = areEqualPoints(p1, q2);
  const q1_equals_p2 = areEqualPoints(q1, p2);
  const q1_equals_q2 = areEqualPoints(q1, q2);
  const p2_equals_q2 = areEqualPoints(p2, q2);


  if (o1 != o2 && o3 != o4) {
    /*
    BETTER EXPLANATION TO MY FUTURE SELF
    If the orientations are different, the segments must intersect,
    However, if they intersect only at one of the endpoints, meaning the two segments share a common endpoint,
    forming a triangle, I shall say they do not intersect, because the segments they are advocating for can 
    be closed to form a loop and so an area, like this:
    x
     \
      \
       \
        x----------x
    */
    if ( 
        EXCLUDE_ENDPOINT_MEETING &&
        (o1 === 0 && (q1_equals_p2 || p1_equals_p2 || p1_equals_q1)) || 
        (o2 === 0 && (q1_equals_q2 || p1_equals_q2 || p1_equals_q1)) ||
        (o3 === 0 && (p1_equals_q2 || p1_equals_p2 || p2_equals_q2)) ||
        (o4 === 0 && (q1_equals_q2 || q1_equals_p2 || p2_equals_q2))
      ) { return false; }
    return true;
  }

  /* 
  If one endpoint of a segment lies in the other segment, collinear to it but inside it, I shall return true,
  because in that way the segments they are advocating for cannot form a proper loop that holds an area, like this:
          x
           \
            \
             \
    x---------x---------x 
  */
  if (o1 == 0 && onSegment(p1, p2, q1) && !(p1_equals_p2 || q1_equals_p2)) return true;
  if (o2 == 0 && onSegment(p1, q2, q1) && !(p1_equals_q2 || q1_equals_q2)) return true;
  if (o3 == 0 && onSegment(p2, p1, q2) && !(p1_equals_p2 || p1_equals_q2)) return true;
  if (o4 == 0 && onSegment(p2, q1, q2) && !(q1_equals_p2 || q1_equals_q2)) return true;

  // Doesn't fall in any of the above cases
  return false;
}
