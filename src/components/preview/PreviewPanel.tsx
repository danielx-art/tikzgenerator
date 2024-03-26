import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { useEffect, useRef, useState } from "react";
import useDimensions from "import/utils/hooks/useDimensions";
import PointsPreview from "./parts/PointsPreview";
import AnglesPreview from "./parts/AnglesPreview";
import SegmentsPreview from "./parts/SegmentsPreview";
import TagsPreview from "./parts/TagsPreview";
import { DEFAULT_POINT_SIZE, RES_FACTOR } from "public/generalConfigs";
import Panel from "../micro/Panel";
import Filters from "./parts/Filters";
import PreviewNav from "./previewNavBar/PreviewNav";
import { deselectAll } from "import/utils/storeHelpers/deselectAll";
import PolygonsPreview from "./parts/PolygonsPreview";
import CirclesPreview from "./parts/CirclesPreview";
import PreviewSideBar from "./previewSideBar/PreviewSideBar";

const PreviewPanel = () => {
  const svgRef = useRef<SVGSVGElement>(null); //this is to save the png image
  const store = useStore(myStore, (state) => state); //for selecting / deselecting

  /*
  Dimensions depend mostly on points, circles and tags.
  Segments, angles and polygons should be already taken care of because 
  they all actually just depend deep down on the point positions and sizes.
  Also, we should take care of the scale (for the latex tikz picture).
  */
  const points = useStore(myStore, (state) => state.points);
  const circles = useStore(myStore, (state) => state.circles);
  const tags = useStore(myStore, (state) => state.tags);
  const scale = useStore(myStore, (state) => state.scale);

  const [containerRef, containerDimensions] = useDimensions();
  const [viewBox, setViewBox] = useState("0 0 100 100");
  const [svgDim, setSvgDim] = useState({
    width: 100,
    height: 100,
  });

  useEffect(() => {
    if (!points || !scale) return;

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    points.forEach((point) => {
      minX = Math.min(minX, point.coords.x);
      maxX = Math.max(maxX, point.coords.x);
      minY = Math.min(minY, point.coords.y);
      maxY = Math.max(maxY, point.coords.y);
    });

    if (circles && circles.size > 0) {
      circles.forEach((circle) => {
        const cLeft = circle.center.x - circle.radius;
        if (cLeft < minX) minX = cLeft;

        const cTop = circle.center.y + circle.radius;
        if (cTop > maxY) maxY = cTop;

        const cRight = circle.center.x + circle.radius;
        if (cRight > maxX) maxX = cRight;

        const cBottom = circle.center.y - circle.radius;
        if (cBottom < minY) minY = cBottom;
      });
    }

    if (tags && tags.size > 0) {
      tags.forEach((tag) => {
        /*
        WIP tag logic here. Now the (global) tag position is calculated in TagsPreview, 
        accessing each tag entity and them using it together with the relative tag.position
        to calculate the global tah position.
        This is NOT a good way of doing this. I should make a get method
        in the tag entity itself that calculates this, together with the 
        anchor point of the tag based on the kind of entity, them when changing the tag position
        this remains unaltered.
        */
      });
    }

    //avoid infinities
    if (minX === Infinity) minX = 0;
    if (maxX === -Infinity) maxX = 100;
    if (minY === Infinity) minY = 0;
    if (maxY === -Infinity) maxY = 100;

    let properWidth = maxX - minX;
    let properHeight = maxY - minY;

    let padding = 0.5 / scale; //of the maximum dimension

    if (points.size === 1 && (properWidth === 0 || properHeight === 0)) {
      const onepoint = Array.from(points.values())[0];
      const onesize = onepoint ? onepoint.size : DEFAULT_POINT_SIZE;
      //center the point
      minX -= onesize / 2;
      maxY += onesize / 2;

      properWidth = onesize;
      properHeight = properWidth;
      padding = 2;
    }

    const viewAR = properWidth / properHeight;

    //rescale
    minX *= RES_FACTOR * scale;
    maxX *= RES_FACTOR * scale;
    minY *= RES_FACTOR * scale;
    maxY *= RES_FACTOR * scale;
    properWidth *= RES_FACTOR * scale;
    properHeight *= RES_FACTOR * scale;

    padding =
      viewAR >= 1 ? (padding *= properWidth) : (padding *= properHeight);

    let viewBoxX = +(minX - padding);
    let viewBoxY = -(maxY + padding);
    let viewBoxWidth = properWidth + 2 * padding;
    let viewBoxHeight = properHeight + 2 * padding;

    const pixelAR = containerDimensions.width / containerDimensions.height;

    if (viewAR >= pixelAR) {
      //image is fatter than container, so image width needs to be cap set to the container width
      //and the image height should be set to keep viewAR
      setSvgDim({
        width: containerDimensions.width,
        height: containerDimensions.width / viewAR,
      });
    } else {
      //image is taller than container, so image height should be cap set to container height
      //and image width should be set to keep viewAR
      setSvgDim({
        width: viewAR * containerDimensions.height,
        height: containerDimensions.height,
      });
    }

    setViewBox(`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
  }, [points, circles, tags, scale, RES_FACTOR, containerDimensions]);

  if (!store || !scale) return;

  const transformParam = `scale(${scale}, -${scale})`;

  return (
    <Panel className="relative h-full items-center overflow-hidden p-2">
      <div className="border-b-2 border-b-c_discrete">Prévia</div>
      <PreviewNav ref={svgRef} />
      <PreviewSideBar />
      <div
        ref={containerRef}
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
          <g transform={transformParam}>
            <Filters />
            <PolygonsPreview />
            <CirclesPreview />
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
