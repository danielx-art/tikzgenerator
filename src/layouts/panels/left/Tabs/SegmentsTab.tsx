import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { useState } from "react";
import ItemsList from "../../../../components/entities/ItemsList";
import SegmentItem from "../../../../components/entities/SegmentItem";
import ToolTip from "import/components/micro/ToolTip";
import { connectPoints } from "import/utils/storeHelpers/connectPoints";

export default function SegmentsTab() {
  const store = useStore(myStore, (state) => state);
  const [cyclic, setCyclic] = useState(false);

  if (!store) return;

  return (
    <div className="relative flex flex-1 flex-col flex-nowrap justify-between gap-2">
      {/* <div className="rounded-sm p-2 text-sm text-c_scnd2 ">
        Selecione dois ou mais pontos na aba "Pontos" e clique em "Conectar!".
        Múltiplos pontos serão conectados na ordem que estão na lista.
      </div> */}
      <button
        className="mb-2 w-fit self-center  rounded-sm bg-c_interact px-4 py-2 text-c_base outline-1 hover:bg-c_high1"
        onClick={() => connectPoints(store, cyclic)}
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
        {Array.from(store.segments.values()).map((segment, index) => (
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
