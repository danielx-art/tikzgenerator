import { vector } from "import/utils/math/vetores";
import myStore, { State } from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { TallId, Tpoint, TpointId } from "public/entidades";

const PointsPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, toggleSelection, movePoint, configs } = store;

  return (
    <>
      {Array.from(points.values()).map((point, index) => (
        <PointPreview
          point={point}
          toggleSelection={toggleSelection}
          movePoint={movePoint}
          key={"svg_path_point_" + point.id}
          configs={configs}
        />
      ))}
    </>
  );
};

export default PointsPreview;

type PointProps = {
  point: Tpoint;
  toggleSelection: (id: TallId) => void;
  movePoint: (id: TpointId, newPosition: vector) => void;
  configs: State['configs']
};

const PointPreview: React.FC<PointProps> = ({
  point,
  toggleSelection,
  movePoint,
  configs
}) => {
  let stroke = "none";
  let fill = "none";

  if (point.dotstyle === 1) {
    stroke = point.color;
    fill = "#f5f5f5";
  } else if (point.dotstyle === 2) {
    fill = point.color;
    stroke = point.color;
  }

  const hitBoxSize = point.size + 0.2;

  const {RES_FACTOR_SVG, DEFAULT_STROKE_WIDTH} = configs;

  return (
    <g filter={point.selected ? "url(#glow)" : "url(#dropshadow"}>
      <path
        key={"svg_path_hitbox_" + point.id}
        d={
          `M ${point.coords.x * RES_FACTOR_SVG} ${point.coords.y * RES_FACTOR_SVG} ` +
          `m -${hitBoxSize * 0.1 * RES_FACTOR_SVG}, 0 ` +
          `a ${hitBoxSize * 0.1 * RES_FACTOR_SVG},${
            hitBoxSize * 0.1 * RES_FACTOR_SVG
          } 0 1,0 ${hitBoxSize * 0.1 * 2 * RES_FACTOR_SVG},0 ` +
          `a ${hitBoxSize * 0.1 * RES_FACTOR_SVG},${
            hitBoxSize * 0.1 * RES_FACTOR_SVG
          } 0 1,0 -${hitBoxSize * 0.1 * 2 * RES_FACTOR_SVG},0`
        }
        stroke={"transparent"}
        strokeWidth={2 * DEFAULT_STROKE_WIDTH}
        fill={"transparent"}
        onClick={(event) => {
          event.stopPropagation();
          toggleSelection(point.id);
        }}
        className="cursor-pointer"
      />
      <path
        key={"svg_path_" + point.id}
        d={getPointPath(point, RES_FACTOR_SVG)}
        stroke={stroke}
        strokeWidth={DEFAULT_STROKE_WIDTH}
        fill={fill}
        className="pointer-events-none"
      />
    </g>
  );
};

export const getPointPath = (point: Tpoint, scaleFactor: number) => {
  const { coords, dotstyle, size } = point;

  if (dotstyle === 0) {
    return "";
  }

  // Calculate the circle path
  const circlePath =
    `M ${coords.x * scaleFactor} ${coords.y * scaleFactor} ` +
    `m -${size * 0.1 * scaleFactor}, 0 ` +
    `a ${size * 0.1 * scaleFactor},${size * 0.1 * scaleFactor} 0 1,0 ${
      size * 0.1 * 2 * scaleFactor
    },0 ` +
    `a ${size * 0.1 * scaleFactor},${size * 0.1 * scaleFactor} 0 1,0 -${
      size * 0.1 * 2 * scaleFactor
    },0`;

  return circlePath;
};
