import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import type { TallId, Ttag, TtagId } from "public/entidades";
import { vec, vector } from "public/vetores";
import { useEffect, useState } from "react";

type PropsType = {
  thisTagId: TtagId | undefined;
};

const TagDirectionChanger: React.FC<PropsType> = ({
  thisTagId,
}) => {
  const [direction, setDirection] = useState(vec(0, 1));
  
  const store = useStore(myStore, (state) => state);

  function getRoundedCounterFromTag(atag: Ttag) {
    const foundPos = vec(atag.pos.x, atag.pos.y);
    return getRoundedCounterFromDir(foundPos);
  }

  function getRoundedCounterFromDir(apos: vector) {
    if (apos.mag() == 0) {
      return 8;
    }
    let aposHeading = Math.round((apos.heading() * 180) / Math.PI);
    aposHeading < 0 ? (aposHeading += 360) : null;
    let updatedCounter = aposHeading / 45 - 2;
    if(updatedCounter < 0) updatedCounter += 8;
    return updatedCounter
  }

  useEffect(() => {
    if (!store || !thisTagId) return;
    const thisTag = store.tags.get(thisTagId)!;
    //recreate the vector from zustand:
    setDirection(vec(thisTag.pos.x, thisTag.pos.y));    
  }, [store, thisTagId]);

  const handleDirectionChange = () => {
    if (!store || !thisTagId) return;
    const thisTag = store.tags.get(thisTagId)!;
    const newCounter = (getRoundedCounterFromTag(thisTag) + 1) % 9;
    const updatedDir = vec(0, 1).rotate((newCounter * Math.PI) / 4);
    const updatedTags = new Map(store.tags);
    updatedTags.set(thisTagId, {...thisTag, pos: updatedDir});
    store.setTags(updatedTags);
    setDirection(updatedDir);
  };

  return (
    <div className="flex flex-row flex-nowrap gap-2">
      <div className="grid place-items-center">Orientação: </div>
      <button className={``} onClick={handleDirectionChange}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`h-6 w-6`}
          style={{ rotate: `${-45 * getRoundedCounterFromDir(direction) + 180}deg` }}
        >
          {getRoundedCounterFromDir(direction) != 8 ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
            />
          ) : (
            <>
              <circle cx={12} cy={12} r={6} />
              <circle cx={12} cy={12} r={2} fill="black" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
};

export default TagDirectionChanger;
