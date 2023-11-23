import AddPointInSegment from "./parts/AddPointInSegment";
import AutoTags from "./parts/AutoTags";
import AccordionItem from "import/components/micro/AccordionItem";

const ToolsPanel = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-start justify-start gap-2 rounded-md border-2 border-c_discrete p-4  sm:overflow-auto">
      <AccordionItem title="Inserir ponto em segmento">
        <AddPointInSegment />
      </AccordionItem>
      <AutoTags />
    </div>
  );
};

export default ToolsPanel;
