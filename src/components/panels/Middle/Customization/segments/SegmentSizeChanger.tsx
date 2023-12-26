import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { TsegId, Tsegment } from "public/entidades";
import { DEFAULT_LINE_WIDTH } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  segId: TsegId | undefined;
};

const SegmentSizeChanger: React.FC<PropsType> = ({ segId }) => {
  const [size, setSize] = useState(`${DEFAULT_LINE_WIDTH}`);
  const [disabled, setDisabled] = useState(true);

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!store || !segId) {
      setDisabled(true);
      return;
    }
    const seg = store.segments.get(segId);
    if(!seg) return;
    setSize(`${seg.width}`);
    setDisabled(false);
  }, [segId, store]);

  useEffect(() => {
    if (!segId || !store || disabled) return;
    const updatedSegments = new Map(store.segments);
    const newSize =
      size.length > 0 ? (parseFloat(size) > 0 ? parseFloat(size) : 0) : 0;
    const seg = store.segments.get(segId)!;
    updatedSegments.set(segId, { ...seg, width: newSize });
    store.setSegments(updatedSegments);
  }, [size]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!segId || !store || disabled) return;
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

export default SegmentSizeChanger;
