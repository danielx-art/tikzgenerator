import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import ItemsList from "../parts/ItemsList";
import AngleItem from "../parts/AngleItem";
import AutoTagAngles from "../parts/AutoTagAngles";

export default function AnglesTab() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { angles, setAngles } = store;

  return (
    <div className="flex flex-1 flex-col flex-nowrap justify-between gap-2">
      <ItemsList>
        {angles.map((angle, index) => (
          <AngleItem angle={angle} index={index} key={"angle_" + index} />
        ))}
      </ItemsList>
      <AutoTagAngles />
    </div>
  );
}
