import { vec, vector } from "import/utils/math/vetores";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { TallId, Tpoint, TpointId } from "public/entidades";
import { DEFAULT_LINE_WIDTH, RES_FACTOR } from "public/generalConfigs";

const PointsPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, toggleSelection, movePoint } = store;

  return (
    <>
      {Array.from(points.values()).map((point, index) => (
        <PointPreview
          point={point}
          toggleSelection={toggleSelection}
          movePoint={movePoint}
          key={"svg_path_point_" + point.id}
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
};

const PointPreview: React.FC<PointProps> = ({
  point,
  toggleSelection,
  movePoint,
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

  const hitBoxSize = 2;

  return (
    <g filter={point.selected ? "url(#glow)" : "url(#dropshadow"}>
      <path
        key={"svg_path_hitbox_" + point.id}
        d={
          `M ${point.coords.x * RES_FACTOR} ${point.coords.y * RES_FACTOR} ` +
          `m -${hitBoxSize * 0.1 * RES_FACTOR}, 0 ` +
          `a ${hitBoxSize * 0.1 * RES_FACTOR},${
            hitBoxSize * 0.1 * RES_FACTOR
          } 0 1,0 ${hitBoxSize * 0.1 * 2 * RES_FACTOR},0 ` +
          `a ${hitBoxSize * 0.1 * RES_FACTOR},${
            hitBoxSize * 0.1 * RES_FACTOR
          } 0 1,0 -${hitBoxSize * 0.1 * 2 * RES_FACTOR},0`
        }
        stroke={"transparent"}
        strokeWidth={2 * DEFAULT_LINE_WIDTH}
        fill={"transparent"}
        onClick={(event) => {
          event.stopPropagation();
          toggleSelection(point.id);
        }}
        className="cursor-pointer"
      />
      <path
        key={"svg_path_" + point.id}
        d={getPointPath(point)}
        stroke={stroke}
        strokeWidth={DEFAULT_LINE_WIDTH}
        fill={fill}
        className="pointer-events-none"
      />
    </g>
  );
};

export const getPointPath = (point: Tpoint) => {
  const { coords, dotstyle, size } = point;

  if (dotstyle === 0) {
    return "";
  }

  // Calculate the circle path
  const circlePath =
    `M ${coords.x * RES_FACTOR} ${coords.y * RES_FACTOR} ` +
    `m -${size * 0.1 * RES_FACTOR}, 0 ` +
    `a ${size * 0.1 * RES_FACTOR},${size * 0.1 * RES_FACTOR} 0 1,0 ${
      size * 0.1 * 2 * RES_FACTOR
    },0 ` +
    `a ${size * 0.1 * RES_FACTOR},${size * 0.1 * RES_FACTOR} 0 1,0 -${
      size * 0.1 * 2 * RES_FACTOR
    },0`;

  return circlePath;
};
