import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import { type Tponto, type Tsegmento, segmento } from "public/entidades";
import { useState } from "react";
import ItemsList from "../parts/ItemsList";

export default function SegmentsTab() {
  const store = useStore(myStore, (state) => state);
  const [cyclic, setCyclic] = useState(false);

  if (!store) return;

  const {points, segments, setSegments} = store;


  const selectedPoints = points.filter((point)=>point.selected);

  const conectPoints = () => {

    let segmentsToAdd = [] as Tsegmento[];

    for(let i=0; i<selectedPoints.length-1; i++){
      const pA = selectedPoints[i] as Tponto;
      const pB = selectedPoints[i+1] as Tponto;
      const newSegId = `segment-${segments.length + segmentsToAdd.length}`;
      const newSeg = segmento(pA, pB, newSegId);
      segmentsToAdd.push(newSeg);
    }

    if(cyclic) {
      const closingSegId = `segment-${segments.length + segmentsToAdd.length}`;
      const lastPoint = selectedPoints[selectedPoints.length-1] as Tponto;
      const firstPoint = selectedPoints[0] as Tponto;
      const closingSeg = segmento(lastPoint, firstPoint, closingSegId);
      segmentsToAdd.push(closingSeg);
    }

    const updatedSegments = [...segments, ...segmentsToAdd];
    setSegments(updatedSegments);
  }

  return (
    <div className="flex h-full flex-col flex-nowrap">
      <div className="m-2 rounded-sm p-2 text-sm text-a_neutral ">
        Selecione dois ou mais pontos na aba "Pontos" e clique em "Conectar!".
        Múltiplos pontos serão conectados na ordem que estão na lista.
      </div>
      <div className="my-4 w-fit self-center rounded-sm bg-a_dark px-4 py-2 text-a_highlight outline-1" onClick={conectPoints}>
        Conectar!
      </div>
      <ItemsList>
        {segments.map(segment => (<div>
          hi
        </div>))}
      </ItemsList>
    </div>
  );
}
