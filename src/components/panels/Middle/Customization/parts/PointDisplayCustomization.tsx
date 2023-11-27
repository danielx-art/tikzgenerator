import RadioGroup from "import/components/micro/RadioGroup";
import { type Action, type State } from "import/utils/store";
import { type Tpoint } from "public/entidades";
import { useEffect, useState } from "react";

type PropsType = {
  store: State & Action;
  thisEntity: Tpoint | undefined;
};

const PointDisplayCustomization: React.FC<PropsType> = ({
  store,
  thisEntity,
}) => {
  const [disableSize, setDisableSize] = useState(true);
  const [size, setSize] = useState("1");

  const { points, setPoints } = store;

  const thisPoint = thisEntity;

  const handleDisplayChange = (option: number) => {
    if (!thisPoint) return;
    const updatedPoints = [...points].map((point) => {
      let tamanho = size.length > 0 ? parseFloat(size)/10 : 0;
      if (tamanho < 0) tamanho = 0;
      return point.id == thisPoint.id ? { ...point, destaque: option, tamanho:tamanho } : point
    });
    setPoints(updatedPoints);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    let tamanho = size.length > 0 ? parseFloat(size)/10 : 0;
    if (tamanho < 0) tamanho = 0;
    if (!thisPoint) return;
    const updatedPoints = [...points].map((point) =>
      point.id == thisPoint.id ? { ...point, tamanho: tamanho } : point,
    );
    setPoints(updatedPoints);
  }, [size]);

  useEffect(() => {
    if (thisPoint && thisPoint.destaque != 0) {
      setDisableSize(false);
    } else {
      setDisableSize(true);
    }
  }, [thisPoint]);

  return (
    <div
      className={`mb-2 flex w-full flex-col gap-2 ${
        thisPoint ? "text-c_scnd" : "text-c_scnd2 text-opacity-80"
      }`}
    >
      <div>Destaque</div>
      <div className="flex w-full flex-row">
        <RadioGroup
          onChange={(option) => handleDisplayChange(option)}
          value={thisPoint ? thisPoint!.destaque : 0}
          disabled={thisPoint ? false : true}
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
          className={`flex w-full flex-row items-center justify-center gap-2 overflow-hidden p-1 ${
            disableSize ? "text-c_disabled" : "text-c_scnd"
          }`}
        >
          <label htmlFor="sizeInput" className="flex h-full items-center pl-2">
            Tamanho:
          </label>
          <input
            type="number"
            name="sizeInput"
            disabled={disableSize}
            onChange={handleSizeChange}
            className="inline w-10 bg-c_base p-1 text-center focus:underline focus:outline-none"
            value={size}
          />
        </div>
      </div>
    </div>
  );
};

export default PointDisplayCustomization;
