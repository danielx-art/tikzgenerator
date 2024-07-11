import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { Tpoint, TpointId, Tpolygon } from "public/entidades";
import { getFillMask } from "../helpers";
import configStore from "import/utils/store/configStore";

const PolygonsPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state)=>state);

  if (!store || !configs) return;

  const {RES_FACTOR_SVG} = configs
  const { polygons, points, toggleSelection } = store;

  return (
    <>
      {Array.from(polygons.values()).map((polygon, index) => {
        const polygonPath = getPolygonPath(polygon, points, RES_FACTOR_SVG);

        return (
          <g
            filter={polygon.selected ? "url(#glow)" : "url(#dropshadow"}
            key={"svg_path_polygon_group_" + polygon.id}
          >
            {/*this first is hitbox*/}
            <path
              key={"svg_path_polygon_" + polygon.id}
              d={polygonPath}
              stroke="none"
              fill={"transparent"}
              fillOpacity={0.5}
              onClick={(event) => {
                event.stopPropagation();
                toggleSelection(polygon.id);
              }}
              className="cursor-pointer"
            />
            <path
              key={"svg_path_polygon_fill_" + polygon.id}
              d={polygonPath}
              stroke="none"
              fill={polygon.fill.color}
              fillOpacity={polygon.fill.opacity}
              mask={getFillMask(polygon.fill.style)}
              className="pointer-events-none"
            />
          </g>
        );
      })}
    </>
  );
};

export default PolygonsPreview;

export const getPolygonPath = (polygon: Tpolygon, points: Map<TpointId,Tpoint>, scaleFactor: number) => {
  let d = "M ";

  polygon.vertices.forEach((vertex, index) => {
    const curr = points.get(vertex);
    if(!curr) return;
    if (index === 0) {
      d += `${curr.coords.x * scaleFactor} ${curr.coords.y * scaleFactor} `;
    } else {
      d += `L ${curr.coords.x * scaleFactor} ${curr.coords.y * scaleFactor} `;
    }
  });

  d += "Z";

  return d;
};
