import { Tangle } from "public/entidades";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import Item from "./Item";
import { roundToDecimalPlaces } from "import/utils/misc";
import { findTagByEntityId } from "import/utils/miscEntity";

type PropsType = {
  angle: Tangle;
  index?: number;
};

const Angle: React.FC<PropsType> = ({ angle }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { angles, setAngles, tags, deleteEntity, toggleSelection } = store;

  return (
    <Item
      highlight={angle.selected}
      removeFn={() => deleteEntity(angle.id)}
      handleClickFn={() => toggleSelection(angle.id)}
    >
      <div>{roundToDecimalPlaces((angle.valor * 180) / Math.PI, 0) + "°"}</div>
      <div>{findTagByEntityId(angle.id, tags)?.value || ""}</div>
    </Item>
  );
};

export default Angle;
