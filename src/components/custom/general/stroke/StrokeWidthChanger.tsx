import configStore from "import/utils/store/configStore";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import {
  getEntityById,
  getKindById,
  getMapByKind,
  getSetterByKind,
} from "import/utils/storeHelpers/entityGetters";
import { TentId } from "public/entidades";
import { initConfigs } from "public/generalConfigs";
import { useState, useEffect } from "react";

type PropsType = {
  entId: TentId | undefined;
};

const StrokeWidthChanger: React.FC<PropsType> = ({ entId }) => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state)=>state);
  
  const [size, setSize] = useState(`${configs?.DEFAULT_STROKE_WIDTH || initConfigs.DEFAULT_STROKE_WIDTH}`);
  const [disabled, setDisabled] = useState(true);


  useEffect(() => {
    if (!store || !entId) {
      setDisabled(true);
      return;
    }
    const ent = getEntityById(entId, store);
    if (!ent || !("stroke" in ent)) return;
    setSize(`${ent.stroke.width}`);
    setDisabled(false);
  }, [entId, store]);

  useEffect(() => {
    if (!entId || !store || disabled) return;
    const kind = getKindById(entId as TentId);
    const entMap = getMapByKind(kind, store);
    const entSetter = getSetterByKind(kind, store);
    if (!entMap || !entSetter) return;
    const updatedEntities = new Map(entMap);
    const newSize =
      size.length > 0 ? (parseFloat(size) > 0 ? parseFloat(size) : 0) : 0;
    const ent = getEntityById(entId, store);
    if (!ent || !("stroke" in ent)) return;
    updatedEntities.set(entId, {
      ...ent,
      stroke: { ...ent.stroke, width: newSize },
    } as any);
    entSetter(updatedEntities as any);
  }, [size]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!entId || !store || disabled) return;
    setSize(event.target.value);
  };

  return (
    <div className={`flex flex-row flex-wrap gap-2`}>
      <div className="grid items-center">Espessura:</div>
      <input
        type="number"
        name="sizeInput"
        step={0.1}
        onChange={handleSizeChange}
        disabled={disabled}
        className="inline w-20 bg-c_base p-1 text-center focus:underline focus:outline-none"
        value={size}
      />
    </div>
  );
};

export default StrokeWidthChanger;
