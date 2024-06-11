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
  const thisEnt = useStore(
    myStore,
    (state) => entId && getEntityById(entId, state),
  );
  
  const [size, setSize] = useState(`${configs?.DEFAULT_STROKE_WIDTH || initConfigs.DEFAULT_STROKE_WIDTH}`);
  const [disabled, setDisabled] = useState(true);


  useEffect(() => {
    if (!thisEnt || !("stroke" in thisEnt)) {
      setDisabled(true);
      return;
    }
    setSize(`${thisEnt.stroke.width}`);
    setDisabled(false);
  }, [thisEnt]);

  useEffect(() => {
    if (!thisEnt || !("stroke" in thisEnt) || !store || disabled) return;
    
    const newSize =
      size.length > 0 ? (parseFloat(size) > 0 ? parseFloat(size) : 0) : 0;

    const newEnt = {
      ...thisEnt,
      stroke: { ...thisEnt.stroke, width: newSize },
    };

    store.update(newEnt)
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
        className="inline w-20 bg-background p-1 text-center focus:underline focus:outline-none"
        value={size}
      />
    </div>
  );
};

export default StrokeWidthChanger;
