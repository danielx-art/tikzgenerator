import useMyStore from "store";
import { PointItem } from "../parts/PointItem";
import { GroupItem } from "../parts/GroupItem";
import { AddPointInput } from "../parts/AddPointInput";
import { AddAndSelectGroup } from "../parts/AddAndSelectGroup";

export default function PointsTab() {
  const { points, groups, selectedGroup } = useMyStore();

  return (
    <div className="flex h-full flex-1 flex-col flex-nowrap justify-between">
      <div className="flex-1 rounded-md bg-a_neutral p-1 md:overflow-y-auto">
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
      </div>
      <AddPointInput />
      <AddAndSelectGroup />
    </div>
  );
}
