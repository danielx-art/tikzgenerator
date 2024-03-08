import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import ColorSelect from "import/components/micro/ColorSelect";
import type { TentId } from "public/entidades";
import { LATEX_COLOR } from "public/generalConfigs";
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

const ColorChanger: React.FC<PropsType> = ({ entId, atrName }) => {
  const [selectedColor, setSelectedColor] = useState<LATEX_COLOR>("black");
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

    if (!atrName && "color" in thisEntity) {
      setDisabled(false);
      setSelectedColor(thisEntity.color);
      return;
    }

    if (atrName === "stroke" && "stroke" in thisEntity) {
      setDisabled(false);
      setSelectedColor(thisEntity["stroke"].color);
      return;
    }

    if (atrName === "fill" && "fill" in thisEntity) {
      setDisabled(false);
      setSelectedColor(thisEntity["fill"].color);
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
        stroke: { ...ent.stroke, color: selectedColor },
      } as any);
      entSetter(updatedEntities as any);
    }
    if (atrName && atrName === "fill" && "fill" in ent) {
      updatedEntities.set(entId, {
        ...ent,
        fill: { ...ent.fill, color: selectedColor },
      } as any);
      entSetter(updatedEntities as any);
    }
    if (!atrName && "color" in ent) {
      updatedEntities.set(entId, {
        ...ent,
        color: selectedColor,
      } as any);
      entSetter(updatedEntities as any);
    }
  }, [selectedColor]);

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="grid items-center">Cor:</div>
      <div>
        {
          <ColorSelect
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            disabled={disabled}
            key={`ColorSelect_${entId ? entId : "empty"}`}
          />
        }
      </div>
    </div>
  );
};

export default ColorChanger;
