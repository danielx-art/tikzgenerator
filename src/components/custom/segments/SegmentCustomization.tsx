import type { TsegId } from "public/entidades";
import TagCustomization from "../tags/TagCustomization";
import SegmentDisplayChanger from "./SegmentDisplayChanger";
import StrokeCustomization from "../general/stroke/StrokeCustomization";
import CustomizationSectionWrapper from "import/components/micro/CustomizationSectionWrapper";

type PropsType = {
  thisEntityId: TsegId | undefined;
};

const SegmentCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <CustomizationSectionWrapper>
      <SegmentDisplayChanger segId={thisEntityId} />
      <StrokeCustomization entId={thisEntityId} />
      <TagCustomization thisEntityId={thisEntityId} />
    </CustomizationSectionWrapper>
  );
};

export default SegmentCustomization;
