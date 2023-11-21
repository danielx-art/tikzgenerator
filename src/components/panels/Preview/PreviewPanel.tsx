import {
  getAnglePath,
  getPointPath,
  getSegmentPath,
} from "import/utils/svgPaths";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import { Tangulo, Tsegmento } from "public/entidades";
import { vec } from "public/vetores";
import { useMemo, useRef } from "react";

const PreviewPanel = () => {
  const store = useStore(myStore, (state) => state);

  const viewBox = useMemo(() => {
    if (!store || store.points.length === 0) return "0 0 0 0";

    // Find min and max points to define bounds
    let minX = store.points[0]!.coords.x;
    let maxX = store.points[0]!.coords.x;
    let minY = store.points[0]!.coords.y;
    let maxY = store.points[0]!.coords.y;

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

  const {
    points,
    setPoints,
    segments,
    setSegments,
    angles,
    setAngles,
    selectedPoints,
    setSelectedPoints,
  } = store;

  const toggleSelected = (index: number, kind: string) => {
    switch (kind) {
      case "point":
        const updatedPoints = points.map((point, i) => {
          if (i === index) {
            return { ...point, selected: !point.selected };
          }
          return point;
        });
        setPoints(updatedPoints);
        setSelectedPoints([...updatedPoints].filter((point) => point.selected));
        break;
      case "segment":
        const updatedSegments = segments.map((segment, i) => {
          if (i === index) {
            return { ...segment, selected: !segment.selected };
          }
          return segment;
        });
        setSegments(updatedSegments);
        break;
      case "angle":
        const updatedAngles = angles.map((angle, i) => {
          if (i === index) {
            return { ...angle, selected: !angle.selected };
          }
          return angle;
        });
        setAngles(updatedAngles);
        break;
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col items-center rounded-md border-2 border-c_discrete p-4 sm:max-h-full sm:min-h-full">
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
            {segments.map((segment, index) => (
              <path
                key={index}
                d={getSegmentPath(segment)}
                stroke={segment.selected ? "#ff817a" : "#333333"}
                strokeLinecap="round"
                strokeWidth="0.05"
                fill="none"
                onClick={() => toggleSelected(index, "segment")}
                className="cursor-pointer"
              />
            ))}
            {angles.map((angle, index) => (
              <path
                key={index}
                d={getAnglePath(angle)}
                stroke={angle.selected ? "#ff817a" : "#333333"}
                strokeWidth="0.05"
                fill="none"
                onClick={() => toggleSelected(index, "angle")}
                className="cursor-pointer"
              />
            ))}
            {points.map((point, index) => {
              let stroke = "none";
              let fill = "none";

              if (point.destaque === 1) {
                if (point.selected) {
                  stroke = "#ff817a";
                } else {
                  stroke = "#333333";
                }
                fill = "#f5f5f5";
              } else if (point.destaque === 2) {
                if (point.selected) {
                  fill = "#ff817a";
                } else {
                  fill = "#333333";
                }
              }

              return (
                <path
                  key={index}
                  d={getPointPath(point)}
                  stroke={stroke}
                  strokeWidth="0.05"
                  fill={fill}
                  onClick={() => toggleSelected(index, "point")}
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
