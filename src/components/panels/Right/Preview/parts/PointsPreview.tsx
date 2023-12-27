import myStore from "import/utils/store/store";
import { getPointPath } from "import/utils/svg/svgPaths";
import useStore from "import/utils/store/useStore";

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
            strokeWidth="0.05"
            fill={fill}
            onClick={() => toggleSelection(point.id)}
            className="cursor-pointer"
            filter={point.selected ? "url(#glow)" : "none"}
          />
        );
      })}
    </>
  );
};

export default PointsPreview;
