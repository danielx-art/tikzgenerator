import { type TpointId } from "public/entidades";
import PointDisplayChanger from "./PointDisplayChanger";
import TagCustomization from "../tags/TagCustomization";
import PointSizeChanger from "./PointSizeChanger";
import EntityColorChanger from "../EntityColorChanger";

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
      <PointDisplayChanger pointId={thisEntityId} />
      <PointSizeChanger pointId={thisEntityId} />
      <EntityColorChanger entityId={thisEntityId} />
      <TagCustomization thisEntityId={thisEntityId} />
    </div>
  );
};

export default PointCustomization;
