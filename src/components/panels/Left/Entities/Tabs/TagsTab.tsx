import myStore from "import/utils/store";
import PointItem from "../parts/PointItem";
import GroupItem from "../parts/GroupItem";
import useStore from "import/utils/useStore";
import ItemsList from "../parts/ItemsList";
import { Tetiqueta } from "public/entidades";
import TagItem from "../parts/TagItem";

export default function TagsTab() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, segments, angles, tags, setTags } = store;



  return (
    <div className="flex flex-1 flex-col flex-nowrap justify-between gap-2">
      <ItemsList>
        {tags.map((tag, index)=>(<TagItem tag={tag} index={index} key={"tag_" + index} />))}
      </ItemsList>
    </div>
  );
}
