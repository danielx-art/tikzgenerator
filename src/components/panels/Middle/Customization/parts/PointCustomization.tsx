import { type TpointId } from "public/entidades";
import PointDisplayCustomization from "./PointDisplayCustomization";
import TagCustomization from "./TagCustomization";

type PropsType = {
  thisEntityId: TpointId | undefined;
};

const PointCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <div
      className={`mb-2 flex w-full flex-col gap-2 ${
        thisEntityId ? "text-c_scnd" : "text-c_scnd2 text-opacity-80"
      }`}
    >
      <PointDisplayCustomization
        pointId={thisEntityId}
        key={`pointDisplayCustomization_${thisEntityId || "_"}`}
      />
      <TagCustomization
        thisEntityId={thisEntityId}
        key={`tagCustomization_${thisEntityId || "_"}`}
      />
    </div>
  );
};

export default PointCustomization;
