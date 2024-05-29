import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { Tcircle } from "public/entidades";
import { getFillMask, getStrokeDasharray } from "../helpers";
import configStore from "import/utils/store/configStore";

const CirclesPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state) => state);

  if (!store || !configs) return;

  const { RES_FACTOR_SVG } = configs;
  const { circles, toggleSelection } = store;

  return (
    <>
      {Array.from(circles.values()).map((circle, index) => {
        if (true) {
          const arcPath = getArcPath(circle, RES_FACTOR_SVG);

          return (
            <g
              filter={circle.selected ? "url(#glow)" : "url(#dropshadow"}
              key={"svg_path_circle_group_" + circle.id}
            >
              <path
                key={"svg_path_circle_" + circle.id}
                d={arcPath}
                stroke="transparent"
                strokeWidth={circle.stroke.width * 3}
                fill="none"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleSelection(circle.id);
                }}
                className="cursor-pointer"
              />
              <path
                key={"svg_path_circle_" + circle.id}
                d={arcPath}
                stroke="none"
                fill={circle.fill.color}
                mask={getFillMask(circle.fill.style)}
                className="pointer-events-none"
              />
              <path
                key={"svg_path_circle_" + circle.id}
                d={arcPath}
                stroke={circle.stroke.color}
                strokeWidth={circle.stroke.width}
                strokeDasharray={getStrokeDasharray(circle.stroke.style)}
                strokeLinecap="round"
                fill="none"
                className="pointer-events-none"
              />
            </g>
          );
        } else {
          return (
            <g
              filter={circle.selected ? "url(#glow)" : "url(#dropshadow"}
              key={"svg_path_circle_group_" + circle.id}
            >
              {/*this first is hitbox*/}
              <circle
                cx={circle.center.x * RES_FACTOR_SVG}
                cy={circle.center.y * RES_FACTOR_SVG}
                r={circle.radius * RES_FACTOR_SVG}
                stroke={"transparent"}
                strokeWidth={circle.stroke.width * 3}
                fill="none"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleSelection(circle.id);
                }}
                className="cursor-pointer"
              />

              <circle
                cx={circle.center.x * RES_FACTOR_SVG}
                cy={circle.center.y * RES_FACTOR_SVG}
                r={circle.radius * RES_FACTOR_SVG}
                fill={circle.fill.color}
                fillOpacity={circle.fill.opacity}
                mask={getFillMask(circle.fill.style)}
                className="pointer-events-none"
              />
              <circle
                cx={circle.center.x * RES_FACTOR_SVG}
                cy={circle.center.y * RES_FACTOR_SVG}
                r={circle.radius * RES_FACTOR_SVG}
                stroke={circle.stroke.color}
                strokeWidth={circle.stroke.width}
                strokeDasharray={getStrokeDasharray(circle.stroke.style)}
                strokeLinecap="round"
                fill="none"
                className="pointer-events-none"
              />
            </g>
          );
        }
      })}
    </>
  );
};

export default CirclesPreview;

export const getArcPath = (circle: Tcircle, scaleFactor: number) => {
  let startRadians = (circle.arcStart + circle.arcOffset) * (Math.PI / 180);
  let endRadians = (circle.arcEnd + circle.arcOffset) * (Math.PI / 180);

  let x1 =
    (circle.center.x + circle.radius * Math.cos(startRadians)) * scaleFactor;
  let y1 =
    (circle.center.y + circle.radius * Math.sin(startRadians)) * scaleFactor;
  let x2 =
    (circle.center.x + circle.radius * Math.cos(endRadians)) * scaleFactor;
  let y2 =
    (circle.center.y + circle.radius * Math.sin(endRadians)) * scaleFactor;

  let largeArcFlag = circle.arcEnd - circle.arcStart <= 180 ? "0" : "1";
  let sweepFlag = "1"; // Assume clockwise, change to "0" for counterclockwise

  let d = `M ${circle.center.x * scaleFactor} ${
    circle.center.y * scaleFactor
  } L ${x1} ${y1} A ${circle.radius * scaleFactor} ${
    circle.radius * scaleFactor
  } 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2} Z`;

  return d;
};
