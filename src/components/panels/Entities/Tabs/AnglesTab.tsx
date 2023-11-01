import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import ItemsList from "../parts/ItemsList";
import AngleItem from "../parts/AngleItem";
import AutoTagAngles from "../parts/AutoTagAngles";
import { type Tponto, type Tangulo, angulo } from "public/entidades";

export default function AnglesTab() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, angles, setAngles, generateId } = store;

  const makeAngles = () => {
    const selectedPoints = points.filter((point) => point.selected);
    let anglesToAdd = [] as Tangulo[];

    for (let i = 0; i < selectedPoints.length - 2; i++) {
      const pA = selectedPoints[i] as Tponto;
      const pB = selectedPoints[i + 1] as Tponto;
      const pC = selectedPoints[i + 2] as Tponto;
      const newAngleId = generateId("angle", anglesToAdd.length);
      const newAngle = angulo(pA, pB, pC, newAngleId);
      anglesToAdd.push(newAngle);
    }

    const updatedAngles = [...angles, ...anglesToAdd];
    setAngles(updatedAngles);
  };

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
