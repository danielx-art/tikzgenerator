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
  }, [selectedColor]);

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value as LATEX_COLOR);
  };

  return (
    <div className="flex w-full flex-1 flex-col gap-2">
      <div className="flex w-full flex-row flex-nowrap gap-2">
        <div>Tamanho:</div>
      </div>
      <div className="flex w-full flex-row flex-nowrap gap-2">
        <div className="grid items-center">Cor:</div>
        <div>
          {thisTag && (
            <ColorSelect selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagColorChanger;
