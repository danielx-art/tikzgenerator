import Switcher from "import/components/micro/Switcher";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { TangId } from "public/entidades";
import { useEffect, useState } from "react";

type PropsType = {
  angId: TangId | undefined;
};

const AngleIsBigChanger: React.FC<PropsType> = ({ angId }) => {
  const store = useStore(myStore, (state) => state);
  const thisAngle = useStore(
    myStore,
    (state) => angId && state.angles.get(angId),
  );

  const [isBigAngle, setIsBigAngle] = useState<boolean>(
    thisAngle?.isBigAngle || false,
  );
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (angId && store && thisAngle) {
      setIsBigAngle(thisAngle.isBigAngle);
    } else {
      setDisabled(true);
    }
  }, [store, thisAngle]);

  useEffect(() => {
    if (!angId || !store || !thisAngle) return;
    if (isBigAngle === thisAngle.isBigAngle) return;
    const updatedAngles = new Map(store.angles);
    updatedAngles.set(angId, {
      ...thisAngle,
      isBigAngle: isBigAngle,
    });
    store.setAngles(updatedAngles);
  }, [isBigAngle]);

  return (
    <div className="w-fit flex flex-row flex-nowrap">
      <Switcher isChecked={isBigAngle} setIsChecked={setIsBigAngle} />
      <div className={isBigAngle ? " text-foreground_int" : " text-foreground opacity-70"}> Ângulo Maior </div>
    </div>
  );
};

export default AngleIsBigChanger;
