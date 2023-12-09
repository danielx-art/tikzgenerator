import { type Tsegment } from "public/entidades";
import PointDisplayCustomization from "./PointDisplayCustomization";
import { type State, type Action } from "import/utils/store";
import TagCustomization from "./TagCustomization";

type PropsType = {
  store: State & Action;
  thisEntity: Tsegment | undefined;
};

const SegmentCustomization: React.FC<PropsType> = ({ store, thisEntity }) => {
  return (
    <div
      className={`mb-2 flex w-full flex-col gap-2 ${
        thisEntity ? "text-c_scnd" : "text-c_scnd2 text-opacity-80"
      }`}
    >
      {/* <PointDisplayCustomization
        store={store}
        point={thisEntity}
        key={`pointDisplayCustomization_${thisEntity?.id || "_"}`}
      /> */}
      <TagCustomization
        store={store}
        thisEntity={thisEntity}
        key={`tagCustomization_${thisEntity?.id || "_"}`}
      />
    </div>
  );
};

export default SegmentCustomization;
