import { type Action, type State } from "import/utils/store";
import { type Ttag } from "public/entidades";
import { DEFAULT_TAG_SIZE } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  store: State & Action;
  thisTag: Ttag | undefined;
};


const TagSizeChanger: React.FC<PropsType> = ({ store, thisTag }) => {
  const [size, setSize] = useState(`${thisTag?.size || DEFAULT_TAG_SIZE}`);

  useEffect(() => {
    if (!thisTag) return;
    const updatedTags = store.tags;
    const newSize = size.length>0? (parseFloat(size) > 0 ? parseFloat(size) : 0):0;
    updatedTags.set(thisTag.id, { ...thisTag, size: newSize });
    store.setTags(updatedTags);
  }, [size]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  return (
    <div
    className={`flex flex-row flex-nowrap gap-2`}
  >
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
