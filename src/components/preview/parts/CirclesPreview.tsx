import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { DEFAULT_STROKE_WIDTH, RES_FACTOR } from "public/generalConfigs";
import { Tangle, Tcircle } from "public/entidades";
import { vec } from "import/utils/math/vetores";

const CirclesPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { circles, toggleSelection } = store;

  return (
    <>
      {Array.from(circles.values()).map((circle, index) => {
        if (circle.isArc) {
          const arcPath = getArcPath(circle);

          return (
            <g
              filter={circle.selected ? "url(#glow)" : "url(#dropshadow"}
              key={"svg_path_circle_group_" + circle.id}
            >
              <path
                key={"svg_path_circle_" + circle.id}
                d={arcPath}
                stroke={circle.color}
                strokeWidth={circle.width}
                fill="transparent"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleSelection(circle.id);
                }}
                className="cursor-pointer"
              />
            </g>
          );
        } else {
          return (
            <g
              filter={circle.selected ? "url(#glow)" : "url(#dropshadow"}
              key={"svg_path_circle_group_" + circle.id}
            >
              <circle
                cx={circle.center.x * RES_FACTOR}
                cy={circle.center.y * RES_FACTOR}
                r={circle.radius * RES_FACTOR}
                stroke={circle.color}
                strokeWidth={circle.width}
                fill="transparent"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleSelection(circle.id);
                }}
                className="cursor-pointer"
              />
            </g>
          );
        }
      })}
    </>
  );
};

export default CirclesPreview;

export const getArcPath = (circle: Tcircle) => {
  let startRadians = circle.arcStart * (Math.PI / 180);
  let endRadians = circle.arcEnd * (Math.PI / 180);

  let x1 =
    (circle.center.x + circle.radius * Math.cos(startRadians)) * RES_FACTOR;
  let y1 =
    (circle.center.y + circle.radius * Math.sin(startRadians)) * RES_FACTOR;
  let x2 =
    (circle.center.x + circle.radius * Math.cos(endRadians)) * RES_FACTOR;
  let y2 =
    (circle.center.y + circle.radius * Math.sin(endRadians)) * RES_FACTOR;

  let largeArcFlag = circle.arcEnd - circle.arcStart <= 180 ? "0" : "1";
  let sweepFlag = "1"; // Assume clockwise, change to "0" for counterclockwise

  let d = `M ${x1} ${y1} A ${circle.radius * RES_FACTOR} ${
    circle.radius * RES_FACTOR
  } 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;

  return d;
};
