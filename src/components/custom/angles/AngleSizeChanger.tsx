import configStore from "import/utils/store/configStore";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { TangId } from "public/entidades";
import { initConfigs } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  angId: TangId | undefined;
};

const AngleSizeChanger: React.FC<PropsType> = ({ angId }) => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state)=>state);

  const [size, setSize] = useState(`${configs?.DEFAULT_STROKE_WIDTH || initConfigs.DEFAULT_STROKE_WIDTH}`);
  const [disabled, setDisabled] = useState(true);


  useEffect(() => {
    if (!store || !angId) {
      setDisabled(true);
      return;
    }
    const ang = store.angles.get(angId);
    if (!ang) return;
    setSize(`${ang.size}`);
    setDisabled(false);
  }, [angId, store]);

  useEffect(() => {
    if (!angId || !store || disabled) return;
    const updatedAngles = new Map(store.angles);
    const newSize =
      size.length > 0 ? (parseFloat(size) > 0 ? parseFloat(size) : 0) : 0;
    const ang = store.angles.get(angId);
    if (!ang) return;
    updatedAngles.set(angId, { ...ang, size: newSize });
    store.setAngles(updatedAngles);
  }, [size]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!angId || !store || disabled) return;
    setSize(event.target.value);
  };

  return (
    <div className={`flex flex-row gap-2`}>
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

export default AngleSizeChanger;
