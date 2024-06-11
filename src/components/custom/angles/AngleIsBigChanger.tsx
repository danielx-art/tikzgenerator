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
    if (thisAngle) {
      setIsBigAngle(thisAngle.isBigAngle);
    } else {
      setDisabled(true);
    }
  }, [thisAngle]);

  useEffect(() => {
    if (!store || !thisAngle) return;
    if (isBigAngle === thisAngle.isBigAngle) return;

    store.update({
      ...thisAngle,
      isBigAngle: isBigAngle,
    });

  }, [isBigAngle]);

  return (
    <div className={`w-fit flex flex-row flex-nowrap ${disabled ? "opacity-50": "opacity-100"}`}>
      <Switcher isChecked={isBigAngle} setIsChecked={setIsBigAngle}/>
      <div className={isBigAngle ? " text-foreground" : " text-foreground/70"}> Ângulo Maior </div>
    </div>
  );
};

export default AngleIsBigChanger;
