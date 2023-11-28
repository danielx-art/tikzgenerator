import {
  getAnglePath,
  getPointPath,
  getSegmentPath,
} from "import/utils/svgPaths";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import { useMemo } from "react";

const PreviewPanel = () => {
  const store = useStore(myStore, (state) => state);

  const viewBox = useMemo(() => {

    if (!store || !store.points || store.points.size === 0) return "0 0 0 0";

    const pointsArr = Array.from(store.points.values());

    // Find min and max points to define bounds
    let minX = pointsArr[0]!.coords.x;
    let maxX = pointsArr[0]!.coords.x;
    let minY = pointsArr[0]!.coords.y;
    let maxY = pointsArr[0]!.coords.y;

    store.points.forEach((point) => {
      minX = Math.min(minX, point.coords.x);
      maxX = Math.max(maxX, point.coords.x);
      minY = Math.min(minY, point.coords.y);
      maxY = Math.max(maxY, point.coords.y);
    });

    const pointsWidth = maxX - minX;
    const pointsHeight = maxY - minY;

    const padding = 0.1;

    const centroidX = pointsWidth / 2;
    const centroidY = pointsHeight / 2;

    const viewBoxX = minX - pointsWidth * padding;
    const viewBoxY = -maxY - pointsHeight * padding;
    const viewBoxWidth = pointsWidth * (1 + 2 * padding);
    const viewBoxHeight = pointsHeight * (1 + 2 * padding);

    return `${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`;
  }, [store]);

  if (!store) return;

  const { points, setPoints, segments, setSegments, angles, setAngles, toggleSelection } = store;

  return (
    <div className="flex w-full flex-1 flex-col items-center rounded-md border-2 border-c_discrete">
      <div className="border-b-2 border-b-c_discrete">Prévia (SVG)</div>
      <div className="w-full flex-1 overflow-auto">
        <svg
          width="100%"
          height="100%"
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid"
          style={{ border: "1px solid black" }}
        >
          <g transform={`scale(1, -1)`}>
            {Array.from(segments.values()).map((segment, index) => (
              <path
                key={"svg_path_"+segment.id}
                d={getSegmentPath(segment)}
                stroke={segment.selected ? "#ff817a" : "#333333"}
                strokeLinecap="round"
                strokeWidth="0.05"
                fill="none"
                onClick={() => toggleSelection(segment.id)}
                className="cursor-pointer"
              />
            ))}
            {Array.from(angles.values()).map((angle, index) => (
              <path
                key={"svg_path_"+angle.id}
                d={getAnglePath(angle)}
                stroke={angle.selected ? "#ff817a" : "#333333"}
                strokeWidth="0.05"
                fill="none"
                onClick={() => toggleSelection(angle.id)}
                className="cursor-pointer"
              />
            ))}
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
                  key={"svg_path_"+point.id}
                  d={getPointPath(point)}
                  stroke={stroke}
                  strokeWidth="0.05"
                  fill={fill}
                  onClick={() => toggleSelection(point.id)}
                  className="cursor-pointer"
                />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PreviewPanel;
