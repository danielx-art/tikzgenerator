import LeftPanel from "./left/LeftPanel";
import MiddlePanel from "./middle/MIddlePanel";
import RightPanel from "./right/RightPanel";

const ThreePanels = () => {
  return (
    <>
      <div className="md:no-scrollbar flex h-full flex-col gap-4 overflow-auto bg-c_base p-4 font-jost md:grid md:max-h-full md:grid-cols-[2fr_2fr_3fr]">
        <LeftPanel />
        <MiddlePanel />
        <RightPanel />
      </div>
    </>
  );
};

export default ThreePanels;
