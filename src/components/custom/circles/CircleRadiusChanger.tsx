import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { TcircleId } from "public/entidades";
import { DEFAULT_CIRCLE_RADIUS } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  circleId: TcircleId | undefined;
};

const CircleRadiusChanger: React.FC<PropsType> = ({ circleId }) => {
  const [size, setSize] = useState(`${DEFAULT_CIRCLE_RADIUS}`);
  const [disabled, setDisabled] = useState(true);

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!store || !circleId) {
      setDisabled(true);
      return;
    }
    const circ = store.circles.get(circleId);
    if (!circ) return;
    setSize(`${circ.radius}`);
    setDisabled(false);
  }, [circleId, store]);

  useEffect(() => {
    if (!circleId || !store || disabled) return;
    const updatedCircles = new Map(store.circles);
    const newSize =
      size.length > 0
        ? parseFloat(size) > 0
          ? parseFloat(size)
          : DEFAULT_CIRCLE_RADIUS
        : DEFAULT_CIRCLE_RADIUS;
    const seg = store.circles.get(circleId);
    if (!seg) return;
    updatedCircles.set(circleId, { ...seg, radius: newSize });
    store.setCircles(updatedCircles);
  }, [size]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!circleId || !store || disabled) return;
    setSize(event.target.value);
  };

  return (
    <div className={`flex flex-row flex-wrap gap-2`}>
      <div className="grid items-center">Raio:</div>
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

export default CircleRadiusChanger;
