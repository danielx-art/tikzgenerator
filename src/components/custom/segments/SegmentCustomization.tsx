import type { TsegId } from "public/entidades";
import TagCustomization from "../tags/TagCustomization";
import SegmentDisplayChanger from "./SegmentDisplayChanger";
import StrokeCustomization from "../general/stroke/StrokeCustomization";

type PropsType = {
  thisEntityId: TsegId | undefined;
};

const SegmentCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <div
      className={`mb-2 flex w-full flex-col gap-4 ${
        thisEntityId ? "text-foreground" : "text-foreground2 text-opacity-80"
      }`}
    >
      <SegmentDisplayChanger segId={thisEntityId} />
      <StrokeCustomization entId={thisEntityId} />
      <TagCustomization thisEntityId={thisEntityId} />
    </div>
  );
};

export default SegmentCustomization;
