import PreviewPanel from "./Preview/PreviewPanel";

const RightPanel = () => {
  return (
    <div className="flex w-full flex-1 flex-col self-start sm:max-h-full sm:min-h-full sm:overflow-auto">
      <PreviewPanel />
    </div>
  );
};

export default RightPanel;
