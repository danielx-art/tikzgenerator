import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { vec } from "import/utils/math/vetores";
import { Tsegment } from "public/entidades";
import { RES_FACTOR } from "public/generalConfigs";

const SegmentsPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { segments, toggleSelection } = store;

  const getStrokeDasharray = (style: string) => {
    switch (style) {
      case "solid":
        return "";
      case "dashed":
        return "0.5, 1";
      case "dotted":
        return "0.01, 1";
      default:
        return "";
    }
  };

  return (
    <>
      {Array.from(segments.values()).map((segment, index) => (
        <g filter={segment.selected ? "url(#glow)" : "none"}>
          {segment.marks != 0 && (
            <path
              key={"svg_path_" + segment.id + "marks"}
              d={getSegmentMarksPath(segment)}
              stroke={segment.color}
              strokeLinecap="round"
              strokeWidth={segment.width}
              fill="none"
              // onClick={() => toggleSelection(segment.id)}
              // className="cursor-pointer"
            />
          )}
          <path
            key={"svg_path_" + segment.id}
            d={getSegmentPath(segment)}
            stroke={segment.color}
            strokeLinecap="round"
            strokeWidth={segment.width}
            fill="none"
            onClick={(event) => {event.stopPropagation(); toggleSelection(segment.id)}}

            className="cursor-pointer"
            strokeDasharray={getStrokeDasharray(segment.style)}
          />
        </g>
      ))}
    </>
  );
};

export default SegmentsPreview;

export const getSegmentPath = (segment: Tsegment) => {
  let d = `
  M${segment.p1.coords.x * RES_FACTOR},${segment.p1.coords.y * RES_FACTOR} 
  L${segment.p2.coords.x * RES_FACTOR},${segment.p2.coords.y * RES_FACTOR} 
  `;
  return d;
};

export const getSegmentMarksPath = (segment: Tsegment) => {
  let d = "";
  if (segment.marks > 0) {
    const markLength = 0.12 * segment.width;
    const markSep = 1.2 * segment.width;
    const midPoint = vec()
      .copy(segment.p1.coords)
      .add(vec().copy(segment.p2.coords))
      .mult(RES_FACTOR / 2);
    const normal = vec()
      .copy(segment.p2.coords)
      .sub(vec().copy(segment.p1.coords))
      .cross(vec(0, 0, 1))
      .setMag(markLength * RES_FACTOR);
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
