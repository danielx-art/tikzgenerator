import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { Ttag, TtagId } from "public/entidades";
import { vec, vector } from "import/utils/math/vetores";
import { useEffect, useState } from "react";

type PropsType = {
  thisTagId: TtagId | undefined;
};

const PRESET_DIRECTIONS = 12;

const TagDirectionChanger: React.FC<PropsType> = ({ thisTagId }) => {
  const [direction, setDirection] = useState(vec(0, 1));
  const [size, setSize] = useState(1);
  const [disabled, setDisabled] = useState(true);

  const store = useStore(myStore, (state) => state);
  const thisTag = useStore(
    myStore,
    (state) => thisTagId && state.tags.get(thisTagId),
  );

  function getRoundedCounterFromTag(atag: Ttag) {
    const foundPos = vec(atag.pos.x, atag.pos.y);
    return getRoundedCounterFromDir(foundPos);
  }

  function getRoundedCounterFromDir(apos: vector) {
    if (apos.mag() == 0) {
      return PRESET_DIRECTIONS;
    }
    let aposHeading = Math.round((apos.heading() * 180) / Math.PI);
    aposHeading < 0 ? (aposHeading += 360) : null;
    let updatedCounter =
      aposHeading / (360 / PRESET_DIRECTIONS) - 90 / (360 / PRESET_DIRECTIONS);
    if (updatedCounter < 0) updatedCounter += PRESET_DIRECTIONS;
    return updatedCounter;
  }

  useEffect(() => {
    if (!store || !thisTag || !store.selections.includes(thisTag.entityId)) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
    setDirection(vec(thisTag.pos.x, thisTag.pos.y));
    setSize(vec(thisTag.pos.x, thisTag.pos.y).mag());
  }, [thisTag, store]);

  const handleDirectionChange = () => {
    if (!store || !thisTag || disabled) return;

    const newCounter =
      (getRoundedCounterFromTag(thisTag) + 1) % (PRESET_DIRECTIONS + 1);
    const updatedDir = vec(0, 1)
      .rotate((newCounter * 2 * Math.PI) / PRESET_DIRECTIONS)
      .setMag(size);

    const newTag = { ...thisTag, pos: updatedDir };
    store.update(newTag);
    setDirection(updatedDir);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!store || !thisTag || disabled) return;

    const updatedSize = event.target.value
      ? parseFloat(event.target.value)
      : size;
    const updatedDir = vec()
      .copy(vec(thisTag.pos.x, thisTag.pos.y))
      .setMag(updatedSize);

    const newTag = { ...thisTag, pos: updatedDir };
    store.update(newTag);
    setSize(updatedSize);
  };

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="flex flex-row flex-nowrap gap-2">
        <div className="grid place-items-center">Orientação: </div>
        <button
          className={``}
          onClick={handleDirectionChange}
          disabled={disabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`h-6 w-6`}
            style={{
              rotate: `${
                -(360 / PRESET_DIRECTIONS) *
                  getRoundedCounterFromDir(direction) +
                180
              }deg`,
            }}
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
      <div className="flex flex-row flex-nowrap gap-2">
        <div className="grid items-center">Distância:</div>
        <input
          type="number"
          name="sizeInput"
          step={0.1}
          onChange={handleSizeChange}
          disabled={disabled}
          className="inline w-16 bg-background p-1 text-center focus:underline focus:outline-none"
          value={size}
        />
      </div>
    </div>
  );
};

export default TagDirectionChanger;
