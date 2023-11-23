import { Tangulo } from "public/entidades";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import Item from "./Item";
import { roundToDecimalPlaces } from "import/utils/misc";

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

  function removeAngle(index: number) {
    const updatedAngles = [...angles];
    updatedAngles.splice(index, 1);
    setAngles(updatedAngles);
  }

  return (
    <Item
      highlight={angle.selected}
      removeFn={() => removeAngle(index)}
      handleClickFn={() => handleClick(index)}
    >
      <div>{roundToDecimalPlaces((angle.valor * 180) / Math.PI, 0) + "°"}</div>
      <div>{tags.find((tag) => tag.entityId == angle.id)?.value || ""}</div>
    </Item>
  );
};

export default Angle;
