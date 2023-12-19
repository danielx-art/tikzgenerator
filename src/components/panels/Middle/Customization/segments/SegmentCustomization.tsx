import type { TsegId } from "public/entidades";
import TagCustomization from "../tags/TagCustomization";
import SegmentDisplayChanger from "./SegmentDisplayChanger";
import EntityColorChanger from "../EntityColorChanger";
import SegmentSizeChanger from "./SegmentSizeChanger";

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
      <SegmentDisplayChanger segId={thisEntityId} />
      <SegmentSizeChanger segId={thisEntityId} />
      <EntityColorChanger entityId={thisEntityId} />
      <TagCustomization thisEntityId={thisEntityId} />
    </div>
  );
};

export default SegmentCustomization;
