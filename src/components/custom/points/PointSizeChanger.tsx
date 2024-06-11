import configStore from "import/utils/store/configStore";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { TpointId } from "public/entidades";
import { initConfigs } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  pointId: TpointId | undefined;
};

const PointSizeChanger: React.FC<PropsType> = ({ pointId }) => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state)=>state);
  const thisPoint = useStore(myStore, (state)=>pointId && state.points.get(pointId));
  
  const [size, setSize] = useState(`${configs?.DEFAULT_POINT_SIZE || initConfigs.DEFAULT_POINT_SIZE}`);
  const [disabled, setDisabled] = useState(true);


  useEffect(() => {
    if (!thisPoint) {
      setDisabled(true);
      return;
    }
    if (thisPoint.dotstyle !== 0) { //means that point is invisible, so its size doesnt have meaning.
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setSize(`${thisPoint.size}`);
  }, [pointId, store]);

  useEffect(() => {
    if (!thisPoint || !store || disabled) return;

    const newSize =
      size.length > 0 ? (parseFloat(size) > 0 ? parseFloat(size) : 0) : 0;

    const newPoint = { ...thisPoint, size: newSize };
    store.update(newPoint);
  }, [size]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!thisPoint || !store || disabled) return;
    setSize(event.target.value);
  };

  return (
    <div className={`flex flex-row flex-wrap gap-2`}>
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

export default PointSizeChanger;
