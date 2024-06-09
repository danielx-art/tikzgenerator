import type { TcircleId } from "public/entidades";
import FillCustomization from "../general/fill/FillCustomization";
import StrokeCustomization from "../general/stroke/StrokeCustomization";
import CircleRadiusChanger from "./CircleRadiusChanger";
import CircleArcChanger from "./CircleArcChanger";
import CustomizationSectionWrapper from "import/components/micro/CustomizationSectionWrapper";

type PropsType = {
  thisEntityId: TcircleId | undefined;
};

const CircleCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <CustomizationSectionWrapper>
      <CircleRadiusChanger circleId={thisEntityId} />
      <CircleArcChanger circleId={thisEntityId} />
      <FillCustomization entId={thisEntityId} />
      <StrokeCustomization entId={thisEntityId} />
    </CustomizationSectionWrapper>
  );
};

export default CircleCustomization;
