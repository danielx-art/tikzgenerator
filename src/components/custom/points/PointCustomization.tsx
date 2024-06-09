import { type TpointId } from "public/entidades";
import PointDisplayChanger from "./PointDisplayChanger";
import TagCustomization from "../tags/TagCustomization";
import PointSizeChanger from "./PointSizeChanger";
import ColorChanger from "../ColorChanger";
import CustomizationSectionWrapper from "import/components/micro/CustomizationSectionWrapper";

type PropsType = {
  thisEntityId: TpointId | undefined;
};

const PointCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <CustomizationSectionWrapper>
      <PointDisplayChanger pointId={thisEntityId} />
      <PointSizeChanger pointId={thisEntityId} />
      <ColorChanger entId={thisEntityId} />
      <TagCustomization thisEntityId={thisEntityId} />
    </CustomizationSectionWrapper>
  );
};

export default PointCustomization;
