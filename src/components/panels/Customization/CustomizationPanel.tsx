import {
  alphabeticalGreekTags,
  alphabeticalLatinTags,
  numericalTags,
  alphabeticalSmallLatinTags,
} from "import/utils/autoTags";
import PopMenu from "../../micro/PopMenu";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import AddPointInSegment from "./parts/AddPointInSegment";
import AutoTags from "./parts/AutoTags";
import AccordionItem from "import/components/micro/AccordionItem";

const CustomizationPanel = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  return (
    <div className="flex min-h-full w-full flex-1 flex-col rounded-md border-2 border-c_discrete p-4 overflow-auto">
      <div className="flex w-full flex-1 flex-col items-start justify-start gap-2">
        <AccordionItem title="Inserir ponto em segmento">
          <AddPointInSegment />
        </AccordionItem>
        <AutoTags />
      </div>
    </div>
  );
};

export default CustomizationPanel;
