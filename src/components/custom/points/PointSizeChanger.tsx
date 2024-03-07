import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { Tpoint, TpointId } from "public/entidades";
import { DEFAULT_POINT_SIZE } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  pointId: TpointId | undefined;
};

const PointSizeChanger: React.FC<PropsType> = ({ pointId }) => {
  const [size, setSize] = useState(`${DEFAULT_POINT_SIZE}`);
  const [disabled, setDisabled] = useState(true);

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!store || !pointId) {
      setDisabled(true);
      return;
    }
    const point = store.points.get(pointId);
    if (!point) return;
    if (point.dotstyle !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setSize(`${point.size}`);
  }, [pointId, store]);

  useEffect(() => {
    if (!pointId || !store || disabled) return;
    const updatedPoints = new Map(store.points);
    const newSize =
      size.length > 0 ? (parseFloat(size) > 0 ? parseFloat(size) : 0) : 0;
    const point = store.points.get(pointId)!;
    updatedPoints.set(pointId, { ...point, size: newSize });
    store.setPoints(updatedPoints);
  }, [size]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!pointId || !store || disabled) return;
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
        className="inline w-20 bg-c_base p-1 text-center focus:underline focus:outline-none"
        value={size}
      />
    </div>
  );
};

export default PointSizeChanger;
