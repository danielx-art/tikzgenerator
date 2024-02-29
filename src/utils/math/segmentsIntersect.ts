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
) {
  // Find the four orientations needed for general and
  // special cases
  let o1 = orientation(p1, q1, p2);
  let o2 = orientation(p1, q1, q2);
  let o3 = orientation(p2, q2, p1);
  let o4 = orientation(p2, q2, q1);

  // General case
  if (o1 != o2 && o3 != o4) return true;

  // Special Cases
  // p1, q1 and p2 are collinear and p2 lies on segment p1q1
  if (o1 == 0 && onSegment(p1, p2, q1)) return true;

  // p1, q1 and q2 are collinear and q2 lies on segment p1q1
  if (o2 == 0 && onSegment(p1, q2, q1)) return true;

  // p2, q2 and p1 are collinear and p1 lies on segment p2q2
  if (o3 == 0 && onSegment(p2, p1, q2)) return true;

  // p2, q2 and q1 are collinear and q1 lies on segment p2q2
  if (o4 == 0 && onSegment(p2, q1, q2)) return true;

  return false; // Doesn't fall in any of the above cases
}
