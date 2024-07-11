import myStore, { Action, State } from "import/utils/store/store";
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
        const path = getArcPath(circle, RES_FACTOR_SVG, store);

        if(!path) return;

        return (
          <g
            filter={circle.selected ? "url(#glow)" : "url(#dropshadow"}
            key={"svg_path_circle_group_" + circle.id}
          >
            {/*hitbox*/}
            <path
              id={"hitbox_path_circle_" + circle.id}
              d={path.arcStrokePath}
              stroke="transparent"
              strokeWidth={circle.stroke.width * 3}
              fill="none"
              onClick={(event) => {
                event.stopPropagation();
                toggleSelection(circle.id);
              }}
              className="cursor-pointer"
            />
            {/*sector fill*/
            circle.fill.opacity !== 0 ? <path
              id={"sector_path_circle_" + circle.id}
              d={path.sectorPath}
              stroke="transparent"
              fill={circle.fill.color}
              fillOpacity={circle.fill.opacity}
              mask={getFillMask(circle.fill.style)}
              className="pointer-events-none"
            /> : null}
            {/*radial strokes*/}
            {circle.showRadius ? (
              <path
                id={"radial_paths_circle_" + circle.id}
                d={path.radialStrokesPath}
                stroke={circle.stroke.color}
                strokeWidth={circle.stroke.width}
                strokeDasharray={getStrokeDasharray(circle.stroke.style)}
                strokeLinecap="round"
                fill="none"
                className="pointer-events-none"
              />
            ) : null}
            {/*arc strokes*/}
            <path
              id={"arc_path_circle_" + circle.id}
              d={path.arcStrokePath}
              stroke={circle.stroke.color}
              strokeWidth={circle.stroke.width}
              strokeDasharray={getStrokeDasharray(circle.stroke.style)}
              strokeLinecap="round"
              fill="none"
              className="pointer-events-none"
            />
          </g>
        );
      })}
    </>
  );
};

export default CirclesPreview;

export const getArcPath = (circle: Tcircle, scaleFactor: number, store: State & Action) => {
  let startRadians = (circle.arcStart + circle.arcOffset) * (Math.PI / 180);
  let endRadians = circle.arcEnd == 360 ? (circle.arcEnd - 0.001 + circle.arcOffset) * (Math.PI / 180) : (circle.arcEnd + circle.arcOffset) * (Math.PI / 180);

  const center = ("x" in circle.center ) ? circle.center : circle.center(store);
  const radius = (typeof circle.radius === "number" ) ? circle.radius : circle.radius(store);

  if(!center || !radius) return;

  let x0 = center.x * scaleFactor;
  let y0 = center.y * scaleFactor;
  let x1 =
    (center.x + radius * Math.cos(startRadians)) * scaleFactor;
  let y1 =
    (center.y + radius * Math.sin(startRadians)) * scaleFactor;
  let x2 =
    (center.x + radius * Math.cos(endRadians)) * scaleFactor;
  let y2 =
    (center.y + radius * Math.sin(endRadians)) * scaleFactor;

  let largeArcFlag = circle.arcEnd - circle.arcStart <= 180 ? "0" : "1";
  let sweepFlag = "1"; // Assume clockwise, change to "0" for counterclockwise

  let radialStrokesPath = `M ${x1} ${y1} L ${x0} ${y0} L ${x2} ${y2}`;

  let arcStrokePath = `M ${x1} ${y1} A ${radius * scaleFactor} ${
    radius * scaleFactor
  } 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;

  let sectorPath = `M ${x0} ${y0} L ${x1} ${y1} A ${
    radius * scaleFactor
  } ${
    radius * scaleFactor
  } 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2} Z`;

  const d = { radialStrokesPath, arcStrokePath, sectorPath };

  return d;
};
