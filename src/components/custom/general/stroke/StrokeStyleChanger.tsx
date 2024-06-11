import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import RadioGroup from "import/components/micro/RadioGroup";
import { getEntityById } from "import/utils/storeHelpers/entityGetters";
import type { TentId } from "public/entidades";
import { STROKE_STYLES, initConfigs } from "public/generalConfigs";
import { useState, useEffect } from "react";
import configStore from "import/utils/store/configStore";

type PropsType = {
  entId: TentId | undefined;
};

export const STROKE_STYLE_OPTIONS = [
  "solid",
  "dashed-0.5-1",
  "dotted",
] as Array<STROKE_STYLES>;

const StrokeStyleChanger: React.FC<PropsType> = ({ entId }) => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state) => state);
  const thisEnt = useStore(
    myStore,
    (state) => entId && getEntityById(entId, state),
  );

  const [style, setStyle] = useState<STROKE_STYLES>(
    configs?.DEFAULT_STROKE_STYLE || initConfigs.DEFAULT_STROKE_STYLE,
  );
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!thisEnt || !("stroke" in thisEnt)) {
      setDisabled(true);
      return;
    }
    setStyle(thisEnt.stroke.style);
    setDisabled(false);
  }, [thisEnt]);

  useEffect(() => {
    if (!thisEnt || !("stroke" in thisEnt) || !store || disabled) return;

    const newEnt = { ...thisEnt, stroke: { ...thisEnt.stroke, style: style } };

    store.update(newEnt);
  }, [style]);

  const handleDisplayChange = (option: number) => {
    if (!entId || !store || disabled) return;
    if (!STROKE_STYLE_OPTIONS[option]) return;
    setStyle(STROKE_STYLE_OPTIONS[option]!);
  };

  return (
    <div className={`flex flex-row flex-wrap gap-2`}>
      <div className="grid items-center">Estilo: </div>
      <div className="flex flex-row">
        <RadioGroup
          onChange={(option) => handleDisplayChange(option)}
          value={entId && store ? STROKE_STYLE_OPTIONS.indexOf(style) : 0}
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
