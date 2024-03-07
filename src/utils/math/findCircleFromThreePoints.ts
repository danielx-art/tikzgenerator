import { vec, type vector } from "./vetores";

export function findCircleFromThreePoints(
  p1: vector,
  p2: vector,
  p3: vector,
): { center: vector; radius: number } | null {
  const area =
    0.5 *
    Math.abs(
      p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y),
    );
  if (area < 1e-10) {
    return null;
  }

  // Calculate the midpoints of p1p2 and p2p3
  const mid1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  const mid2 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };

  // Calculate the slopes of the lines perpendicular to p1p2 and p2p3
  const slope1 = p2.y - p1.y !== 0 ? -(p2.x - p1.x) / (p2.y - p1.y) : Infinity;
  const slope2 = p3.y - p2.y !== 0 ? -(p3.x - p2.x) / (p3.y - p2.y) : Infinity;

  // Calculate the center (intersection of the lines perpendicular to p1p2 and p2p3 passing through midpoints)
  let center: vector;
  if (slope1 === Infinity) {
    center = vec(mid1.x, slope2 * (mid1.x - mid2.x) + mid2.y);
  } else if (slope2 === Infinity) {
    center = vec(mid2.x, slope1 * (mid2.x - mid1.x) + mid1.y);
  } else {
    const centerX =
      (slope1 * mid1.x - slope2 * mid2.x + mid2.y - mid1.y) / (slope1 - slope2);
    const centerY = slope1 * (centerX - mid1.x) + mid1.y;
    center = vec(centerX, centerY);
  }

  const radius = Math.sqrt((center.x - p1.x) ** 2 + (center.y - p1.y) ** 2);

  return { center, radius };
}
