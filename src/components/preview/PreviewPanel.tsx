import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { useEffect, useRef, useState } from "react";
import useDimensions from "import/utils/hooks/useDimensions";
import PointsPreview from "./parts/PointsPreview";
import AnglesPreview from "./parts/AnglesPreview";
import SegmentsPreview from "./parts/SegmentsPreview";
import TagsPreview from "./parts/TagsPreview";
import { RES_FACTOR } from "public/generalConfigs";
import Panel from "../micro/Panel";
import Filters from "./parts/Filters";
import PreviewNav from "./previewNavBar/PreviewNav";
import { deselectAll } from "import/utils/storeHelpers/deselectAll";

const PreviewPanel = () => {
  const store = useStore(myStore, (state) => state);

  const [ref, dimensions] = useDimensions();

  const svgRef = useRef<SVGSVGElement>(null);

  const [viewBox, setViewBox] = useState("0 0 100 100");
  const [svgDim, setSvgDim] = useState({
    width: 10 * RES_FACTOR,
    height: 10 * RES_FACTOR,
  });

  useEffect(() => {
    if (!store || !store.points || store.points.size === 0) return;

    const pointsArr = Array.from(store.points.values());

    //Find min and max points to define bounds
    let minX = pointsArr[0]!.coords.x * RES_FACTOR;
    let maxX = pointsArr[0]!.coords.x * RES_FACTOR;
    let minY = pointsArr[0]!.coords.y * RES_FACTOR;
    let maxY = pointsArr[0]!.coords.y * RES_FACTOR;

    store.points.forEach((point) => {
      minX = Math.min(minX, point.coords.x * RES_FACTOR);
      maxX = Math.max(maxX, point.coords.x * RES_FACTOR);
      minY = Math.min(minY, point.coords.y * RES_FACTOR);
      maxY = Math.max(maxY, point.coords.y * RES_FACTOR);
    });

    let pointsWidth = maxX - minX;
    let pointsHeight = maxY - minY;

    let padding = 0.2; //of the maximum dimension

    if (pointsArr.length == 1 && pointsArr[0]) {
      pointsWidth = ((pointsArr[0].size * 1) / 2) * RES_FACTOR;
      pointsHeight = pointsWidth;
      padding = 2;
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

  return (
    <Panel className="h-full items-center p-2">
      <div className="border-b-2 border-b-c_discrete">Prévia (SVG)</div>
      <PreviewNav ref={svgRef} />
      <div
        ref={ref}
        className="grid max-h-full flex-1 place-items-center overflow-hidden"
      >
        <svg
          width={svgDim.width > 0 ? svgDim.width : "100%"}
          height={svgDim.height > 0 ? svgDim.height : "100%"}
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid"
          className="border-2 border-c_disabled2 border-opacity-30"
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => deselectAll(store)}
        >
          <g transform={`scale(1, -1)`}>
            <Filters />
            <AnglesPreview />
            <SegmentsPreview />
            <PointsPreview />
            <TagsPreview />
          </g>
        </svg>
      </div>
    </Panel>
  );
};

export default PreviewPanel;
