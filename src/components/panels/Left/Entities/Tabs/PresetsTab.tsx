import myStore from "import/utils/store";
import PointItem from "../parts/PointItem";
import GroupItem from "../parts/GroupItem";
import useStore from "import/utils/useStore";
import ItemsList from "../parts/ItemsList";

export default function PresetsTab() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, groups, selectedGroup } = store;

  return (
    <div className="flex flex-1 flex-col flex-nowrap justify-between gap-2">
      <ItemsList>
        {groups.map((groupId) => (
          <GroupItem
            groupId={groupId}
            selected={groupId == selectedGroup}
            key={`group-${groupId - 1}`}
          >
            {points
              .filter((point) => point.group == groupId)
              .map((point, index) => (
                <PointItem point={point} index={index} key={"point_" + index} />
              ))}
          </GroupItem>
        ))}
      </ItemsList>
    </div>
  );
}
