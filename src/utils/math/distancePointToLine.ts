import { Tpoint, Tsegment } from "public/entidades";

export function distanceFromPointToLine(point: Tpoint, line: Tsegment) {
    const { x, y } = point.coords;
    const p1 = line.p1.coords;
    const p2 = line.p2.coords;
    const numerator = Math.abs((p2.y - p1.y) * x - (p2.x - p1.x) * y + p2.x * p1.y - p2.y * p1.x);
    const denominator = Math.sqrt((p2.y - p1.y) ** 2 + (p2.x - p1.x) ** 2);
    if(denominator == 0) {
        return null;
    }
    return numerator / denominator;
}