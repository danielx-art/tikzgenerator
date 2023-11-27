import { Tpoint } from "public/entidades";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import Item from "./Item";
import { roundAndDisplayNicely } from "import/utils/misc";
import { findTagByEntityId } from "import/utils/miscEntity";

type PropsType = {
  point: Tpoint;
  index: number;
};

const PointItem: React.FC<PropsType> = ({ point, index }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const {
    tags,
    deleteEntity,
    toggleSelection,
    selections
  } = store;

  const getSelectionOrder = () => {
    if(!point.selected) return
    const pointsSelected = selections.filter((sel)=>{
      const entityKind = sel.split("_")[0];
      if(entityKind === "point") return true;
      return false;
    });
    const order = pointsSelected.indexOf(point.id);
    if(order === -1) return
    return order+1;
  }

  return (
    <Item
      highlight={point.selected}
      removeFn={() => deleteEntity(point.id)}
      handleClickFn={() => toggleSelection(point.id)}
    >
      <div>
        {roundAndDisplayNicely(point.coords.x)};
        {roundAndDisplayNicely(point.coords.y)}
      </div>
      <div>{findTagByEntityId(point.id, tags)?.value || ""}</div>
      {point.selected ? (
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-c_base bg-opacity-60 text-xs font-bold text-c_high1 ring-1 ring-c_high1">
          {getSelectionOrder()}
        </div>
      ) : (
        <div className="w-4"></div>
      )}
    </Item>
  );
};

export default PointItem;
