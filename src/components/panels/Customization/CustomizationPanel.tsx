
import AddPointInSegment from "./parts/AddPointInSegment";
import AutoTags from "./parts/AutoTags";
import AccordionItem from "import/components/micro/AccordionItem";
import ItemCustomization from "./parts/ItemCustomization";
import CustomizationAccordionItem from "./parts/CustomizationAccordionItem";

const CustomizationPanel = () => {

  return (
    <div className="flex h-fit sm:min-h-full sm:max-h-full w-full flex-1 flex-col rounded-md border-2 border-c_discrete p-4 sm:overflow-auto">
      <div className="flex w-full flex-1 flex-col items-start justify-start gap-2">
        <CustomizationAccordionItem />
        <AccordionItem title="Inserir ponto em segmento">
          <AddPointInSegment />
        </AccordionItem>
        <AutoTags />
      </div>
    </div>
  );
};

export default CustomizationPanel;
