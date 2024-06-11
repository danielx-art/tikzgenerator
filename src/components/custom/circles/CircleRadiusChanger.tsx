import configStore from "import/utils/store/configStore";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { TcircleId } from "public/entidades";
import { initConfigs } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  circleId: TcircleId | undefined;
};

const CircleRadiusChanger: React.FC<PropsType> = ({ circleId }) => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state)=>state);
  const thisCircle = useStore(myStore, (state)=>circleId && state.circles.get(circleId));
  
  const [size, setSize] = useState(`${configs?.DEFAULT_CIRCLE_RADIUS || initConfigs.DEFAULT_CIRCLE_RADIUS}`);
  const [disabled, setDisabled] = useState(true);


  useEffect(() => {
    if (!thisCircle) {
      setDisabled(true);
      return;
    }
    setSize(`${thisCircle.radius}`);
    setDisabled(false);
  }, [thisCircle]);

  useEffect(() => {
    if (!thisCircle || !store || !configs || disabled) return;
    const newSize =
      size.length > 0
        ? parseFloat(size) > 0
          ? parseFloat(size)
          : configs.DEFAULT_CIRCLE_RADIUS
        : configs.DEFAULT_CIRCLE_RADIUS;
    store.update({ ...thisCircle, radius: newSize });
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
        className="inline w-20 bg-background p-1 text-center focus:underline focus:outline-none"
        value={size}
      />
    </div>
  );
};

export default CircleRadiusChanger;
