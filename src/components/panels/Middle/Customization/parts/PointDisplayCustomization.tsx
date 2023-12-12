import RadioGroup from "import/components/micro/RadioGroup";
import { getEntityKind } from "import/utils/miscEntity";
import { type Action, type State } from "import/utils/store";
import { type Tpoint } from "public/entidades";
import { DEFAULT_POINT_SIZE } from "public/generalConfigs";
import { useEffect, useState } from "react";

type PropsType = {
  store: State & Action;
  point: Tpoint | undefined;
};

const PointDisplayCustomization: React.FC<PropsType> = ({
  store,
  point,
}) => {
  const [is_size_disabled, setIs_size_disabled] = useState(true);
  const [size, setSize] = useState(`${point?.size || DEFAULT_POINT_SIZE}`);

  const { points, setPoints } = store;

  const handleDisplayChange = (option: number) => {
    if (!point || getEntityKind(point) != "point") return;
    const updatedPoints = new Map(points);
    const newSize = size.length>0? (parseFloat(size) > 0 ? parseFloat(size) : 0):0
    updatedPoints.set(point.id, {...point, dotstyle: option, size: newSize });
    setPoints(updatedPoints);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    if (!point || getEntityKind(point) != "point") return;
    const updatedPoints = new Map(points);
    const newSize = size.length>0? (parseFloat(size) > 0 ? parseFloat(size) : 0):0
    updatedPoints.set(point.id, {...point, size: newSize });
    setPoints(updatedPoints);
  }, [size]);

  useEffect(() => {
    if (point && point.dotstyle != 0) {
      setIs_size_disabled(false);
    } else {
      setIs_size_disabled(true);
    }
  }, [point]);

  return (
    <div
      className={`mb-2 flex w-full flex-col gap-2 ${
        point ? "text-c_scnd" : "text-c_scnd2 text-opacity-80"
      }`}
    >
      <div>Destaque</div>
      <div className="flex w-full flex-row">
        <RadioGroup
          onChange={(option) => handleDisplayChange(option)}
          value={point ? point!.dotstyle : 0}
          disabled={point ? false : true}
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
            is_size_disabled ? "text-c_disabled" : "text-c_scnd"
          }`}
        >
          <label htmlFor="sizeInput" className="flex h-full items-center pl-2">
            Tamanho:
          </label>
          <input
            type="number"
            name="sizeInput"
            disabled={is_size_disabled}
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
