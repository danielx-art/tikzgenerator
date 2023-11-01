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

const CustomizationPanel = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  return (
    <div className="h-1/2 w-full self-start p-4 text-a_dark sm:w-1/2 md:w-1/3">
      <div className="w-fit">Customização</div>
      <div className="flex h-[calc(100%-2rem)] w-full flex-col items-start justify-start gap-4 rounded-b-lg border-2 border-t-0 border-a_neutral bg-a_light p-4"></div>
    </div>
  );
};

export default CustomizationPanel;
