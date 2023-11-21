import Paginator from "import/components/micro/Paginator";
import RadioGroup from "import/components/micro/RadioGroup";
import { Tponto } from "public/entidades";
import { useEffect, useState } from "react";

type PropsType = {
  points: Array<Tponto>;
  setPoints: (points: Array<Tponto>) => void;
};

const PointCustomization: React.FC<PropsType> = ({ points, setPoints }) => {
  const [curr, setCurr] = useState(0);
  const [size, setSize] = useState("1");
  const [disableSize, setDisableSize] = useState(true);

  const selectedPoints = points.filter((point) => point.selected);

  const handleDisplayChange = (option: number) => {
    const thisPoint = selectedPoints[curr];
    if (!thisPoint) return;
    const updatedPoints = [...points].map((point) =>
      point.id == thisPoint.id ? { ...point, destaque: option } : point,
    );
    setPoints(updatedPoints);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    const thisPoint = selectedPoints[curr];
    let tamanho = size.length > 0 ? parseFloat(size) : 0;
    if (tamanho < 0) tamanho = 0;
    if (!thisPoint) return;
    const updatedPoints = [...points].map((point) =>
      point.id == thisPoint.id ? { ...point, tamanho: tamanho / 10 } : point,
    );
    setPoints(updatedPoints);
  }, [size]);

  useEffect(() => {
    const thisPoint = selectedPoints[curr];
    if (thisPoint && thisPoint.destaque != 0) {
      setDisableSize(false);
    } else {
      setDisableSize(true);
    }
  }, [selectedPoints]);

  return (
    <div className="flex flex-col gap-1 text-c_scnd">
      <div className="flex w-full flex-row flex-nowrap justify-between">
        <div className="mr-4 overflow-hidden whitespace-nowrap text-sm italic text-c_scnd2 text-opacity-50">
          {selectedPoints.length} pontos selecionados
        </div>
        <Paginator
          curr={curr}
          setCurr={setCurr}
          total={selectedPoints.length}
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <RadioGroup
          labelText="Destaque"
          onChange={(option) => handleDisplayChange(option)}
          value={selectedPoints[curr] ? selectedPoints[curr]!.destaque : 0}
          disabled={selectedPoints[curr] ? false : true}
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
        <div
          className={`flex w-full flex-row items-center gap-1 overflow-hidden p-1 ${
            disableSize ? "text-c_disabled" : "text-c_scnd"
          }`}
        >
          <label htmlFor="sizeInput" className="block h-full text-sm">
            Tamanho:
          </label>
          <input
            type="number"
            name="sizeInput"
            disabled={disableSize}
            onChange={handleSizeChange}
            className="block w-16 bg-c_base p-1 text-center focus:underline focus:outline-none"
            value={size}
          />
        </div>
      </div>
    </div>
  );
};

export default PointCustomization;
