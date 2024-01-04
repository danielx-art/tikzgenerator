import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import ItemsList from "../../../../components/entities/ItemsList";
import AngleItem from "../../../../components/entities/AngleItem";
import { makeAngles } from "import/utils/storeHelpers/makeAngles";

export default function AnglesTab() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  return (
    <div className="flex flex-1 flex-col flex-nowrap justify-between gap-2">
      <div className="rounded-sm p-2 text-sm text-c_scnd2 ">
        Selecione três ou mais pontos e clique em "Conectar!".
      </div>
      <button
        className="mb-2 w-fit self-center rounded-sm bg-c_interact px-4 py-2 text-c_base outline-1 hover:bg-c_high1"
        onClick={() => makeAngles(store)}
      >
        Conectar!
      </button>
      <ItemsList>
        {Array.from(store.angles).map(([key, angle], index) => (
          <AngleItem angle={angle} index={index} key={"list_item_" + key} />
        ))}
      </ItemsList>
      {/* <AutoTagAngles /> */}
    </div>
  );
}
