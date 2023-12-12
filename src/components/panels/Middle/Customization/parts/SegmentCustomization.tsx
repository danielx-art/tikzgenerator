import type { TsegId } from "public/entidades";
import TagCustomization from "./TagCustomization";

type PropsType = {
  thisEntityId: TsegId | undefined;
};

const SegmentCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <div
      className={`mb-2 flex w-full flex-col gap-2 ${
        thisEntityId ? "text-c_scnd" : "text-c_scnd2 text-opacity-80"
      }`}
    >
      {/* <PointDisplayCustomization
        store={store}
        point={thisEntity}
        key={`pointDisplayCustomization_${thisEntity?.id || "_"}`}
      /> */}
      <TagCustomization
        thisEntityId={thisEntityId}
        key={`tagCustomization_${thisEntityId || "_"}`}
      />
    </div>
  );
};

export default SegmentCustomization;
