import { Tponto } from "public/entidades";
import myStore from "import/utils/store";
import { RemoveButton } from "../../../micro/RemoveButton";
import useStore from "import/utils/useStore";
import Item from "./Item";

type PropsType = {
  point: Tponto;
  index: number;
};

const PointItem: React.FC<PropsType> = ({ point, index }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, setPoints, tags } = store;

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
    <Item highlight={point.selected}>
      <div onClick={() => handlePointClick(index)}>
        {point.coords.x};{point.coords.y}
      </div>
      <div>{tags.find((tag) => tag.entityId == point.id)?.value || ""}</div>
      <RemoveButton handleClick={() => removePoint(index)} />
    </Item>
  );
};

export default PointItem;
