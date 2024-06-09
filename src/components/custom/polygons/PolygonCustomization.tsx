import { TpolyId } from "public/entidades";
import FillCustomization from "../general/fill/FillCustomization";
import CustomizationSectionWrapper from "import/components/micro/CustomizationSectionWrapper";

type PropsType = {
  thisEntityId: TpolyId | undefined;
};

const PolygonCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <CustomizationSectionWrapper>
      <FillCustomization entId={thisEntityId} />
    </CustomizationSectionWrapper>
  );
};

export default PolygonCustomization;
