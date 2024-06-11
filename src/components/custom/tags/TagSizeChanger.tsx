import configStore from "import/utils/store/configStore";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { Ttag, TtagId } from "public/entidades";
import { initConfigs } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  thisTagId: TtagId | undefined;
};

const TagSizeChanger: React.FC<PropsType> = ({ thisTagId }) => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state) => state);
  const thisTag = useStore(
    myStore,
    (state) => thisTagId && state.tags.get(thisTagId),
  );

  const [size, setSize] = useState(
    `${configs?.DEFAULT_TAG_SIZE || initConfigs.DEFAULT_TAG_SIZE}`,
  );
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!store || !thisTag || !store.selections.includes(thisTag.entityId)) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
    setSize(`${thisTag.size}`);
  }, [thisTag, store]);

  useEffect(() => {
    if (!thisTagId || !store || disabled) return;

    const newSize =
      size.length > 0 ? (parseFloat(size) > 0 ? parseFloat(size) : 0) : 0;

    const newTag = { ...thisTag, size: newSize };
    store.update(newTag as Ttag);
  }, [size]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!thisTagId || !store || disabled) return;
    setSize(event.target.value);
  };

  return (
    <div className={`flex flex-row flex-nowrap gap-2`}>
      <div className="grid items-center">Tamanho:</div>
      <input
        type="number"
        name="sizeInput"
        step={0.1}
        onChange={handleSizeChange}
        disabled={disabled}
        className="inline w-20 bg-background p-1 text-center focus:underline focus:outline-none"
        value={size}
      />
    </div>
  );
};

export default TagSizeChanger;
