import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import ColorSelect from "import/components/micro/ColorSelect";
import type { TtagId } from "public/entidades";
import { LATEX_COLOR } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  thisTagId: TtagId | undefined;
};

const TagColorChanger: React.FC<PropsType> = ({ thisTagId }) => {
  const [selectedColor, setSelectedColor] = useState<LATEX_COLOR>("black");

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!thisTagId || !store) return;
    const thisTag = store.tags.get(thisTagId)!;
    setSelectedColor(thisTag.color as LATEX_COLOR);
  }, []);

  useEffect(() => {
    if (!thisTagId || !store) return;
    const updatedTags = store.tags;
    const thisTag = store.tags.get(thisTagId)!;
    updatedTags.set(thisTagId, { ...thisTag, color: selectedColor });
    store.setTags(updatedTags);
  }, [selectedColor]);

  return (
    <div className="flex flex-row flex-nowrap gap-2">
      <div className="grid items-center">Cor:</div>
      <div>
        {
          <ColorSelect
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            key={`ColorSelect_${thisTagId ? thisTagId : "empty"}`}
          />
        }
      </div>
    </div>
  );
};

export default TagColorChanger;
