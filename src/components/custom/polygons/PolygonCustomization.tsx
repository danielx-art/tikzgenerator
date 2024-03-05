import { TpolyId } from "public/entidades";
import FillStyleChanger from "../general/fill/FillStyleChanger";

type PropsType = {
  thisEntityId: TpolyId | undefined;
};

const PolygonCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <div
      className={`mb-2 flex w-full flex-col gap-4 ${
        thisEntityId ? "text-c_scnd" : "text-c_scnd2 text-opacity-80"
      }`}
    >
      <FillStyleChanger entId={thisEntityId} />
    </div>
  );
};

export default PolygonCustomization;
