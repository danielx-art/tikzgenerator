import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { TcircleId, TentId } from "public/entidades";
import { DEFAULT_STROKE_STYLE, DEFAULT_STROKE_WIDTH } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  entId: TentId | undefined;
};

const StrokeCustomization: React.FC<PropsType> = ({ entId }) => {
  const [size, setSize] = useState(`${DEFAULT_STROKE_WIDTH}`);
  const [ style, setStyle ] = useState(DEFAULT_STROKE_STYLE);
  const [disabled, setDisabled] = useState(true);

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!store || !entId) {
      setDisabled(true);
      return;
    }
    const ent = store.segments.get(entId);
    if(!ent) return;
    setSize(`${seg.width}`);
    setDisabled(false);
  }, [entId, store]);

  useEffect(() => {
    if (!circleId || !store || disabled) return;
    const updatedSegments = new Map(store.segments);
    const newSize =
      size.length > 0 ? (parseFloat(size) > 0 ? parseFloat(size) : 0) : 0;
    const seg = store.segments.get(circleId);
    if(!seg) return;
    updatedSegments.set(circleId, { ...seg, width: newSize });
    store.setSegments(updatedSegments);
  }, [size]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!circleId || !store || disabled) return;
    setSize(event.target.value);
  };

  return (
    <div className={`flex flex-row flex-nowrap gap-2`}>
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

export default StrokeCustomization;