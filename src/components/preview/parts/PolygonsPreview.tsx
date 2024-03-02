import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { RES_FACTOR } from "public/generalConfigs";
import { Tpolygon } from "public/entidades";

const PolygonsPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { polygons, toggleSelection } = store;

  return (
    <>
      {Array.from(polygons.values()).map((polygon, index) => {
        const polygonPath = getPolygonPath(polygon);

        return (
          <g
            filter={polygon.selected ? "url(#glow)" : "url(#dropshadow"}
            key={"svg_path_polygon_group_" + polygon.id}
          >
            <path
              key={"svg_path_polygon_" + polygon.id}
              d={polygonPath}
              stroke="none"
              fill={polygon.color}
              fillOpacity={0.5}
              onClick={(event) => {
                event.stopPropagation();
                toggleSelection(polygon.id);
              }}
              className="cursor-pointer"
            />
          </g>
        );
      })}
    </>
  );
};

export default PolygonsPreview;

export const getPolygonPath = (polygon: Tpolygon) => {
  let d = "M ";

  polygon.vertices.forEach((vertex, index) => {
    if (index === 0) {
      d += `${vertex.coords.x*RES_FACTOR} ${vertex.coords.y*RES_FACTOR} `;
    } else {
      d += `L ${vertex.coords.x*RES_FACTOR} ${vertex.coords.y*RES_FACTOR} `;
    }
  });

  d += "Z";

  return d;
};
