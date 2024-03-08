import type { TcircleId, TsegId } from "public/entidades";
import FillCustomization from "../general/fill/FillCustomization";
import StrokeCustomization from "../general/stroke/StrokeCustomization";
import CircleRadiusChanger from "./CircleRadiusChanger";

type PropsType = {
  thisEntityId: TcircleId | undefined;
};

const CircleCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <div
      className={`mb-2 flex w-full flex-col gap-4 ${
        thisEntityId ? "text-c_scnd" : "text-c_scnd2 text-opacity-80"
      }`}
    >
      <CircleRadiusChanger circleId={thisEntityId} />
      <FillCustomization entId={thisEntityId} />
      <StrokeCustomization entId={thisEntityId} />
    </div>
  );
};

export default CircleCustomization;
