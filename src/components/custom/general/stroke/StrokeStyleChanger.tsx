import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import RadioGroup from "import/components/micro/RadioGroup";
import {
  getEntityById,
  getKindById,
  getMapByKind,
  getSetterByKind,
} from "import/utils/storeHelpers/entityGetters";
import type { TentId } from "public/entidades";
import { STROKE_STYLES, DEFAULT_STROKE_STYLE } from "public/generalConfigs";
import { useState, useEffect } from "react";

type PropsType = {
  entId: TentId | undefined;
};

const OptionsMap = ["solid", "dashed-0.5-1", "dotted"] as Array<STROKE_STYLES>;

const StrokeStyleChanger: React.FC<PropsType> = ({ entId }) => {
  const [style, setStyle] = useState<STROKE_STYLES>(DEFAULT_STROKE_STYLE);
  const [disabled, setDisabled] = useState(true);

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!store || !entId) {
      setDisabled(true);
      return;
    }
    const ent = getEntityById(entId, store);
    if (!ent || !("stroke" in ent)) return;
    setStyle(ent.stroke.style);
    setDisabled(false);
  }, [entId, store]);

  useEffect(() => {
    if (!entId || !store || disabled) return;
    const kind = getKindById(entId as TentId);
    const entMap = getMapByKind(kind, store);
    const entSetter = getSetterByKind(kind, store);
    if (!entMap || !entSetter) return;
    const updatedEntities = new Map(entMap);
    const newStyle = style; //future add customizing dashes
    const ent = getEntityById(entId, store);
    if (!ent || !("stroke" in ent)) return;
    updatedEntities.set(entId, {
      ...ent,
      stroke: { ...ent.stroke, style: newStyle },
    } as any);
    entSetter(updatedEntities as any);
  }, [style]);

  const handleDisplayChange = (option: number) => {
    if (!entId || !store || disabled) return;
    if (!OptionsMap[option]) return;
    setStyle(OptionsMap[option]!);
  };

  return (
    <div className={`flex flex-row flex-wrap gap-2`}>
      <div className="grid items-center">Estilo: </div>
      <div className="flex flex-row">
        <RadioGroup
          onChange={(option) => handleDisplayChange(option)}
          value={entId && store ? OptionsMap.indexOf(style) : 0}
          disabled={entId ? false : true}
        >
          <div className="h-4 w-8">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="10%"
                y1="50%"
                x2="90%"
                y2="50%"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="h-4 w-8">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="10%"
                y1="50%"
                x2="90%"
                y2="50%"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="5, 5"
              />
            </svg>
          </div>
          <div className="h-4 w-8">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="10%"
                y1="50%"
                x2="90%"
                y2="50%"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1, 5"
              />
            </svg>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default StrokeStyleChanger;
