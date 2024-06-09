import type { TentId } from "public/entidades";
import StrokeWidthChanger from "./StrokeWidthChanger";
import StrokeStyleChanger from "./StrokeStyleChanger";
import ColorChanger from "../../ColorChanger";
import OpacityChanger from "../../OpacityChanger";

type PropsType = {
  entId: TentId | undefined;
};

const StrokeCustomization: React.FC<PropsType> = ({ entId }) => {
  return (
    <div className="flex flex-col gap-4">
      <StrokeWidthChanger entId={entId} />
      <StrokeStyleChanger entId={entId} />
      <ColorChanger entId={entId} atrName="stroke" />
      <OpacityChanger entId={entId} atrName="stroke" />
    </div>
  );
};

export default StrokeCustomization;
