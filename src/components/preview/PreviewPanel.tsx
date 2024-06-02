import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { useEffect, useRef, useState } from "react";
import useDimensions from "import/utils/hooks/useDimensions";
import PointsPreview from "./parts/PointsPreview";
import AnglesPreview from "./parts/AnglesPreview";
import SegmentsPreview from "./parts/SegmentsPreview";
import TagsPreview from "./parts/TagsPreview";
import Panel from "../micro/Panel";
import Filters from "./parts/Filters";
import PreviewToolBar from "./previewToolsBar/PreviewToolBar";
import { deselectAll } from "import/utils/storeHelpers/deselectAll";
import PolygonsPreview from "./parts/PolygonsPreview";
import CirclesPreview from "./parts/CirclesPreview";
import PreviewSideBar from "./previewSideBar/PreviewSideBar";
import configStore from "import/utils/store/configStore";
import { calculateSVGDimensions } from "import/utils/misc/calculateSVGDimensions";

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
  const scale = useStore(configStore, (state) => state.TIKZ_SCALE);
  const configs = useStore(configStore, (state) => state);

  const [containerRef, containerDimensions] = useDimensions();
  const [viewBox, setViewBox] = useState("0 0 100 100");
  const [svgDim, setSvgDim] = useState({
    width: 5,
    height: 5,
  });

  useEffect(() => {
    if (!points || !scale || !configs) return;

    const updatedSVGDimensions = calculateSVGDimensions(
      points,
      circles,
      tags,
      configs,
      containerDimensions,
    );

    const { width, height, viewBox } = updatedSVGDimensions;

    setSvgDim({ width: width, height: height });

    setViewBox(`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
  }, [points, circles, tags, scale, configs, containerDimensions]);

  if (!store || !scale) return;

  const transformParam = `scale(${scale}, -${scale})`;

  return (
    <Panel className="relative h-full items-center overflow-hidden p-2">
      <div className="border-b-2 border-b-muted">Prévia</div>
      <PreviewToolBar ref={svgRef} />
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
          className="border-2 border-border border-opacity-30"
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
            <PointsPreview svgRef={svgRef} />
            <TagsPreview />
          </g>
        </svg>
      </div>
    </Panel>
  );
};

export default PreviewPanel;
