import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { TentId } from "public/entidades";
import { useEffect, useState } from "react";
import { getEntityById } from "import/utils/storeHelpers/entityGetters";

type PropsType = {
  entId: TentId | undefined;
  atrName?: "stroke" | "fill";
};

const OpacityChanger: React.FC<PropsType> = ({ entId, atrName }) => {
  const [opacity, setOpacity] = useState<number>(1);
  const [disabled, setDisabled] = useState(true);

  const store = useStore(myStore, (state) => state);
  const thisEnt = useStore(
    myStore,
    (state) => entId && getEntityById(entId, state),
  );

  useEffect(() => {
    if (!store || !thisEnt) {
      setDisabled(true);
      return;
    }

    if (!atrName && "opacity" in thisEnt) {
      setDisabled(false);
      setOpacity(thisEnt.opacity);
      return;
    }

    if (atrName === "stroke" && "stroke" in thisEnt) {
      setDisabled(false);
      setOpacity(thisEnt["stroke"].opacity);
      return;
    }

    if (atrName === "fill" && "fill" in thisEnt) {
      setDisabled(false);
      setOpacity(thisEnt["fill"].opacity);
      return;
    }
  }, [thisEnt, store]);

  useEffect(() => {
    if (!thisEnt || !store || disabled) return;

    if (atrName && atrName === "stroke" && "stroke" in thisEnt) {
      const newEnt = {
        ...thisEnt,
        stroke: { ...thisEnt.stroke, opacity: opacity },
      };
      store.update(newEnt);
    }
    if (atrName && atrName === "fill" && "fill" in thisEnt) {
      const newEnt = {
        ...thisEnt,
        fill: { ...thisEnt.fill, opacity: opacity },
      };
      store.update(newEnt);
    }
    if (!atrName && "opacity" in thisEnt) {
      const newEnt = {
        ...thisEnt,
        opacity: opacity,
      };
      store.update(newEnt);
    }
  }, [opacity]);

  const handleOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!entId || !store || disabled) return;
    let newValue = parseFloat(event.target.value);
    if (newValue < 0) newValue = 0;
    if (newValue > 1) newValue = 1;
    setOpacity(newValue);
  };

  return (
    <div className={`flex flex-row flex-nowrap gap-2`}>
      <div className="grid items-center">Opacidade:</div>
      <input
        type="number"
        name="opacityInput"
        step={0.1}
        onChange={handleOpacityChange}
        disabled={disabled}
        className={`inline w-20 bg-background p-1 text-center focus:underline focus:outline-none ${
          opacity === 0 ? "text-foreground" : "text-black"
        }`}
        value={opacity}
      />
    </div>
  );
};

export default OpacityChanger;
