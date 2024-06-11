import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import ColorSelect from "import/components/micro/ColorSelect";
import type { TentId } from "public/entidades";
import { LATEX_COLOR } from "public/generalConfigs";
import { useEffect, useState } from "react";
import { getEntityById } from "import/utils/storeHelpers/entityGetters";

type PropsType = {
  entId: TentId | undefined;
  atrName?: "stroke" | "fill";
};

const ColorChanger: React.FC<PropsType> = ({ entId, atrName }) => {
  const [selectedColor, setSelectedColor] = useState<LATEX_COLOR>("black");
  const [disabled, setDisabled] = useState(true);

  const store = useStore(myStore, (state) => state);
  const thisEnt = useStore(
    myStore,
    (state) => entId && getEntityById(entId, state),
  );

  useEffect(() => {
    if (!thisEnt) {
      setDisabled(true);
      return;
    }

    if (!atrName && "color" in thisEnt) {
      setDisabled(false);
      setSelectedColor(thisEnt.color);
      return;
    }

    if (atrName === "stroke" && "stroke" in thisEnt) {
      setDisabled(false);
      setSelectedColor(thisEnt["stroke"].color);
      return;
    }

    if (atrName === "fill" && "fill" in thisEnt) {
      setDisabled(false);
      setSelectedColor(thisEnt["fill"].color);
      return;
    }
  }, [thisEnt]);

  useEffect(() => {
    if (!thisEnt || !store || disabled) return;

    if (atrName && atrName === "stroke" && "stroke" in thisEnt) {
      const newEnt = {
        ...thisEnt,
        stroke: { ...thisEnt.stroke, color: selectedColor },
      };
      store.update(newEnt);
    }
    if (atrName && atrName === "fill" && "fill" in thisEnt) {
      const newEnt = {
        ...thisEnt,
        fill: { ...thisEnt.fill, color: selectedColor },
      };
      store.update(newEnt);
    }
    if (!atrName && "color" in thisEnt) {
      const newEnt = {
        ...thisEnt,
        color: selectedColor,
      };
      store.update(newEnt);
    }
  }, [selectedColor]);

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="grid items-center">Cor:</div>
      <div>
        {
          <ColorSelect
            id={`${entId}_${atrName}_color_changer`}
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
