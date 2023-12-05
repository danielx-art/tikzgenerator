import myStore from "import/utils/store";
import { getPointPath } from "import/utils/svgPaths";
import useStore from "import/utils/useStore";

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
          if (point.selected) {
            stroke = "#ff817a";
          } else {
            stroke = "#333333";
          }
          fill = "#f5f5f5";
        } else if (point.dotstyle === 2) {
          if (point.selected) {
            fill = "#ff817a";
            stroke = "#ff817a";
          } else {
            fill = "#333333";
            stroke = "#333333";
          }
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
          />
        );
      })}
    </>
  );
};

export default PointsPreview;
