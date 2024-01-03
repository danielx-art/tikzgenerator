import PreviewPanel from "../../../components/preview/PreviewPanel";

const RightPanel = () => {
  return (
    <div className="flex w-full flex-1 flex-col self-start sm:max-h-full sm:min-h-full">
      <PreviewPanel />
    </div>
  );
};

export default RightPanel;