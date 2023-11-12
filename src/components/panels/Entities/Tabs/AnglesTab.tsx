import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import ItemsList from "../parts/ItemsList";
import AngleItem from "../parts/AngleItem";
import AutoTagAngles from "../parts/AutoTagAngles";
import { type Tponto, type Tangulo, angulo } from "public/entidades";

export default function AnglesTab() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { selectedPoints, angles, setAngles, generateId, setError } = store;

  const makeAngles = () => {

    if(selectedPoints.length < 3) {
      setError("Você precisa selecionar no mínimo três pontos para criar um ângulo.");
      return;
    } 

    let anglesToAdd = [] as Tangulo[];

    for (let i = 0; i < selectedPoints.length - 2; i++) {
      const pA = selectedPoints[i] as Tponto;
      const pB = selectedPoints[i + 1] as Tponto;
      const pC = selectedPoints[i + 2] as Tponto;
      const newAngleId = generateId("angle");
      const newAngle = angulo(pA, pB, pC, newAngleId);
      anglesToAdd.push(newAngle);
    }

    const updatedAngles = [...angles, ...anglesToAdd];
    setAngles(updatedAngles);
  };

  return (
    <div className="flex flex-1 flex-col flex-nowrap justify-between gap-2">
      <div className="rounded-sm p-2 text-sm text-c_scnd2 ">
        Selecione três ou mais pontos e clique em "Conectar!".
      </div>
      <button
        className="mb-2 w-fit self-center rounded-sm bg-c_interact px-4 py-2 text-c_base outline-1"
        onClick={makeAngles}
      >
        Conectar!
      </button>
      <ItemsList>
        {angles.map((angle, index) => (
          <AngleItem angle={angle} index={index} key={"angle_" + index} />
        ))}
      </ItemsList>
      <AutoTagAngles />
    </div>
  );
}
