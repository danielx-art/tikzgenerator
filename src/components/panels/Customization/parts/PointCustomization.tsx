import Paginator from "import/components/micro/Paginator";
import RadioGroup from "import/components/micro/RadioGroup";
import { Tponto } from "public/entidades";
import { useState } from "react";

type PropsType = {
  points: Array<Tponto>;
  setPoints: (points: Array<Tponto>) => void;
};

const PointCustomization: React.FC<PropsType> = ({ points, setPoints }) => {
  const [curr, setCurr] = useState(0);

  const elements = points.filter((point) => point.selected);

  const handleDisplayChange = (option: number) => {
    const thisPoint = elements[curr];
    if (!thisPoint) return;
    const updatedPoints = [...points].map((point) =>
      point.id == thisPoint.id ? { ...point, destaque: option } : point,
    );
    setPoints(updatedPoints);
  };

  return (
    <div className="flex flex-col gap-1 text-c_scnd">
      <div className="flex w-full flex-row flex-nowrap justify-between">
        <div className="mr-4 overflow-hidden whitespace-nowrap text-sm italic text-c_scnd2 text-opacity-50">
          {elements.length} pontos selecionados
        </div>
        <Paginator curr={curr} setCurr={setCurr} total={elements.length} />
      </div>
      <div className="w-full">
        <RadioGroup
          labelText="Destaque"
          onChange={(option) => handleDisplayChange(option)}
          value={elements[curr] ? elements[curr]!.destaque : 0}
          disabled={elements[curr] ? false : true}
        >
          <div>Nenhum</div>
          <div className="h-4 w-4">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="8"
                cy="8"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <div className="h-4 w-4">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="8"
                cy="8"
                r="5"
                stroke="none"
                strokeWidth="none"
                fill="currentColor"
              />
            </svg>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default PointCustomization;
