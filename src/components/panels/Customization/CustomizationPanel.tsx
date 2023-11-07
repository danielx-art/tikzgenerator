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

const CustomizationPanel = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  return (
    <div className="flex w-full flex-col min-h-full">
      <div className="flex flex-1 w-full flex-col items-start justify-start gap-4 p-4">
        <div>
          <div>Inserir ponto em segmento</div>
          <div>
            <Slider min={0} max={1} onChange={()=>{}} getValueFromPosition={(n)=>n} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
