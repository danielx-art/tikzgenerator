import type { Tpoint } from "public/entidades";

export function onSegment(p: Tpoint, r: Tpoint, c: Tpoint) {
  if (
    c.coords.x <= Math.max(p.coords.x, r.coords.x) &&
    c.coords.x >= Math.min(p.coords.x, r.coords.x) &&
    c.coords.y <= Math.max(p.coords.y, r.coords.y) &&
    c.coords.y >= Math.min(p.coords.y, r.coords.y)
  )
    return true;

  return false;
}

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise
export function orientation(p: Tpoint, q: Tpoint, r: Tpoint) {
  let val =
    (q.coords.y - p.coords.y) * (r.coords.x - q.coords.x) -
    (q.coords.x - p.coords.x) * (r.coords.y - q.coords.y);

  if (val == 0) return 0; // collinear

  return val > 0 ? 1 : 2; // clock or counterclock wise
}

export function segmentsIntersect(
  p1: Tpoint,
  q1: Tpoint,
  p2: Tpoint,
  q2: Tpoint,
): boolean {
  // Find the four orientations needed for general and
  // special cases
  let o1 = orientation(p1, q1, p2);
  let o2 = orientation(p1, q1, q2);
  let o3 = orientation(p2, q2, p1);
  let o4 = orientation(p2, q2, q1);

  // General case - excluding end point intersections
  if (o1 != o2 && o3 != o4) {
    // Check if the intersection is only at endpoints
    if ((o1 === 0 && (p2 === q1 || p2 === p1)) || 
        (o2 === 0 && (q2 === q1 || q2 === p1)) ||
        (o3 === 0 && (p1 === q2 || p1 === p2)) ||
        (o4 === 0 && (q1 === q2 || q1 === p2))) {

      return false;
    }
    return true;
  }

  // Special Cases - excluding intersections only at endpoints
  if (o1 == 0 && onSegment(p1, p2, q1) && !(p2 === p1 || p2 === q1)) return true;
  if (o2 == 0 && onSegment(p1, q2, q1) && !(q2 === p1 || q2 === q1)) return true;
  if (o3 == 0 && onSegment(p2, p1, q2) && !(p1 === p2 || p1 === q2)) return true;
  if (o4 == 0 && onSegment(p2, q1, q2) && !(q1 === p2 || q1 === q2)) return true;

  // Doesn't fall in any of the above cases
  return false;
}
