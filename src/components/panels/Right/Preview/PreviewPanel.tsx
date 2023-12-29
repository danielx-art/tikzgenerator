import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { useEffect, useRef, useState } from "react";
import useDimensions from "import/utils/generalHooks/useDimensions";
import DownloadSVGBtn from "./parts/DownloadSVGBtn";
import PointsPreview from "./parts/PointsPreview";
import AnglesPreview from "./parts/AnglesPreview";
import SegmentsPreview from "./parts/SegmentsPreview";
import TagsPreview from "./parts/TagsPreview";
import { RES_FACTOR } from "public/generalConfigs";
import { getKindById, getSelected } from "import/utils/storeHelpers/miscEntity";


const PreviewPanel = () => {
  const store = useStore(myStore, (state) => state);

  const [ref, dimensions] = useDimensions();

  const svgRef = useRef<SVGSVGElement>(null);

  const [viewBox, setViewBox] = useState("0 0 100 100");
  const [svgDim, setSvgDim] = useState({ width: 200*RES_FACTOR, height: 200*RES_FACTOR });

  useEffect(() => {
    if (!store || !store.points || store.points.size === 0) return;

    const pointsArr = Array.from(store.points.values());

    //Find min and max points to define bounds
    let minX = pointsArr[0]!.coords.x*RES_FACTOR;
    let maxX = pointsArr[0]!.coords.x*RES_FACTOR;
    let minY = pointsArr[0]!.coords.y*RES_FACTOR;
    let maxY = pointsArr[0]!.coords.y*RES_FACTOR;

    store.points.forEach((point) => {
      minX = Math.min(minX, point.coords.x*RES_FACTOR);
      maxX = Math.max(maxX, point.coords.x*RES_FACTOR);
      minY = Math.min(minY, point.coords.y*RES_FACTOR);
      maxY = Math.max(maxY, point.coords.y*RES_FACTOR);
    });

    let pointsWidth = maxX - minX;
    let pointsHeight = maxY - minY;

    let padding = 0.2; //of the maximum dimension

    if (pointsArr.length == 1 && pointsArr[0]) {
      pointsWidth = pointsArr[0].size * 2 *RES_FACTOR;
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

  const onClickDeselectAll = () => {
    if(!store) return;

    const selectedPoints = getSelected("point", store);
    const selectedSegments = getSelected("segment", store);
    const selectedAngles = getSelected("angle", store);
    const selectedCircles = getSelected("circle", store);
    const selectedTags = getSelected("tag", store);

    const updatedPoints = new Map(store.points);
    const updatedSegments = new Map(store.segments);
    const updatedAngles = new Map(store.angles);
    // const updatedCircles = new Map(store.circles);
    // const updatedTags = new Map(store.tags);

    selectedPoints.forEach(point => {
      updatedPoints.set(point.id, {...point, selected: false})
    });

    selectedSegments.forEach(seg => {
      updatedSegments.set(seg.id, {...seg, selected: false})
    });

    selectedAngles.forEach(ang => {
      updatedAngles.set(ang.id, {...ang, selected: false})
    });

    // selectedCircles.forEach(circle => {
    //   updatedCircles.set(circle.id, {...circle, selected: false})
    // });

    // selectedTags.forEach(tag => {
    //   updatedTags.set(tag.id, {...tag, selected: false})
    // });
    
    // store.setPoints(updatedPoints);
    // store.setSegments(updatedSegments);
    // store.setAngles(updatedAngles);
    // store.setCircles(updatedCircles);
    // store.setTags(updatedTags);
    store.set({...store, points: updatedPoints, segments: updatedSegments, angles: updatedAngles, selections: [] })

  }

  if (!store) return;

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-2 rounded-md border-2 border-c_discrete p-2 pb-3 sm:h-full sm:max-h-full sm:min-h-full">
      <div className="border-b-2 border-b-c_discrete">Prévia (SVG)</div>
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
          xmlns="http://www.w3.org/2000/svg"
          onClick={onClickDeselectAll}
        >
          <defs>
            <filter
              id="glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              filterUnits="userSpaceOnUse"
            >
              <feFlood
                result="flood"
                flood-color="#ff817a"
                flood-opacity="1"
              ></feFlood>
              <feComposite
                in="flood"
                result="mask"
                in2="SourceGraphic"
                operator="in"
              ></feComposite>
              <feMorphology
                in="mask"
                result="dilated"
                operator="dilate"
                radius="0.1"
              ></feMorphology>
              <feGaussianBlur
                in="dilated"
                result="blurred"
                stdDeviation="0.1"
              ></feGaussianBlur>
              <feComposite
                in="blurred"
                in2="SourceGraphic"
                operator="arithmetic"
                k2="1"
                k3="-1"
                result="nocombine"
              ></feComposite>
              <feMerge>
                <feMergeNode in="nocombine"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>

            <filter id="fatten" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
              <feMorphology operator="dilate" radius="0.1" />
            </filter>
          </defs>
          <g transform={`scale(1, -1)`}>
            <AnglesPreview />
            <SegmentsPreview />
            <PointsPreview />
            <TagsPreview />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PreviewPanel;
