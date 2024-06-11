import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import ColorSelect from "import/components/micro/ColorSelect";
import type { TtagId } from "public/entidades";
import { LATEX_COLOR } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  thisTagId: TtagId | undefined;
};

const TagColorChanger: React.FC<PropsType> = ({ thisTagId }) => {
  const [selectedColor, setSelectedColor] = useState<LATEX_COLOR>("black");
  const [disabled, setDisabled] = useState(true);
  const store = useStore(myStore, (state) => state);
  const thisTag = useStore(myStore, (state)=>thisTagId&&state.tags.get(thisTagId));

  useEffect(() => {
    if (!thisTag || !store || !store.selections.includes(thisTag.entityId)) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
    setSelectedColor(thisTag.color as LATEX_COLOR);
  }, [thisTag, store]);

  useEffect(() => {
    if (!thisTag || !store || disabled) return;

    const newTag = { ...thisTag, color: selectedColor };
    store.update(newTag);
  }, [selectedColor]);

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="grid items-center">Cor:</div>
      <div>
        {thisTagId ? (
          <ColorSelect
            id={thisTagId}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            disabled={disabled}
            key={`ColorSelect_${thisTagId ? thisTagId : "empty"}`}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TagColorChanger;
