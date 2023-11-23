import { RemoveButton } from "import/components/micro/RemoveButton";
import myStore from "import/utils/store";

import useStore from "import/utils/useStore";

type PropsType = {
  groupId: number;
  selected: boolean;
  children?: React.ReactNode;
};

const GroupItem: React.FC<PropsType> = ({ groupId, selected, children }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const {
    points,
    setPoints,
    groups,
    setGroups,
    selectedGroup,
    setSelectedGroup,
  } = store;

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
          selected ? "bg-c_high bg-opacity-5 font-bold" : null
        } flex flex-row flex-nowrap justify-between px-2 py-1 text-xs text-c_scnd_int`}
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

export default GroupItem;
