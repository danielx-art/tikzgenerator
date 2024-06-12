import useDraggableOnSVG, {
  DragState,
} from "import/utils/hooks/useDraggableOnSVG";
import { vec, vector } from "import/utils/math/vetores";
import configStore, { type ConfigState } from "import/utils/store/configStore";
import myStore, { State } from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { getSelected } from "import/utils/storeHelpers/entityGetters";
import { TallId, Tpoint, TpointId } from "public/entidades";
import { useCallback, useEffect } from "react";

type PropsType = {
  svgRef: React.RefObject<SVGSVGElement>;
};

const PointsPreview: React.FC<PropsType> = ({ svgRef }) => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state) => state);

  const onDragCallback = useCallback(
    (isDragging: boolean, currentDrag: DragState | null) => {
      if (!store || !configs) return;
      const selectedPoints = getSelected("point", store);

      selectedPoints.forEach((point) => {
        const diff = currentDrag?.diff || { x: 0, y: 0 };
        const newPos = vec()
          .copy(point.coords)
          .add(
            vec(diff.x, -diff.y).div(
              configs.RES_FACTOR_SVG * configs.PREVIEW_SCALE,
            ),
          );

        if (isDragging) {
          store.movePoint(point.id, newPos, true);
        } else {
          store.movePoint(point.id, newPos, false);
        }
      });
    },
    [store, configs, store?.selections],
  );

  useDraggableOnSVG(svgRef, onDragCallback);

  if (!store || !configs) return;

  const { points, toggleSelection } = store;

  return (
    <>
      {Array.from(points.values()).map((point, index) => (
        <PointPreview
          point={point}
          toggleSelection={toggleSelection}
          //movePoint={movePoint}
          key={"svg_path_point_" + point.id}
          configs={configs}
          //dragState={currentDrag}
        />
      ))}
    </>
  );
};

export default PointsPreview;

type PointProps = {
  point: Tpoint;
  toggleSelection: (id: TallId) => void;
  //movePoint: ((id: `point_${number}`, newPosition: vector) => void),
  configs: ConfigState;
  //dragState: DragState
};

const PointPreview: React.FC<PointProps> = ({
  point,
  toggleSelection,
  //movePoint,
  configs,
  //dragState
}) => {
  let stroke = "none";
  let fill = "none";

  if (point.dotstyle === 1) {
    stroke = point.color;
    fill = "#f5f5f5";
  } else if (point.dotstyle === 2) {
    fill = point.color;
    stroke = point.color;
  }

  const hitBoxSize = point.size + 0.2;

  const { RES_FACTOR_SVG, DEFAULT_STROKE_WIDTH } = configs;

  //DRAW GHOST POINT POSITION, OR CHANGE ITS POSITION, BASED ON DRAGSTATE

  return (
    <g filter={point.selected ? "url(#glow)" : "url(#dropshadow"}>
      <path
        key={"svg_path_hitbox_" + point.id}
        d={
          `M ${point.coords.x * RES_FACTOR_SVG} ${
            point.coords.y * RES_FACTOR_SVG
          } ` +
          `m -${hitBoxSize * 0.1 * RES_FACTOR_SVG}, 0 ` +
          `a ${hitBoxSize * 0.1 * RES_FACTOR_SVG},${
            hitBoxSize * 0.1 * RES_FACTOR_SVG
          } 0 1,0 ${hitBoxSize * 0.1 * 2 * RES_FACTOR_SVG},0 ` +
          `a ${hitBoxSize * 0.1 * RES_FACTOR_SVG},${
            hitBoxSize * 0.1 * RES_FACTOR_SVG
          } 0 1,0 -${hitBoxSize * 0.1 * 2 * RES_FACTOR_SVG},0`
        }
        stroke={"transparent"}
        strokeWidth={2 * DEFAULT_STROKE_WIDTH}
        fill={"transparent"}
        onClick={(event) => {
          event.stopPropagation();
          toggleSelection(point.id);
        }}
        className="cursor-pointer"
      />
      <path
        key={"svg_path_" + point.id}
        d={getPointPath(point, RES_FACTOR_SVG)}
        stroke={stroke}
        strokeWidth={DEFAULT_STROKE_WIDTH}
        fill={fill}
        className="pointer-events-none"
      />
    </g>
  );
};

export const getPointPath = (point: Tpoint, scaleFactor: number) => {
  const { coords, dotstyle, size } = point;

  if (dotstyle === 0) {
    return "";
  }

  // Calculate the circle path
  const circlePath =
    `M ${coords.x * scaleFactor} ${coords.y * scaleFactor} ` +
    `m -${size * 0.1 * scaleFactor}, 0 ` +
    `a ${size * 0.1 * scaleFactor},${size * 0.1 * scaleFactor} 0 1,0 ${
      size * 0.1 * 2 * scaleFactor
    },0 ` +
    `a ${size * 0.1 * scaleFactor},${size * 0.1 * scaleFactor} 0 1,0 -${
      size * 0.1 * 2 * scaleFactor
    },0`;

  return circlePath;
};
