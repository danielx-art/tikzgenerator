import type { TangId } from "public/entidades";
import TagCustomization from "../tags/TagCustomization";
import AngleDisplayChanger from "./AngleDisplayChanger";
import AngleSizeChanger from "./AngleSizeChanger";
import AngleColorAndFill from "./AngleColorAndFill";
import AngleIsBigChanger from "./AngleIsBigChanger";
import CustomizationSectionWrapper from "import/components/micro/CustomizationSectionWrapper";

type PropsType = {
  thisEntityId: TangId | undefined;
};

const AngleCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <CustomizationSectionWrapper>
      <AngleDisplayChanger angId={thisEntityId} />
      <AngleIsBigChanger angId={thisEntityId} />
      <AngleSizeChanger angId={thisEntityId} />
      <AngleColorAndFill angId={thisEntityId} />
      <TagCustomization thisEntityId={thisEntityId} />
    </CustomizationSectionWrapper>
  );
};

export default AngleCustomization;
