import { type Action, type State } from "import/utils/store";
import { type Tentity, type Ttag } from "public/entidades";
import { vec } from "public/vetores";
import { useEffect, useState } from "react";

type PropsType = {
  store: State & Action;
  thisEntity: Tentity | Ttag | undefined;
  thisTag: Ttag | undefined;
};

const TagDirectionChanger: React.FC<PropsType> = ({
  store,
  thisEntity,
  thisTag,
}) => {
  const [counterDirBtn, setCounterDirBtn] = useState(0);
  const [direction, setDirection] = useState(vec(0, 0));

  useEffect(() => {
    if (!store || !thisEntity || !thisTag) return;
    const foundPos = vec(thisTag.pos.x, thisTag.pos.y); //have to re-create the vec here, for some reason I think zustand vanished with the vector methods, and it goes without typescript noticing.
    const angle =
      (foundPos.heading() * 180) / Math.PI - 90 + counterDirBtn * 45;
    const updatedDirection = vec(0, 1).rotate(angle);
    const updatedTags = new Map(store.tags);
    updatedTags.set(thisTag.id, {...thisTag, pos: updatedDirection});
    store.setTags(updatedTags);
    setDirection(updatedDirection);
  }, [thisEntity, thisTag, counterDirBtn]);

  const handleDirectionChange = () => {
    const newCounter = (counterDirBtn + 1) % 8;
    const updatedDir = vec(0, 1).rotate((newCounter * Math.PI) / 4);
    setDirection(updatedDir);
    setCounterDirBtn(newCounter);
  };

  return (
    <div className="flex w-full flex-row flex-nowrap gap-2">
      <div className="grid place-items-center">Orientação: </div>
      <button className={``} onClick={handleDirectionChange}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`h-6 w-6`}
          style={{ rotate: `${45 * counterDirBtn}deg` }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
          />
        </svg>
      </button>
    </div>
  );
};

export default TagDirectionChanger;
