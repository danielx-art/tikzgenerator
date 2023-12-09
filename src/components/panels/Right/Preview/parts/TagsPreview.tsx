import { getEntityById, getEntityKind } from "import/utils/miscEntity";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import { Tangle, Tpoint, Tsegment } from "public/entidades";
import { useState } from "react";

const TagsPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  const [textSize, setTextSize] = useState(0.3);

  if (!store) return;

  const { tags } = store;

  const textSizeStyle = `text-[${textSize}px]`;

  return (
    <>
      {Array.from(tags.values()).map((tag) => {
        const ent = getEntityById(tag.entityId, store);
        if (!ent) return;
        const entityKind = getEntityKind(ent) as "point" | "segment" | "angle";
        let x = 0;
        let y = 0;
        const DISTANCE_FACTOR = 0.35;
        switch (entityKind) {
          case "point": {
            const point = ent as Tpoint;
            x = point.coords.x + tag.pos.x * DISTANCE_FACTOR;
            y = point.coords.y + tag.pos.y * DISTANCE_FACTOR;
            y *= -1;
            break;
          }
          case "segment": {
            const seg = ent as Tsegment;
            x =
              (seg.p1.coords.x + seg.p2.coords.x) / 2 +
              tag.pos.x * DISTANCE_FACTOR;
            y =
              (seg.p1.coords.y + seg.p2.coords.y) / 2 +
              tag.pos.y * DISTANCE_FACTOR;
            y *= -1;
            break;
          }
          case "angle": {
            const ang = ent as Tangle;
            x = ang.b.coords.x + tag.pos.x * DISTANCE_FACTOR;
            y = ang.b.coords.y + tag.pos.y * DISTANCE_FACTOR;
            y *= -1;
            break;
          }
          default: {
            console.log("this aint no point, segment or angle!");
            break;
          }
        }

        return (
          <g key={"svg_path_" + tag.id} transform={`scale(1, -1)`}>
            <text x={x} y={y} className={textSizeStyle} dominant-baseline="middle" text-anchor="middle">
              {tag.value}
            </text>
          </g>
        );
      })}
    </>
  );
};

export default TagsPreview;

