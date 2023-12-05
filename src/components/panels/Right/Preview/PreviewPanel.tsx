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
import { getEntityById, getEntityKind } from "import/utils/miscEntity";
import { Tangle, Tpoint, Tsegment } from "public/entidades";
import PointsPreview from "./parts/PointsPreview";
import AnglesPreview from "./parts/AnglesPreview";
import SegmentsPreview from "./parts/SegmentsPreview";
import TagsPreview from "./parts/TagsPreview";

const PreviewPanel = () => {
  const store = useStore(myStore, (state) => state);

  const [ref, dimensions] = useDimensions();

  const svgRef = useRef<SVGSVGElement>(null);

  const [viewBox, setViewBox] = useState("0 0 100 100");
  const [svgDim, setSvgDim] = useState({ width: 200, height: 200 });

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

    let pointsWidth = maxX - minX;
    let pointsHeight = maxY - minY;

    let padding = 0.1; //of the maximum dimension

    if (pointsArr.length == 1 && pointsArr[0]) {
      pointsWidth = pointsArr[0].size * 2;
      pointsHeight = pointsWidth;
      padding = 10;
    }

    const viewAR = pointsWidth / pointsHeight;

    padding =
      viewAR >= 1 ? (padding *= pointsWidth) : (padding *= pointsHeight);

    let viewBoxX = +(minX - padding);
    let viewBoxY = -(maxY + padding);
    let viewBoxWidth = pointsWidth + 2 * padding;
    let viewBoxHeight = pointsHeight + 2 * padding;

    const pixelAR = dimensions.width / dimensions.height;

    if (viewAR >= pixelAR) {
      //image is fatter than container, so image width needs to be cap set to the container width
      //and the image height should be set to keep viewAR
      setSvgDim({
        width: dimensions.width,
        height: dimensions.width / viewAR,
      });
    } else {
      //image is taller than container, so image height should be cap set to container height
      //and image width should be set to keep viewAR
      setSvgDim({
        width: viewAR * dimensions.height,
        height: dimensions.height,
      });
    }

    setViewBox(`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
  }, [store, store?.points, ref, svgRef, dimensions.width, dimensions.height]);

  if (!store) return;

  const {
    points,
    setPoints,
    segments,
    setSegments,
    angles,
    setAngles,
    toggleSelection,
    tags,
  } = store;

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-2 rounded-md border-2 border-c_discrete p-2 pb-3 sm:h-full sm:max-h-full sm:min-h-full">
      <div className="border-b-2 border-b-c_discrete">
        Prévia (SVG) {dimensions.width} {dimensions.height}
      </div>
      <div
        ref={ref}
        className="relative grid h-full max-h-full w-full flex-1 place-items-center overflow-auto"
      >
        <div className="absolute left-0 top-0 h-6 w-6">
          <DownloadSVGBtn svgRef={svgRef} />
        </div>
        <svg
          width={svgDim.width > 0 ? svgDim.width : "100%"}
          height={svgDim.height > 0 ? svgDim.height : "100%"}
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid"
          className="border-2 border-c_disabled2 border-opacity-10"
          ref={svgRef}
        >
          <g transform={`scale(1, -1)`}>
            <SegmentsPreview />
            <AnglesPreview />
            <PointsPreview />
            <TagsPreview />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PreviewPanel;
