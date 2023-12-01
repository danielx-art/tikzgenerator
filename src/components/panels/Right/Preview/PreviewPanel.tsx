import {
  getAnglePath,
  getPointPath,
  getSegmentPath,
} from "import/utils/svgPaths";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import { useEffect, useMemo, useRef, useState } from "react";
import useDimensions from "import/utils/useDimensions";
import DownloadSVGBtn from "./parts/DownloadSVGBtn";

const PreviewPanel = () => {
  const store = useStore(myStore, (state) => state);

  const [ref, dimensions] = useDimensions();

  const svgRef = useRef<SVGSVGElement>(null);

  const [viewBox, setViewBox] = useState("0 0 100 100");
  const [svgDim, setSvgDim] = useState({width: 0, height: 0});

  useEffect(() => {

    if (!store || !store.points || store.points.size === 0) return;
    
    const pointsArr = Array.from(store.points.values());

    //Find min and max points to define bounds
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

    let padding = 0.1; //of the maximum dimension

    const viewAR = pointsWidth / pointsHeight;

    padding = viewAR >= 1 ? padding *= pointsWidth : padding *= pointsHeight;
    
    const viewBoxX = +(minX - padding);
    const viewBoxY = -(maxY + padding);
    const viewBoxWidth = pointsWidth + 2*padding;
    const viewBoxHeight = pointsHeight + 2*padding;
    
    const pixelAR = dimensions.width / dimensions.height;

    if(viewAR >= pixelAR) {
      //image is fatter than container, so image width needs to be cap set to the container width
      //and the image height should be set to keep viewAR
      setSvgDim({
        width: dimensions.width,
        height: dimensions.width/viewAR
      })
    } else {
      //image is taller than container, so image height should be cap set to container height
      //and image width should be set to keep viewAR
      setSvgDim({
        width: viewAR*dimensions.height,
        height: dimensions.height
      })
    }

    setViewBox(`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);

  }, [store, store?.points, ref, svgRef, dimensions.width, dimensions.height]);

  if (!store) return;

  const { points, setPoints, segments, setSegments, angles, setAngles, toggleSelection } = store;

  return (
    <div className="flex w-full flex-1 flex-col items-center rounded-md border-2 border-c_discrete sm:h-full sm:max-h-full sm:min-h-full p-2 pb-3 gap-2">
      <div className="border-b-2 border-b-c_discrete">Prévia (SVG) {dimensions.width} {dimensions.height}</div>
      <div ref={ref} className="grid w-full h-full max-h-full flex-1 overflow-auto place-items-center relative">
        <div className="absolute w-6 h-6 left-0 top-0"><DownloadSVGBtn  svgRef={svgRef}/></div>
        <svg
          width={svgDim.width > 0 ?  svgDim.width : "100%"}
          height={svgDim.height > 0 ? svgDim.height : "100%"}
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid"
          className="border-2 border-c_disabled2 border-opacity-10"
          ref={svgRef}
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
