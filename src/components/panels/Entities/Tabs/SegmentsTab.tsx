import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import { type Tponto, type Tsegmento, segmento } from "public/entidades";
import { useState } from "react";
import ItemsList from "../parts/ItemsList";
import SegmentItem from "../parts/SegmentItem";
import AutoTagSegments from "../parts/AutoTagSegments";

export default function SegmentsTab() {
  const store = useStore(myStore, (state) => state);
  const [cyclic, setCyclic] = useState(false);

  if (!store) return;

  const { points, segments, setSegments, generateId } = store;

  const conectPoints = () => {
    const selectedPoints = points.filter((point) => point.selected);
    let segmentsToAdd = [] as Tsegmento[];

    for (let i = 0; i < selectedPoints.length - 1; i++) {
      const pA = selectedPoints[i] as Tponto;
      const pB = selectedPoints[i + 1] as Tponto;
      const newSegId = generateId("segment");
      const newSeg = segmento(pA, pB, newSegId);
      segmentsToAdd.push(newSeg);
    }

    if (cyclic) {
      const closingSegId = generateId("segment");
      const lastPoint = selectedPoints[selectedPoints.length - 1] as Tponto;
      const firstPoint = selectedPoints[0] as Tponto;
      const closingSeg = segmento(lastPoint, firstPoint, closingSegId);
      segmentsToAdd.push(closingSeg);
    }

    const updatedSegments = [...segments, ...segmentsToAdd];
    setSegments(updatedSegments);
  };

  return (
    <div className="flex flex-1 flex-col flex-nowrap justify-between gap-2">
      <div className="rounded-sm p-2 text-sm text-c_scnd2 ">
        Selecione dois ou mais pontos na aba "Pontos" e clique em "Conectar!".
        Múltiplos pontos serão conectados na ordem que estão na lista.
      </div>
      <button
        className="mb-2 w-fit self-center rounded-sm bg-c_interact hover:bg-c_high1 px-4 py-2 text-c_base outline-1"
        onClick={conectPoints}
      >
        Conectar!
      </button>
      <ItemsList>
        {segments.map((segment, index) => (
          <SegmentItem
            segment={segment}
            index={index}
            key={"segment_" + index}
          />
        ))}
      </ItemsList>
      <AutoTagSegments />
    </div>
  );
}
