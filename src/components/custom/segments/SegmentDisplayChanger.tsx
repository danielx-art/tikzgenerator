import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { getKindById } from "import/utils/storeHelpers/entityGetters";
import { SEGMENT_MARKS_TYPE } from "public/generalConfigs";
import { TsegId } from "public/entidades";
import CyclicBtn from "import/components/micro/CyclicBtn";

type PropsType = {
  segId: TsegId | undefined;
};

const SegmentDisplayChanger: React.FC<PropsType> = ({ segId }) => {
  const store = useStore(myStore, (state) => state);
  const thisSegment = useStore(
    myStore,
    (state) => segId && state.segments.get(segId),
  );

  const handleDisplayChange = (optionSel: number) => {
    if (!thisSegment || !store) return;


    const newSegment = {
      ...thisSegment,
      marks: optionSel as SEGMENT_MARKS_TYPE,
    };
    store.update(newSegment);
  };

  return (
    <div className={`flex flex-row flex-wrap gap-2`}>
      <div className="grid items-center">Destaque: </div>
      <div className="flex w-12 flex-row">
        {segId && store && store.segments.get(segId) && (
          <CyclicBtn
            initOption={
              store && store.segments.has(segId)
                ? store.segments.get(segId)!.marks
                : 0
            }
            onChange={handleDisplayChange}
            disabled={!segId}
          >
            <div className="h-4 w-8">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="10%"
                  y1="50%"
                  x2="90%"
                  y2="50%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="h-4 w-8">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="10%"
                  y1="50%"
                  x2="90%"
                  y2="50%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="50%"
                  y1="10%"
                  x2="50%"
                  y2="90%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="h-4 w-8">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="10%"
                  y1="50%"
                  x2="90%"
                  y2="50%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="40%"
                  y1="10%"
                  x2="40%"
                  y2="90%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="60%"
                  y1="10%"
                  x2="60%"
                  y2="90%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="h-4 w-8">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="10%"
                  y1="50%"
                  x2="90%"
                  y2="50%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="36%"
                  y1="10%"
                  x2="36%"
                  y2="90%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="50%"
                  y1="10%"
                  x2="50%"
                  y2="90%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="64%"
                  y1="10%"
                  x2="64%"
                  y2="90%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="h-4 w-8">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="10%"
                  y1="50%"
                  x2="90%"
                  y2="50%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="30%"
                  y1="10%"
                  x2="30%"
                  y2="90%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="43%"
                  y1="10%"
                  x2="43%"
                  y2="90%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="57%"
                  y1="10%"
                  x2="57%"
                  y2="90%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="70%"
                  y1="10%"
                  x2="70%"
                  y2="90%"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </CyclicBtn>
        )}
      </div>
    </div>
  );
};

export default SegmentDisplayChanger;
