import type { TcircleId, TsegId } from "public/entidades";
import ColorChanger from "../ColorChanger";

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
      <ColorChanger entId={thisEntityId} />
    </div>
  );
};

export default CircleCustomization;
