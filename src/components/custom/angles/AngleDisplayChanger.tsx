import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import type { TangId } from "public/entidades";
import MultipleRadioGroup from "import/components/micro/MultipleRadioGroup";
import { ANGLE_MARKS_TYPE } from "public/generalConfigs";
import { useEffect, useState } from "react";
import AngDisplay from "./AngDisplay";

type PropsType = {
  angId: TangId | undefined;
};

const AngleDisplayChanger: React.FC<PropsType> = ({ angId }) => {
  const store = useStore(myStore, (state) => state);
  const thisAngle = useStore(
    myStore,
    (state) => angId && state.angles.get(angId),
  );

  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (thisAngle) {
      const angleMarks = thisAngle.marks;
      const [btnIndex, optionIndex] = parseMarks(angleMarks);
      setSelectedButton(btnIndex);
      setSelectedOption(optionIndex);
    }
  }, [thisAngle]);

  useEffect(() => {
    if (selectedButton !== null && selectedOption !== null) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedButton, selectedOption]);

  const parseMarks = (marks?: ANGLE_MARKS_TYPE): [number, number] => {
    if (!marks) return [0, 0];
    const parts = marks.split("-");
    const btnIndex = parts[0] === "marks" ? 0 : 1;
    const optionIndex = parts[1] ? parseInt(parts[1], 10) : 0;
    return [btnIndex, optionIndex];
  };

  const handleDisplayChange = (btnIndex: number, optionSel: number) => {
    if (!angId || !store || !thisAngle) return;

    const possibleMarks = ["marks", "doubles"];
    const newMark = possibleMarks[btnIndex]
      ? `${possibleMarks[btnIndex]}-${optionSel}`
      : "marks-0";
    
    store.update({
      ...thisAngle,
      marks: newMark as ANGLE_MARKS_TYPE,
    });
  };

  if (thisAngle && (thisAngle.valor * 180) / Math.PI === 90) {
    return;
  }

  return (
    <div className={`flex flex-row flex-nowrap gap-2`}>
      <div className="grid items-center">Destaques: </div>
      <div className="flex w-fit flex-row">
        {!disabled && selectedButton !== null && selectedOption !== null && (
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
