import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { TentId } from "public/entidades";
import { useEffect, useState } from "react";
import {
  getEntityById,
  getKindById,
  getMapByKind,
  getSetterByKind,
} from "import/utils/storeHelpers/entityGetters";

type PropsType = {
  entId: TentId | undefined;
  atrName?: "stroke" | "fill";
};

const OpacityChanger: React.FC<PropsType> = ({ entId, atrName }) => {
  const [opacity, setOpacity] = useState<number>(1);
  const [disabled, setDisabled] = useState(true);

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!store || !entId) {
      setDisabled(true);
      return;
    }
    const thisEntity = getEntityById(entId, store);
    if (!thisEntity) {
      setDisabled(true);
      return;
    }

    if (!atrName && "opacity" in thisEntity) {
      setDisabled(false);
      setOpacity(thisEntity.opacity);
      return;
    }

    if (atrName === "stroke" && "stroke" in thisEntity) {
      setDisabled(false);
      setOpacity(thisEntity["stroke"].opacity);
      return;
    }

    if (atrName === "fill" && "fill" in thisEntity) {
      setDisabled(false);
      setOpacity(thisEntity["fill"].opacity);
      return;
    }
  }, [entId, store]);

  useEffect(() => {
    if (!entId || !store || disabled) return;
    const kind = getKindById(entId as TentId);
    const entMap = getMapByKind(kind, store);
    const entSetter = getSetterByKind(kind, store);
    if (!entMap || !entSetter) return;
    const updatedEntities = new Map(entMap);
    const ent = getEntityById(entId, store);
    if (!ent) return;
    if (atrName && atrName === "stroke" && "stroke" in ent) {
      updatedEntities.set(entId, {
        ...ent,
        stroke: { ...ent.stroke, opacity: opacity },
      } as any);
      entSetter(updatedEntities as any);
    }
    if (atrName && atrName === "fill" && "fill" in ent) {
      updatedEntities.set(entId, {
        ...ent,
        fill: { ...ent.fill, opacity: opacity },
      } as any);
      entSetter(updatedEntities as any);
    }
    if (!atrName && "opacity" in ent) {
      updatedEntities.set(entId, {
        ...ent,
        opacity: opacity,
      } as any);
      entSetter(updatedEntities as any);
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
        className="inline w-20 bg-c_base p-1 text-center focus:underline focus:outline-none"
        value={opacity}
      />
    </div>
  );
};

export default OpacityChanger;
