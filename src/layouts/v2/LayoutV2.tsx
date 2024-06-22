import Customization from "import/components/custom/Customization";
import AddPointInput from "import/components/entities/AddPointInput";
import HeroBar from "import/components/hero/HeroBar";
import Panel from "import/components/micro/Panel";
import { Accordion } from "import/components/micro/ui/accordion";
import { ScrollArea } from "import/components/micro/ui/scroll-area";
import PreviewPanel from "import/components/preview/PreviewPanel";
import Tools from "import/components/tools/Tools";

const LayoutV2 = () => {
  return (
    <>
      <div className="md:no-scrollbar font-jost flex flex-col gap-4 bg-background p-4 md:grid md:h-full md:max-h-full md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col-reverse justify-between gap-4 md:h-full md:flex-col">
          <div className="flex-1">
            <PreviewPanel />
          </div>
          <AddPointInput />
        </div>
        <Panel className="relative gap-4 overflow-hidden pr-1">
          <HeroBar />
          <ScrollArea className="w-full">
            <Accordion type="multiple" className="w-full pr-3">
              <Customization />
              <Tools />
            </Accordion>
          </ScrollArea>
        </Panel>
      </div>
    </>
  );
};

export default LayoutV2;
