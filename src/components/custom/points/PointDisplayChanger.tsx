import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import RadioGroup from "import/components/micro/RadioGroup";
import { getKindById } from "import/utils/storeHelpers/entityGetters";
import { Tpoint, type TpointId } from "public/entidades";

type PropsType = {
  pointId: TpointId | undefined;
};

const PointDisplayChanger: React.FC<PropsType> = ({ pointId }) => {
  const store = useStore(myStore, (state) => state);

  const handleDisplayChange = (option: number) => {
    if (!pointId || getKindById(pointId) != "point" || !store) return;
    const updatedPoints = new Map(store.points);
    const point = store.points.get(pointId) as Tpoint;
    updatedPoints.set(pointId, { ...point, dotstyle: option });
    store.setPoints(updatedPoints);
  };

  return (
    <div className={`flex w-full flex-row flex-wrap gap-2`}>
      <div className="grid items-center">Destaque: </div>
      <div className="flex flex-row">
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
      </div>
    </div>
  );
};

export default PointDisplayChanger;
