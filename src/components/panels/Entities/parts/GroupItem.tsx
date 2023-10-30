import useMyStore from "store";
import { RemoveButton } from "../../../micro/RemoveButton";
import useStore from "import/utils/useStore";

type PropsType = {
  groupId: number;
  selected: boolean;
  children?: React.ReactNode;
};

export const GroupItem: React.FC<PropsType> = ({
  groupId,
  selected,
  children,
}) => {
  const store = useStore(useMyStore, (state)=>state);

  if(!store) return;

  const {points, setPoints, groups, setGroups, selectedGroup, setSelectedGroup} = store;

  function handleGroupClick(groupId: number) {
    setSelectedGroup(groupId);
  }

  function removeGroup(groupId: number) {
    const updatedPoints = [...points].filter((point) => point.group != groupId);
    updatedPoints.forEach((point) => {
      if (point.group > groupId) point.group--;
    });

    setPoints(updatedPoints);

    if (selectedGroup == groupId) setSelectedGroup(0);

    const groupsAfterRemoval = [...groups].filter((group) => group != groupId);

    const updatedGroups = groupsAfterRemoval.map((group) =>
      group > groupId ? group - 1 : group,
    );

    setGroups(updatedGroups);
  }

  return (
    <div>
      <div
        className={`${
          selected ? "bg-white bg-opacity-5 font-bold" : null
        } flex flex-row flex-nowrap justify-between px-2 py-1 text-xs text-a_highlight`}
      >
        <div
          onClick={() => handleGroupClick(groupId)}
        >{`Grupo ${groupId}`}</div>
        <RemoveButton handleClick={() => removeGroup(groupId)} />
      </div>
      {children}
    </div>
  );
};
