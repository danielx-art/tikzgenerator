import { Tangulo, Tsegmento } from "public/entidades";
import myStore from "import/utils/store";
import { RemoveButton } from "../../../micro/RemoveButton";
import useStore from "import/utils/useStore";
import Item from "./Item";

type PropsType = {
  angle: Tangulo;
  index: number;
};

const Angle: React.FC<PropsType> = ({ angle, index }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { angles, setAngles, tags } = store;

  function handleClick(index: number) {
    const updatedAngles = [...angles];
    let thisSeg = updatedAngles[index] as Tangulo;
    thisSeg.selected = !thisSeg.selected;
    setAngles(updatedAngles);
  }

  function remove(index: number) {
    const updatedAngles = [...angles];
    updatedAngles.splice(index, 1);
    setAngles(updatedAngles);
  }

  return (
    <Item highlight={angle.selected}>
      <div onClick={() => handleClick(index)}>
        {angle.etiqueta.length > 0 ? angle.etiqueta : angle.valor}
      </div>
      <div>{tags.find((tag) => tag.entityId == angle.id)?.value || ""}</div>
      <RemoveButton handleClick={() => remove(index)} />
    </Item>
  );
};

export default Angle;
