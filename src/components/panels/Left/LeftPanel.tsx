import EntitiesPanel from "./Entities/EntitiesPanel";

const LeftPanel = () => {
  return (
    <div className="flex w-full flex-1 flex-col self-start sm:max-h-full sm:min-h-full">
      <EntitiesPanel />
    </div>
  );
};

export default LeftPanel;
