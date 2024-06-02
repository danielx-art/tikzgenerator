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

  useEffect(() => {
    if (!store || !thisTagId) {
      setDisabled(true);
      return;
    }
    const thisTag = store.tags.get(thisTagId);
    if (!thisTag || !store.selections.includes(thisTag.entityId)) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
    setSelectedColor(thisTag.color as LATEX_COLOR);
  }, [thisTagId, store]);

  useEffect(() => {
    if (!thisTagId || !store || disabled) return;
    const updatedTags = new Map(store.tags);
    const thisTag = store.tags.get(thisTagId)!;
    updatedTags.set(thisTagId, { ...thisTag, color: selectedColor });
    store.setTags(updatedTags);
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
