import {
  alphabeticalGreekTags,
  alphabeticalLatinTags,
  numericalTags,
  alphabeticalSmallLatinTags,
} from "import/utils/autoTags";
import PopMenu from "../../micro/PopMenu";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import useApplyTags from "import/utils/useApplyTags";
import Slider from "import/components/micro/Slider";
import AddPointInSegment from "../Entities/parts/AddPointInSegment";

const CustomizationPanel = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  return (
    <div className="flex-1 flex w-full flex-col min-h-full rounded-md border-2 border-c_discrete p-4">
      <div className="flex flex-1 w-full flex-col items-start justify-start gap-4">
        <AddPointInSegment />
      </div>
    </div>
  );
};

export default CustomizationPanel;
