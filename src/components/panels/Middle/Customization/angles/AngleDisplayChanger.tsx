import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { getKindById } from "import/utils/storeHelpers/miscEntity";
import { TangId, Tangle } from "public/entidades";
import MultipleRadioGroup from "import/components/micro/MultipleRadioGroup";
import { vec } from "import/utils/math/vetores";

type PropsType = {
  angId: TangId | undefined;
};

const Options = { marks: [0, 1, 2, 3], lines: [0, 1, 2, 3] };

const AngleDisplayChanger: React.FC<PropsType> = ({ angId }) => {
  const store = useStore(myStore, (state) => state);

  const [selectedOption, setSelectedOption] = useState();

  const handleDisplayChange = (option: number) => {
    if (!angId || getKindById(angId) != "angle" || !store) return;
    const updatedAngles = new Map(store.angles);
    const angle = store.angles.get(angId) as Tangle;
    updatedAngles.set(angId, {
      ...angle,
      style: OptionsMap[option] || "solid",
    });
    store.setSegments(updatedAngles);
  };

  return (
    <div className={`flex flex-row flex-nowrap gap-2`}>
      <div className="grid items-center">Estilo: </div>
      <div className="flex w-full flex-row">
        <MultipleRadioGroup
          onChange={(option) => handleDisplayChange(option)}
          value={
            angId && store && store.segments.get(angId)
              ? OptionsMap.indexOf(store.segments.get(angId)!.style)
              : 0
          }
          disabled={angId ? false : true}
        ></MultipleRadioGroup>
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
};

const AngDisplay: React.FC<AngDisplayProps> = ({
  r = 3,
  ang = (45 * Math.PI) / 180,
  numMarks = 0,
  numDoubles = 0,
  markLen = 2,
  doubleDist = 2,
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
    marks = <path strokeWidth="0.05" fill="none" d={dMarks} />;
  }

  if (numDoubles > 0) {
    let dDoubles = ``;
    for (let i = 0; i < numDoubles; i++) {
      const thisRad = r - doubleDist * (i + 1);
      const initialPoint = vec().copy(start).setMag(thisRad);
      const finalPoint = vec().copy(start).setMag(thisRad).rotate(ang);
      dDoubles += ` M ${initialPoint.x} ${initialPoint.y} A ${r} ${r} 0 0 1 ${finalPoint.x} ${finalPoint.y}  `;
    }
    doubles = <path strokeWidth="0.05" fill="none" d={dDoubles} />;
  }

  return (
    <div className="h-6 w-6">
      <svg>
        <path
          strokeWidth="0.05"
          fill="none"
          d={`M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y} `}
        />
        {marks && marks}
        {doubles && doubles}
      </svg>
    </div>
  );
};
