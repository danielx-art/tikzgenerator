import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { vec } from "import/utils/math/vetores";
import type { Tsegment } from "public/entidades";
import { getStrokeDasharray } from "../helpers";
import configStore from "import/utils/store/configStore";

const SegmentsPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state)=>state);

  if (!store || !configs) return;

  const {RES_FACTOR_SVG} = configs;
  const { segments, toggleSelection } = store;

  return (
    <>
      {Array.from(segments.values()).map((segment, index) => (
        <g
          filter={segment.selected ? "url(#glow)" : "url(#dropshadow"}
          key={"svg_path_segment_" + segment.id}
        >
          {segment.marks != 0 && (
            <path
              key={"svg_path_" + segment.id + "marks"}
              d={getSegmentMarksPath(segment, RES_FACTOR_SVG)}
              stroke={segment.stroke.color}
              strokeLinecap="round"
              strokeWidth={segment.stroke.width}
              strokeOpacity={segment.stroke.opacity}
              fill="none"
            />
          )}
          <path
            //This is only to increase the hit box
            key={"svg_path_hitbox_" + segment.id}
            d={getSegmentPath(segment, RES_FACTOR_SVG)}
            stroke={"transparent"}
            strokeLinecap="round"
            strokeWidth={3 * segment.stroke.width}
            fill="none"
            onClick={(event) => {
              event.stopPropagation();
              toggleSelection(segment.id);
            }}
            className="cursor-pointer"
          />
          <path
            key={"svg_path_" + segment.id}
            d={getSegmentPath(segment, RES_FACTOR_SVG)}
            stroke={segment.stroke.color}
            strokeWidth={segment.stroke.width}
            strokeDasharray={getStrokeDasharray(segment.stroke.style)}
            strokeLinecap="round"
            strokeOpacity={segment.stroke.opacity}
            fill="none"
            className="pointer-events-none"
          />
        </g>
      ))}
    </>
  );
};

export default SegmentsPreview;

export const getSegmentPath = (segment: Tsegment, scaleFactor: number) => {
  let d = `
  M${segment.p1.coords.x * scaleFactor},${segment.p1.coords.y * scaleFactor} 
  L${segment.p2.coords.x * scaleFactor},${segment.p2.coords.y * scaleFactor} 
  `;
  return d;
};

export const getSegmentMarksPath = (segment: Tsegment, scaleFactor: number) => {
  let d = "";
  if (segment.marks > 0) {
    const markLength = 0.12 * segment.stroke.width;
    const markSep = 1.2 * segment.stroke.width;
    const midPoint = vec()
      .copy(segment.p1.coords)
      .add(vec().copy(segment.p2.coords))
      .mult(scaleFactor / 2);
    const normal = vec()
      .copy(segment.p2.coords)
      .sub(vec().copy(segment.p1.coords))
      .cross(vec(0, 0, 1))
      .setMag(markLength * scaleFactor);
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
      const point2 = vec().copy(thisMidPoint).add(vec().copy(normal).mult(-1));
      d += ` M${point1.x},${point1.y} L${point2.x},${point2.y} `;
    }
  }
  return d;
};
