import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { getKindById } from "import/utils/storeHelpers/miscEntity";
import { TangId, Tangle } from "public/entidades";
import MultipleRadioGroup from "import/components/micro/MultipleRadioGroup";
import { vec } from "import/utils/math/vetores";
import { ANGLE_MARKS, ANGLE_MARKS_TYPE } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  angId: TangId | undefined;
};

const AngleDisplayChanger: React.FC<PropsType> = ({ angId }) => {
  const store = useStore(myStore, (state) => state);
  const thisAngle = useStore(myStore, (state) => angId && state.angles.get(angId));

  const [selectedButton, setSelectedButton] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number>(0);

  useEffect(() => {
    if (angId && store && thisAngle) {
      const angleMarks = thisAngle.marks;
      const [btnIndex, optionIndex] = parseMarks(angleMarks);
      setSelectedButton(btnIndex);
      setSelectedOption(optionIndex);
    } else {
      setSelectedButton(0);
      setSelectedOption(0);
    }
  }, [angId, store, store?.angles]);

  const parseMarks = (marks: ANGLE_MARKS_TYPE): [number, number] => {
    const parts = marks.split("-");
    const btnIndex = parts[0] === "marks" ? 0 : 1;
    const optionIndex = parseInt(parts[1]!, 10);
    return [btnIndex, optionIndex];
  };

  const handleDisplayChange = (btnIndex: number, optionSel: number) => {
    if (!angId || getKindById(angId) != "angle" || !store) return;
    const updatedAngles = new Map(store.angles);
    thisAngle
    if(!thisAngle) return;
    const possibleMarks = ["marks", "doubles"];
    const newMark = possibleMarks[btnIndex]
      ? `${possibleMarks[btnIndex]}-${optionSel}`
      : "marks-0";
    updatedAngles.set(angId, {
      ...thisAngle,
      marks: newMark as ANGLE_MARKS_TYPE,
    });
    store.setAngles(updatedAngles);
  };

  const initialButtonAndOption = (
    angleMarks?: ANGLE_MARKS_TYPE,
  ): [number, number] => {
    if(!angleMarks) return [0,0];
    const parts = angleMarks.split("-");
    const btnIndex = parts[0] === "marks" ? 0 : 1;
    const optionIndex = parseInt(parts[1]!, 10);
    return [btnIndex, optionIndex];
  };

  angId ? console.log("AngleDisplayChager going initial: "+initialButtonAndOption(store?.angles?.get(angId)?.marks)) : null; //debugg

  return (
    <div className={`flex flex-row flex-nowrap gap-2`}>
      <div className="grid items-center">Destaques: </div>
      <div className="flex w-full flex-row">
        {angId && store && store.angles.get(angId) && (
           <MultipleRadioGroup
           onChange={handleDisplayChange}
           initBtnSelected={selectedButton}
           initOptionSelected={selectedOption}
           disabled={!angId}
         >
            <div key="angle_marks_changer_0">
              <AngDisplay numMarks={0} />
              <AngDisplay numMarks={1} />
              <AngDisplay numMarks={2} />
              <AngDisplay numMarks={3} />
            </div>
            <div key="angle_marks_changer_1">
              <AngDisplay numDoubles={0} />
              <AngDisplay numDoubles={1} />
              <AngDisplay numDoubles={2} />
              <AngDisplay numDoubles={3} />
            </div>
          </MultipleRadioGroup>
        )}
      </div>
    </div>
  );
};

export default AngleDisplayChanger;

type AngDisplayProps = {
  r?: number;
  ang?: number;
  numMarks?: number;
  numDoubles?: number;
  markLen?: number;
  doubleDist?: number;
  strokeWidth?: number;
};

const AngDisplay: React.FC<AngDisplayProps> = ({
  r = 16,
  ang = (60 * Math.PI) / 180,
  numMarks = 0,
  numDoubles = 0,
  markLen = 10,
  doubleDist = 3,
  strokeWidth = 2,
}) => {
  const start = vec(r, 0);
  const end = vec().copy(start).rotate(ang);
  let marks;
  let doubles;

  if (numMarks > 0) {
    const numDiv = numMarks + 1;
    let dMarks = ``;
    for (let i = 0; i < numMarks; i++) {
      const initialPoint = vec()
        .copy(start)
        .setMag(r - markLen / 2)
        .rotate((ang * (i + 1)) / numDiv);
      const finalPoint = vec()
        .copy(start)
        .setMag(r + markLen / 2)
        .rotate((ang * (i + 1)) / numDiv);
      dMarks += ` M ${initialPoint.x} ${initialPoint.y} L ${finalPoint.x} ${finalPoint.y} `;
    }
    marks = (
      <path
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        d={dMarks}
        key={`angdisplaymarks`}
      />
    );
  }

  if (numDoubles > 0) {
    let dDoubles = ``;
    for (let i = 0; i < numDoubles; i++) {
      const thisRad = r - doubleDist * (i + 1);
      const initialPoint = vec().copy(start).setMag(thisRad);
      const finalPoint = vec().copy(start).setMag(thisRad).rotate(ang);
      dDoubles += ` M ${initialPoint.x} ${initialPoint.y} A ${r} ${r} 0 0 1 ${finalPoint.x} ${finalPoint.y}  `;
    }
    doubles = (
      <path
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        d={dDoubles}
        key={`angdisplaydoubles`}
      />
    );
  }

  return (
    <div className="h-6 w-6">
      <svg className="grid h-full w-full items-center overflow-visible">
        <g className="translate-y-[75%] scale-y-[-1]">
          <path
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            d={`M 0 0 L ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y} Z`}
          />
          {marks && marks}
          {doubles && doubles}
        </g>
      </svg>
    </div>
  );
};
