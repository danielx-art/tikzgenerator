import useMyStore from "store";

export const AddAndSelectGroup = () => {
  const { groups, setGroups, selectedGroup, setSelectedGroup } = useMyStore();

  function addGroup() {
    const numGroups = groups.length;
    const newGroup = numGroups + 1;
    setGroups([...groups, newGroup]);
    setSelectedGroup(numGroups + 1);
  }

  return (
    <div className="flex flex-row flex-nowrap justify-end gap-2">
      <div className=" p-1 text-a_neutral" onClick={addGroup}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
      </div>
      <select
        className="w-auto bg-a_light p-1 pr-2 text-a_neutral focus:outline-none"
        value={`Grupo ${selectedGroup}`}
        onChange={(e) => {
          setSelectedGroup(parseInt(e.target.value.split(" ")[1] as string));
        }}
      >
        {groups.map((each, index) => (
          <option key={`group-${index}`}>Grupo {each}</option>
        ))}
      </select>
    </div>
  );
};
