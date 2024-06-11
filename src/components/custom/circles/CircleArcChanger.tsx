import Switcher from "import/components/micro/Switcher";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { TcircleId } from "public/entidades";
import { useEffect, useState } from "react";

type PropsType = {
  circleId: TcircleId | undefined;
};

const CircleArcChanger: React.FC<PropsType> = ({ circleId }) => {
  const store = useStore(myStore, (state) => state);
  const thisCircle = useStore(myStore, (state)=>circleId && state.circles.get(circleId));

  const [arcStart, setArcStart] = useState(0);
  const [arcEnd, setArcEnd] = useState(360);
  const [arcOffset, setArcOffset] = useState(0);
  const [showRadius, setShowRadius] = useState(false);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!thisCircle) {
      setDisabled(true);
      return;
    }
    setArcStart(thisCircle.arcStart);
    setArcEnd(thisCircle.arcEnd);
    setArcOffset(thisCircle.arcOffset);
    setShowRadius(thisCircle.showRadius);
    setDisabled(false);
  }, [thisCircle]);

  useEffect(() => {
    if (!thisCircle || !store || disabled) return;
    store.update({ ...thisCircle, arcStart: arcStart });
  }, [arcStart]);

  useEffect(() => {
    if (!thisCircle || !store || disabled) return;
    store.update({ ...thisCircle, arcEnd: arcEnd });
  }, [arcEnd]);

  useEffect(() => {
    if (!thisCircle || !store || disabled) return;
    store.update({ ...thisCircle, arcOffset: arcOffset });
  }, [arcOffset]);

  useEffect(() => {
    if (!thisCircle || !store || disabled) return;
    store.update({ ...thisCircle, showRadius: showRadius });
  }, [showRadius]);

  const handleArcStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    let newValue = parseFloat(event.target.value) | 0;
    if (newValue < 0) newValue = 0;
    if (newValue > 360) newValue = 360;
    setArcStart(newValue);
  };

  const handleArcEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    let newValue = parseFloat(event.target.value) | 360;
    if (newValue < 0) newValue = 0;
    if (newValue > 360) newValue = 360;
    setArcEnd(newValue);
  };

  const handleArcOffsetChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (disabled) return;
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
