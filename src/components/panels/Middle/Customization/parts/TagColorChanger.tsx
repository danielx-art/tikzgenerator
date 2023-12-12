import ColorSelect from "import/components/micro/ColorSelect";
import { type Action, type State } from "import/utils/store";
import { type Ttag } from "public/entidades";
import { LATEX_COLOR } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  store: State & Action;
  thisTag: Ttag | undefined;
};


const TagColorChanger: React.FC<PropsType> = ({ store, thisTag }) => {
  const [selectedColor, setSelectedColor] = useState<LATEX_COLOR>(thisTag?.color as LATEX_COLOR|| "black");

  useEffect(() => {
    if (!thisTag) return;
    const updatedTags = store.tags;
    updatedTags.set(thisTag.id, { ...thisTag, color: selectedColor });
    store.setTags(updatedTags);
  }, [selectedColor, thisTag]);

  return (
      <div className="flex flex-row flex-nowrap gap-2">
        <div className="grid items-center">Cor:</div>
        <div>
          {
            <ColorSelect selectedColor={selectedColor} setSelectedColor={setSelectedColor} key={`ColorSelect_${thisTag? thisTag.id : "empty"}`}/>
          }
        </div>
      </div>
  );
};

export default TagColorChanger;
