import { Tsegment } from "public/entidades";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import Item from "./Item";
import { findTagByEntityId } from "import/utils/miscEntity";

type PropsType = {
  segment: Tsegment;
  index: number;
};

const SegmentItem: React.FC<PropsType> = ({ segment, index }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { segments, tags, deleteEntity, toggleSelection } = store;

  return (
    <Item
      highlight={segment.selected}
      removeFn={() => deleteEntity(segment.id)}
      handleClickFn={() => toggleSelection(segment.id)}
    >
      <div>
        {findTagByEntityId(segment.p1.id, tags)?.value || "(" + segment.p1.coords.x + ";" + segment.p1.coords.y + ")"}
        ---
        {findTagByEntityId(segment.p2.id, tags)?.value || "(" + segment.p2.coords.x + ";" + segment.p2.coords.y + ")"}
      </div>
      <div>{findTagByEntityId(segment.id, tags)?.value || ""}</div>
    </Item>
  );
};

export default SegmentItem;
