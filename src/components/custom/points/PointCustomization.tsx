import { type TpointId } from "public/entidades";
import PointDisplayChanger from "./PointDisplayChanger";
import TagCustomization from "../tags/TagCustomization";
import PointSizeChanger from "./PointSizeChanger";
import ColorChanger from "../ColorChanger";

type PropsType = {
  thisEntityId: TpointId | undefined;
};

const PointCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <div
      className={`mb-2 flex w-full flex-col gap-2 ${
        thisEntityId ? "text-foreground" : "text-foreground2 text-opacity-80"
      }`}
    >
      <PointDisplayChanger pointId={thisEntityId} />
      <PointSizeChanger pointId={thisEntityId} />
      <ColorChanger entId={thisEntityId} />
      <TagCustomization thisEntityId={thisEntityId} />
    </div>
  );
};

export default PointCustomization;
