import { vec } from "../math/vetores";
import type { Action, State } from "../store/store";

export default function getSegmentsTikzCode(store: State & Action) {
  let tikzCode = "";
  store.segments.forEach((segment) => {
    if (segment.visible) {
      let strokeStyle = segment.stroke.style.split("-")[0];
      tikzCode += `\\draw [${segment.stroke.color}, ${strokeStyle}, line width=${segment.stroke.width}pt, opacity=${segment.stroke.opacity}] (${segment.p1.id}) -- (${segment.p2.id});\n`;
      //DO THE MARKS
      if (segment.marks > 0) {
        const markLength = 0.12 * segment.stroke.width;
        const markSep = 1.2 * segment.stroke.width;
        const midPoint = vec()
          .copy(segment.p1.coords)
          .add(vec().copy(segment.p2.coords));
        const normal = vec()
          .copy(segment.p2.coords)
          .sub(vec().copy(segment.p1.coords))
          .cross(vec(0, 0, 1))
          .setMag(markLength);
        const unitTangent = vec()
          .copy(segment.p2.coords)
          .sub(vec().copy(segment.p1.coords))
          .setMag(1);
        const start = vec()
          .copy(midPoint)
          .add(
            vec()
              .copy(unitTangent)
              .mult((-(segment.marks - 1) * markSep) / 2),
          );
        for (let i = 0; i < segment.marks; i++) {
          const thisMidPoint = vec()
            .copy(start)
            .add(
              vec()
                .copy(unitTangent)
                .mult(i * markSep),
            );
          const point1 = vec().copy(thisMidPoint).add(vec().copy(normal));
          const point2 = vec()
            .copy(thisMidPoint)
            .add(vec().copy(normal).mult(-1));
          tikzCode += `\\draw [${segment.stroke.color}, "solid", line width=${segment.stroke.width}pt, opacity=${segment.stroke.opacity}] (${point1.x}, ${point1.y}) -- (${point2.x}, ${point2.y});\n`;
        }
      }
    }
  });
  return tikzCode;
}
