import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import RadioGroup from "import/components/micro/RadioGroup";
import { getKindById } from "import/utils/storeHelpers/miscEntity";
import { Tsegment, type TsegId } from "public/entidades";

type PropsType = {
  segId: TsegId | undefined;
};

const OptionsMap = ["solid", "dashed", "dotted"];

const SegmentDisplayChanger: React.FC<PropsType> = ({ segId }) => {
  const store = useStore(myStore, (state) => state);

  const handleDisplayChange = (option: number) => {
    if (!segId || getKindById(segId) != "segment" || !store) return;
    const updatedSegments = new Map(store.segments);
    const segment = store.segments.get(segId) as Tsegment;
    updatedSegments.set(segId, {
      ...segment,
      style: OptionsMap[option] || "solid",
    });
    store.setSegments(updatedSegments);
  };

  return (
    <div className={`flex flex-row flex-nowrap gap-2`}>
      <div className="grid items-center">Destaque: </div>
      <div className="flex w-full flex-row">
        <RadioGroup
          onChange={(option) => handleDisplayChange(option)}
          value={
            segId && store && store.segments.get(segId)
              ? OptionsMap.indexOf(store.segments.get(segId)!.style)
              : 0
          }
          disabled={segId ? false : true}
        >
          <div className="h-4 w-4">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="0"
                y1="2"
                x2="4"
                y2="2"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="h-4 w-4">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="0"
                y1="2"
                x2="4"
                y2="2"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="5, 5"
              />
            </svg>
          </div>
          <div className="h-4 w-4">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="0"
                y1="2"
                x2="4"
                y2="2"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="1, 5"
              />
            </svg>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default SegmentDisplayChanger;
