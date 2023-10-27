import { Tponto } from "public/entidades";
import useMyStore from "store";
import { RemoveButton } from "../../../micro/RemoveButton";

type PropsType = {
  point: Tponto;
  index: number;
};

export const PointItem: React.FC<PropsType> = ({ point, index }) => {
  const { points, setPoints } = useMyStore();

  function handlePointClick(index: number) {
    const updatedPoints = [...points];
    let thisPoint = updatedPoints[index] as Tponto;
    thisPoint.selected = !thisPoint.selected;
    setPoints(updatedPoints);
  }

  function removePoint(index: number) {
    const updatedPoints = [...points];
    updatedPoints.splice(index, 1);
    setPoints(updatedPoints);
  }

  return (
    <div
      className={`${
        point.selected
          ? "border-1 border-dashed border-a_highlight bg-white bg-opacity-20"
          : null
      } flex w-full flex-row flex-nowrap justify-stretch text-sm text-a_highlight`}
    >
      <div className="flex w-full select-none flex-row justify-between py-1 pl-4 pr-2">
        <div onClick={() => handlePointClick(index)}>
          {point.vec.x};{point.vec.y}
        </div>
        <div>{point.etiqueta}</div>
        <RemoveButton handleClick={() => removePoint(index)} />
      </div>
    </div>
  );
};
