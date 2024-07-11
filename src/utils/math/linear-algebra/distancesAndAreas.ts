import { vec, type vector } from "./vetores";

export {
  areEqualPoints,
  areCollinear,
  onSegment,
  orientation,
  det3x3,
  triangleArea,
  distancePointToLine,
  findEquidistantCenter
};

function areEqualPoints(p: vector, q: vector) {
  return p.x === q.x && p.y === q.y && p.z === q.z;
}

function areCollinear(a: vector, b: vector, c: vector) {
  const area = triangleArea(a, b, c);
  return area === 0 ? true : false;
}

function onSegment(a: vector, p: vector, b: vector): boolean {
  // Check if q is collinear with p and r
  if (!areCollinear(a, p, b)) {
    return false;
  }
  // Now they are collinear, we need to check if q lies within the bounding box of p and r
  return (
    p.x <= Math.max(a.x, b.x) &&
    p.x >= Math.min(a.x, b.x) &&
    p.y <= Math.max(a.y, b.y) &&
    p.y >= Math.min(a.y, b.y)
  );
}

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientation(p: vector, q: vector, r: vector) {
  let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val == 0) return 0; // collinear

  return val > 0 ? 1 : 2; // clock or counterclock wise
}

function det3x3(a: vector, b: vector, c: vector) {
  return (
    a.x * b.y * c.z +
    b.x * c.y * a.z +
    c.x * a.y * b.z -
    a.y * b.x * c.z -
    b.y * c.x * a.z -
    c.y * a.x * b.z
  );
}

function triangleArea(a: vector, b: vector, c: vector) {
  let p1 = vec(a.x, a.y, 1);
  let p2 = vec(b.x, b.y, 1);
  let p3 = vec(c.x, c.y, 1);
  return (1 / 2) * Math.abs(det3x3(p1, p2, p3));
}

function distancePointToLine(
  p: vector,
  a: vector,
  b: vector,
  safeDist = 0.001,
) {
  //the trick is to calculate the area and the base of a trinagle, and divide them to get the height, which is the distance we want if we choose the right base.
  const base = a.dist(b);
  if (base < safeDist) {
    throw new Error(
      "Points on the line are too close, this creates a division by zero.",
    );
    return undefined;
  }
  const area = triangleArea(p, a, b);
  return area / base;
}

function findEquidistantCenter(p1: vector, p2:vector, p3:vector){

  const area =
    0.5 *
    Math.abs(
      p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y),
    );
  if (area < 1e-10) {
    return p1
  }

  // Calculate the midpoints of p1p2 and p2p3
  const mid1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  const mid2 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };

  // Calculate the slopes of the lines perpendicular to p1p2 and p2p3
  const slope1 =
    p2.y - p1.y !== 0 ? -(p2.x - p1.x) / (p2.y - p1.y) : Infinity;
  const slope2 =
    p3.y - p2.y !== 0 ? -(p3.x - p2.x) / (p3.y - p2.y) : Infinity;

  // Calculate the center (intersection of the lines perpendicular to p1p2 and p2p3 passing through midpoints)
  let center: vector;
  if (slope1 === Infinity) {
    center = vec(mid1.x, slope2 * (mid1.x - mid2.x) + mid2.y);
  } else if (slope2 === Infinity) {
    center = vec(mid2.x, slope1 * (mid2.x - mid1.x) + mid1.y);
  } else {
    const centerX =
      (slope1 * mid1.x - slope2 * mid2.x + mid2.y - mid1.y) /
      (slope1 - slope2);
    const centerY = slope1 * (centerX - mid1.x) + mid1.y;
    center = vec(centerX, centerY);
  }

  return center;
}
