import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import type { TtagId } from "public/entidades";
import { DEFAULT_TAG_SIZE } from "public/generalConfigs";
import { useEffect, useLayoutEffect, useState } from "react";

type PropsType = {
  thisTagId: TtagId | undefined;
};

const TagSizeChanger: React.FC<PropsType> = ({ thisTagId }) => {
  const [size, setSize] = useState(`${DEFAULT_TAG_SIZE}`);

  const store = useStore(myStore, (state) => state);

  useLayoutEffect(() => {
    if (!thisTagId || !store) return;
    const thisTag = store.tags.get(thisTagId)!;
    setSize(`${thisTag.size}`);
  }, []);

  useEffect(() => {
    if (!thisTagId || !store) return;
    const updatedTags = store.tags;
    const newSize =
      size.length > 0 ? (parseFloat(size) > 0 ? parseFloat(size) : 0) : 0;
    const thisTag = store.tags.get(thisTagId)!;
    updatedTags.set(thisTagId, { ...thisTag, size: newSize });
    store.setTags(updatedTags);
  }, [size]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        className="inline w-20 bg-c_base p-1 text-center focus:underline focus:outline-none"
        value={size}
      />
    </div>
  );
};

export default TagSizeChanger;
