import Customization from "import/components/custom/Customization";
import AddPointInput from "import/components/entities/AddPointInput";
import HeroBar from "import/components/hero/HeroBar";
import Panel from "import/components/micro/Panel";
import PreviewPanel from "import/components/preview/PreviewPanel";
import Tools from "import/components/tools/Tools";

const LayoutV2 = () => {
  return (
    <>
      <div className="md:no-scrollbar flex flex-col gap-4 bg-c_base p-4 font-jost md:grid md:h-full md:max-h-full md:grid-cols-[1fr_2fr]">
        <Panel className="flex flex-col justify-start gap-4 overflow-auto pl-2">
          <HeroBar />
          <Customization />
          <Tools />
        </Panel>
        <div className="flex md:flex-col h-[96vh] flex-col-reverse justify-between gap-4 md:h-full">
          <div className="flex-1">
            <PreviewPanel />
          </div>
          <AddPointInput />
        </div>
      </div>
    </>
  );
};

export default LayoutV2;
