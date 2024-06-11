import type { TangId } from "public/entidades";
import ColorChanger from "../ColorChanger";
import { LATEX_COLOR, initConfigs } from "public/generalConfigs";
import { useEffect, useState } from "react";
import useStore from "import/utils/store/useStore";
import myStore from "import/utils/store/store";
import CyclicBtn from "import/components/micro/CyclicBtn";
import AngDisplay from "./AngDisplay";
import configStore from "import/utils/store/configStore";

type PropsType = {
  angId: TangId | undefined;
};

const AngleColorAndFill: React.FC<PropsType> = ({ angId }) => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state)=>state);
  const thisAngle = useStore(
    myStore,
    (state) => angId && state.angles.get(angId),
  );
  
  const [style, setStyle] = useState(configs?.DEFAULT_ANGLE_STYLE || initConfigs.DEFAULT_ANGLE_STYLE);

  useEffect(() => {
    if (!thisAngle) {
      return;
    }
    setStyle(thisAngle.dotstyle);
  }, [thisAngle]);

  useEffect(() => {
    if (!store || !thisAngle) return;
    
    store.update({ ...thisAngle, dotstyle: style });
    
  }, [style]);

  const handleStyleChange = (newStyle: number) => {
    if (!angId || !store || !thisAngle) return;
    setStyle(newStyle);
  };

  return (
    <div className="flex flex-1 flex-row gap-2">
      <ColorChanger entId={angId} />
      <div className="self-end">
        <CyclicBtn
          initOption={thisAngle && thisAngle.dotstyle}
          onChange={handleStyleChange}
        >
          <AngDisplay />
          <AngDisplay
            fill={thisAngle ? (thisAngle.color as LATEX_COLOR) : "black"}
            fillOpacity={0.6}
          />
        </CyclicBtn>
      </div>
    </div>
  );
};

export default AngleColorAndFill;
