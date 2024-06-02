import Switcher from "import/components/micro/Switcher";
import { roundToDecimalPlaces } from "import/utils/math/misc";
import configStore from "import/utils/store/configStore";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { TcircleId } from "public/entidades";
import { initConfigs } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  circleId: TcircleId | undefined;
};

const CircleArcChanger: React.FC<PropsType> = ({ circleId }) => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state) => state);

  const [arcStart, setArcStart] = useState(0);
  const [arcEnd, setArcEnd] = useState(360);
  const [arcOffset, setArcOffset] = useState(0);
  const [showRadius, setShowRadius] = useState(false);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!store || !circleId) {
      setDisabled(true);
      return;
    }
    const circ = store.circles.get(circleId);
    if (!circ) return;
    setArcStart(circ.arcStart);
    setArcEnd(circ.arcEnd);
    setArcOffset(circ.arcOffset);
    setShowRadius(circ.showRadius);
    setDisabled(false);
  }, [circleId, store]);

  useEffect(() => {
    if (!circleId || !store || !configs || disabled) return;
    const updatedCircles = new Map(store.circles);
    const circ = store.circles.get(circleId);
    if (!circ) return;
    updatedCircles.set(circleId, { ...circ, arcStart: arcStart });
    store.setCircles(updatedCircles);
  }, [arcStart]);

  useEffect(() => {
    if (!circleId || !store || !configs || disabled) return;
    const updatedCircles = new Map(store.circles);
    const circ = store.circles.get(circleId);
    if (!circ) return;
    updatedCircles.set(circleId, { ...circ, arcEnd: arcEnd });
    store.setCircles(updatedCircles);
  }, [arcEnd]);

  useEffect(() => {
    if (!circleId || !store || !configs || disabled) return;
    const updatedCircles = new Map(store.circles);
    const circ = store.circles.get(circleId);
    if (!circ) return;
    updatedCircles.set(circleId, { ...circ, arcOffset: arcOffset });
    store.setCircles(updatedCircles);
  }, [arcOffset]);

  useEffect(() => {
    if (!circleId || !store || !configs || disabled) return;
    const updatedCircles = new Map(store.circles);
    const circ = store.circles.get(circleId);
    if (!circ) return;
    updatedCircles.set(circleId, { ...circ, showRadius: showRadius });
    store.setCircles(updatedCircles);
  }, [showRadius]);

  const handleArcStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!circleId || !store || disabled) return;
    let newValue = parseFloat(event.target.value) | 0;
    if (newValue < 0) newValue = 0;
    if (newValue > 360) newValue = 360;
    setArcStart(newValue);
  };

  const handleArcEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!circleId || !store || disabled) return;
    let newValue = parseFloat(event.target.value) | 360;
    if (newValue < 0) newValue = 0;
    if (newValue > 360) newValue = 360;
    setArcEnd(newValue);
  };

  const handleArcOffsetChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!circleId || !store || disabled) return;
    let newValue = parseFloat(event.target.value) | 0;
    if (newValue < 0) newValue = 0;
    if (newValue > 360) newValue = 360;
    setArcOffset(newValue);
  };

  return (
    <div className={`flex flex-col flex-nowrap gap-2`}>
      <div className="grid">Arco:</div>
      <Switcher
        isChecked={showRadius}
        setIsChecked={setShowRadius}
        messageOne="Contornos radiais"
      />
      <div className="flex flex-row gap-2">
        <div className="flex flex-col-reverse flex-nowrap items-center divide-y-2 rounded-sm border-2 border-border">
          <input
            type="number"
            name="arc-start-input"
            id="arc-start-input"
            step={1}
            onChange={handleArcStartChange}
            disabled={disabled}
            className="inline w-14 bg-background p-1 text-end focus:underline focus:outline-none"
            value={arcStart}
          />
          <label
            htmlFor="arc-start-input"
            className="w-full bg-card text-center text-sm text-foreground"
          >
            Início
          </label>
        </div>
        <div className="flex flex-col-reverse flex-nowrap items-center divide-y-2 rounded-sm border-2 border-border">
          <input
            type="number"
            name="arc-end-input"
            id="arc-end-input"
            step={1}
            onChange={handleArcEndChange}
            disabled={disabled}
            className="inline w-14 bg-background p-1 text-end focus:underline focus:outline-none"
            value={arcEnd}
          />
          <label
            htmlFor="arc-end-input"
            className="w-full bg-card text-center text-sm text-foreground"
          >
            Fim
          </label>
        </div>
        <div className="flex flex-col-reverse flex-nowrap items-center divide-y-2 rounded-sm border-2 border-border">
          <input
            type="number"
            name="arc-offset-input"
            id="arc-offset-input"
            step={1}
            onChange={handleArcOffsetChange}
            disabled={disabled}
            className="inline w-14 bg-background p-1 text-end focus:underline focus:outline-none"
            value={arcOffset}
          />
          <label
            htmlFor="arc-start-input"
            className="w-full bg-card text-center text-sm text-foreground"
          >
            Base
          </label>
        </div>
      </div>
    </div>
  );
};

export default CircleArcChanger;
