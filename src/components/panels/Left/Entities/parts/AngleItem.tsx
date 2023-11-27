import { Tangle } from "public/entidades";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import Item from "./Item";
import { roundToDecimalPlaces } from "import/utils/misc";
import { toggleEntitySelection } from "import/utils/miscEntity";

type PropsType = {
  angle: Tangle;
  index: number;
};

const Angle: React.FC<PropsType> = ({ angle, index }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { angles, setAngles, tags, selectedEntities, setSelectedEntities } = store;

  function handleClick(index: number) {
    if(!store) return;
    // const updatedAngles = [...angles];
    // let thisAngle = updatedAngles[index] as Tangle;
    // thisAngle.selected = !thisAngle.selected;
    // const indexToChange = selectedEntities.angles.indexOf(parseInt(thisAngle.id));
    // const updatedSelectedAngles = [...selectedEntities.angles];
    // if(indexToChange > -1){
    //   updatedSelectedAngles.splice(indexToChange, 1);
    // } else {
    //   updatedSelectedAngles.push(parseInt(thisAngle.id));
    // }
    // setSelectedEntities({...selectedEntities, angles: updatedSelectedAngles});
    // setAngles(updatedAngles);
    toggleEntitySelection(store, angles[index] as Tangle);
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
