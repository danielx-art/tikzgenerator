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
  getMapSetterKind,
} from "import/utils/storeHelpers/miscEntity";

type PropsType = {
  entityId: TentId | undefined;
};

const EntityColorChanger: React.FC<PropsType> = ({ entityId }) => {
  const [selectedColor, setSelectedColor] = useState<LATEX_COLOR>("black");
  const [disabled, setDisabled] = useState(true);

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!store || !entityId) {
      setDisabled(true);
      return;
    }

    const thisEntity = getEntityById(entityId, store);

    if (!thisEntity || !store.selections.includes(thisEntity.id)) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
    setSelectedColor(thisEntity.color as LATEX_COLOR);
  }, [entityId, store]);

  useEffect(() => {
    if (!entityId || !store || disabled) return;
    const kind = getKindById(entityId);
    const thisEntity = getEntityById(entityId, store);
    const thisMap = getMapByKind(kind, store);
    if (!thisMap) return;
    const updatedMap = new Map(thisMap as any);
    updatedMap.set(entityId, { ...thisEntity, color: selectedColor });
    const setter = getMapSetterKind(kind, store);
    if (!setter) return;
    setter(updatedMap as any);
  }, [selectedColor]);

  return (
    <div className="flex flex-row flex-nowrap gap-2">
      <div className="grid items-center">Cor:</div>
      <div>
        {
          <ColorSelect
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            disabled={disabled}
            key={`ColorSelect_${entityId ? entityId : "empty"}`}
          />
        }
      </div>
    </div>
  );
};

export default EntityColorChanger;
