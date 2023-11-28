import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import { type Tpoint, type Tsegment, segmento } from "public/entidades";
import { useState } from "react";
import ItemsList from "../parts/ItemsList";
import SegmentItem from "../parts/SegmentItem";
import ToolTip from "import/components/micro/ToolTip";

export default function SegmentsTab() {
  const store = useStore(myStore, (state) => state);
  const [cyclic, setCyclic] = useState(false);

  if (!store) return;

  const { points, segments, setSegments, generateId } = store;

  const conectPoints = () => {
    const selectedPoints = Array.from(points.values()).filter((point) => point.selected);
    const updatedSegments = new Map(segments);

    for (let i = 0; i < selectedPoints.length - 1; i++) {
      const pA = selectedPoints[i] as Tpoint;
      const pB = selectedPoints[i + 1] as Tpoint;
      const newSegId = generateId("segment");
      const newSeg = segmento(pA, pB, newSegId);
      updatedSegments.set(newSegId, newSeg);
    }

    if (cyclic) {
      const closingSegId = generateId("segment");
      const lastPoint = selectedPoints[selectedPoints.length - 1] as Tpoint;
      const firstPoint = selectedPoints[0] as Tpoint;
      const closingSeg = segmento(lastPoint, firstPoint, closingSegId);
      updatedSegments.set(closingSegId, closingSeg);
    }

    setSegments(updatedSegments);
  };

  return (
    <div className="relative flex flex-1 flex-col flex-nowrap justify-between gap-2">
      {/* <div className="rounded-sm p-2 text-sm text-c_scnd2 ">
        Selecione dois ou mais pontos na aba "Pontos" e clique em "Conectar!".
        Múltiplos pontos serão conectados na ordem que estão na lista.
      </div> */}
      <button
        className="mb-2 w-fit self-center  rounded-sm bg-c_interact px-4 py-2 text-c_base outline-1 hover:bg-c_high1"
        onClick={conectPoints}
      >
        Conectar!
      </button>
      <div className="absolute right-0 text-c_scnd2 text-opacity-50">
        <ToolTip
          message={
            "Selecione dois ou mais pontos na aba 'Pontos' e clique em 'Conectar!'. Múltiplos pontos serão conectados na ordem que estão na lista."
          }
        />
      </div>
      <ItemsList>
        {Array.from(segments.values()).map((segment, index) => (
          <SegmentItem
            segment={segment}
            index={index}
            key={"list_item_" + segment.id}
          />
        ))}
      </ItemsList>
      {/* <AutoTagSegments /> */}
    </div>
  );
}
