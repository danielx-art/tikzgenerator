import { Tsegmento } from "public/entidades";
import myStore from "import/utils/store";
import { RemoveButton } from "../../../micro/RemoveButton";
import useStore from "import/utils/useStore";
import Item from "./Item";

type PropsType = {
  segment: Tsegmento;
  index: number;
};

const PointItem: React.FC<PropsType> = ({ segment, index }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { segments, setSegments, tags } = store;

  function handleClick(index: number) {
        const updatedSegments = [...segments];
        let thisSeg = updatedSegments[index] as Tsegmento;
        thisSeg.selected = !thisSeg.selected;
        setSegments(updatedSegments);
  }

  function remove(index: number) {
    const updatedSegments = [...segments];
    updatedSegments.splice(index, 1);
    setSegments(updatedSegments);
  }

  return (
    <Item highlight={segment.selected}>
      <div onClick={() => handleClick(index)}>
        ({segment.p1.coords.x};{segment.p2.coords.y})--({segment.p2.coords.x};{segment.p2.coords.y})
      </div>
      <div>{tags.find((tag) => tag.entityId == segment.id)?.value || ""}</div>
      <RemoveButton handleClick={() => remove(index)} />
    </Item>
  );
};

export default PointItem;
