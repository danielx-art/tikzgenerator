import type { TentId } from "public/entidades";
import ColorChanger from "../../ColorChanger";
import OpacityChanger from "../../OpacityChanger";
import FillStyleChanger from "./FillStyleChanger";

type PropsType = {
  entId: TentId | undefined;
};

const FillCustomization: React.FC<PropsType> = ({ entId }) => {
  return (
    <div className="flex flex-col gap-4">
      <FillStyleChanger entId={entId} />
      <ColorChanger entId={entId} atrName="fill" />
      <OpacityChanger entId={entId} atrName="fill" />
    </div>
  );
};

export default FillCustomization;
