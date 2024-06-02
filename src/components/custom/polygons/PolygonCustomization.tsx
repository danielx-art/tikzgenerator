import { TpolyId } from "public/entidades";
import FillCustomization from "../general/fill/FillCustomization";

type PropsType = {
  thisEntityId: TpolyId | undefined;
};

const PolygonCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <div
      className={`mb-2 flex w-full flex-col gap-4 ${
        thisEntityId ? "text-foreground" : "text-foreground2 text-opacity-80"
      }`}
    >
      <FillCustomization entId={thisEntityId} />
    </div>
  );
};

export default PolygonCustomization;
