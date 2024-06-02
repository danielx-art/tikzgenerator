import useStore from "import/utils/store/useStore";
import myStore from "import/utils/store/store";

const AddAndSelectGroup = () => {
  const store = useStore(myStore, (state) => state);

  function addGroup() {
    const numGroups = store?.groups.length || 0;
    const newGroup = numGroups + 1;
    store?.setGroups([...store?.groups, newGroup]);
    store?.setSelectedGroup(numGroups + 1);
  }

  return (
    store && (
      <div className="flex flex-row flex-nowrap items-center justify-end">
        <div className="p-1 text-foreground2" onClick={addGroup}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>
        </div>
        <select
          className="w-auto bg-background p-1 pr-2 text-sm text-foreground2 focus:outline-none"
          value={`Grupo ${store.selectedGroup}`}
          onChange={(e) => {
            store.setSelectedGroup(
              parseInt(e.target.value.split(" ")[1] as string),
            );
          }}
        >
          {store.groups.map((each, index) => (
            <option key={`group-${index}`}>Grupo {each}</option>
          ))}
        </select>
      </div>
    )
  );
};

export default AddAndSelectGroup;
