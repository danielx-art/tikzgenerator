import CustomizationPanel from "../../../components/custom/Customization";
import ToolsPanel from "../../../components/tools/Tools";

const MiddlePanel = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-2 self-start sm:max-h-full sm:min-h-full">
      <CustomizationPanel />
      <ToolsPanel />
    </div>
  );
};

export default MiddlePanel;
