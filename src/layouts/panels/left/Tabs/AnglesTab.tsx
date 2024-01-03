import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import ItemsList from "../../../../components/entities/ItemsList";
import AngleItem from "../../../../components/entities/AngleItem";
import { type Tpoint, type Tangle, angulo } from "public/entidades";
import {
  fromSelectionsGet,
  getSelected,
} from "import/utils/storeHelpers/miscEntity";

export default function AnglesTab() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, angles, setAngles, generateId, setError, selections } = store;

  const selectedPoints = getSelected("point", store);

  const makeAngles = () => {
    if (selectedPoints.length < 3) {
      setError(
        "Você precisa selecionar no mínimo três pontos para criar um ângulo.",
      );
      return;
    }

    const updatedAngles = new Map(store.angles);

    for (let i = 0; i < selectedPoints.length - 2; i++) {
      const pA = selectedPoints[i] as Tpoint;
      const pB = selectedPoints[i + 1] as Tpoint;
      const pC = selectedPoints[i + 2] as Tpoint;
      const newAngleId = generateId("angle");
      const newAngle = angulo(pA, pB, pC, newAngleId);
      updatedAngles.set(newAngleId, newAngle);
    }

    setAngles(updatedAngles);
  };

  return (
    <div className="flex flex-1 flex-col flex-nowrap justify-between gap-2">
      <div className="rounded-sm p-2 text-sm text-c_scnd2 ">
        Selecione três ou mais pontos e clique em "Conectar!".
      </div>
      <button
        className="mb-2 w-fit self-center rounded-sm bg-c_interact px-4 py-2 text-c_base outline-1 hover:bg-c_high1"
        onClick={makeAngles}
      >
        Conectar!
      </button>
      <ItemsList>
        {Array.from(angles).map(([key, angle], index) => (
          <AngleItem angle={angle} index={index} key={"list_item_" + key} />
        ))}
      </ItemsList>
      {/* <AutoTagAngles /> */}
    </div>
  );
}
