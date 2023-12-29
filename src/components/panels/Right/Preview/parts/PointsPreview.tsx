import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { Tpoint } from "public/entidades";
import { DEFAULT_LINE_WIDTH, RES_FACTOR } from "public/generalConfigs";

const PointsPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, toggleSelection } = store;

  return (
    <>
      {Array.from(points.values()).map((point, index) => {
        let stroke = "none";
        let fill = "none";

        if (point.dotstyle === 1) {
          stroke = point.color;
          fill = "#f5f5f5";
        } else if (point.dotstyle === 2) {
          fill = point.color;
          stroke = point.color;
        }

        return (
          <path
            key={"svg_path_" + point.id}
            d={getPointPath(point)}
            stroke={stroke}
            strokeWidth={DEFAULT_LINE_WIDTH}
            fill={fill}
            onClick={(event) => {event.stopPropagation(); toggleSelection(point.id)}}

            className="cursor-pointer"
            filter={point.selected ? "url(#glow)" : "none"}
          />
        );
      })}
    </>
  );
};

export default PointsPreview;

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
