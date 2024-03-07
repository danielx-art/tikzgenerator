import type { TangId } from "public/entidades";
import ColorChanger from "../ColorChanger";
import { DEFAULT_ANGLE_STYLE, LATEX_COLOR } from "public/generalConfigs";
import { useEffect, useState } from "react";
import useStore from "import/utils/store/useStore";
import myStore from "import/utils/store/store";
import CyclicBtn from "import/components/micro/CyclicBtn";
import AngDisplay from "./AngDisplay";

type PropsType = {
  angId: TangId | undefined;
};

const AngleColorAndFill: React.FC<PropsType> = ({ angId }) => {
  const [style, setStyle] = useState(DEFAULT_ANGLE_STYLE);

  const store = useStore(myStore, (state) => state);

  const thisAngle = useStore(
    myStore,
    (state) => angId && state.angles.get(angId),
  );

  useEffect(() => {
    if (!thisAngle || !angId) {
      return;
    }
    if (!thisAngle) return;
    setStyle(thisAngle.dotstyle);
  }, [thisAngle, store]);

  useEffect(() => {
    if (!angId || !store || !thisAngle) return;
    const updatedAngles = new Map(store.angles);
    updatedAngles.set(angId, { ...thisAngle, dotstyle: style });
    store.setAngles(updatedAngles);
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
