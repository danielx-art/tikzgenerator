import myStore from "import/utils/store/store";
import PointItem from "../../../../components/entities/PointItem";
import GroupItem from "../../../../components/entities/GroupItem";
import useStore from "import/utils/store/useStore";
import ItemsList from "../../../../components/entities/ItemsList";
import { Ttag } from "public/entidades";
import TagItem from "../../../../components/entities/TagItem";

export default function TagsTab() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, segments, angles, tags, setTags } = store;

  return (
    <div className="flex flex-1 flex-col flex-nowrap justify-between gap-2">
      <ItemsList>
        {Array.from(tags.values()).map((tag, index) => (
          <TagItem tag={tag} index={index} key={"list_item_" + tag.id} />
        ))}
      </ItemsList>
    </div>
  );
}
