import type { TsegId } from "public/entidades";
import TagCustomization from "../tags/TagCustomization";
import SegmentStyleChanger from "./SegmentStyleChanger";
import EntityColorChanger from "../EntityColorChanger";
import SegmentSizeChanger from "./SegmentSizeChanger";
import SegmentDisplayChanger from "./SegmentDisplayChanger";

type PropsType = {
  thisEntityId: TsegId | undefined;
};

const CircleCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <div
      className={`mb-2 flex w-full flex-col gap-4 ${
        thisEntityId ? "text-c_scnd" : "text-c_scnd2 text-opacity-80"
      }`}
    >
      <SegmentStyleChanger segId={thisEntityId} />
      <SegmentDisplayChanger segId={thisEntityId} />
      <SegmentSizeChanger segId={thisEntityId} />
      <EntityColorChanger entityId={thisEntityId} />
      {/* <TagCustomization thisEntityId={thisEntityId} /> */}
    </div>
  );
};

export default CircleCustomization;
