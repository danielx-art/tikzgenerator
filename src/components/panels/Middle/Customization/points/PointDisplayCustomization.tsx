import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import RadioGroup from "import/components/micro/RadioGroup";
import {
  getEntityKind,
  getKindById,
} from "import/utils/storeHelpers/miscEntity";
import { Tpoint, type TpointId } from "public/entidades";
import { DEFAULT_POINT_SIZE } from "public/generalConfigs";
import { useEffect, useLayoutEffect, useState } from "react";

type PropsType = {
  pointId: TpointId | undefined;
};

const PointDisplayCustomization: React.FC<PropsType> = ({ pointId }) => {
  const [is_size_disabled, setIs_size_disabled] = useState(true);
  const [size, setSize] = useState(`${DEFAULT_POINT_SIZE}`);

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!store || !pointId) {
      setIs_size_disabled(true);
      return;
    }
    const point = store.points.get(pointId) as Tpoint;
    if (point.dotstyle !== 0) {
      setIs_size_disabled(false);
    } else {
      setIs_size_disabled(true);
    }
    setSize(`${point.size}`);
  }, []);

  const handleDisplayChange = (option: number) => {
    if (!pointId || getKindById(pointId) != "point" || !store) return;
    const updatedPoints = new Map(store.points);
    const newSize =
      size.length > 0 ? (parseFloat(size) > 0 ? parseFloat(size) : 0) : 0;
    const point = store.points.get(pointId) as Tpoint;
    updatedPoints.set(pointId, { ...point, dotstyle: option, size: newSize });
    store.setPoints(updatedPoints);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    if (!pointId || getKindById(pointId) != "point" || !store) return;
    const updatedPoints = new Map(store.points);
    const newSize =
      size.length > 0 ? (parseFloat(size) > 0 ? parseFloat(size) : 0) : 0;
    const point = store.points.get(pointId) as Tpoint;
    updatedPoints.set(pointId, { ...point, size: newSize });
    store.setPoints(updatedPoints);
  }, [size]);

  return (
    <div
      className={`mb-2 flex w-full flex-col gap-2 ${
        pointId ? "text-c_scnd" : "text-c_scnd2 text-opacity-80"
      }`}
    >
      <div>Destaque</div>
      <div className="flex w-full flex-row">
        <RadioGroup
          onChange={(option) => handleDisplayChange(option)}
          value={
            pointId && store && store.points.get(pointId)
              ? store.points.get(pointId)!.dotstyle
              : 0
          }
          disabled={pointId ? false : true}
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
