import type { TangId } from "public/entidades";
import TagCustomization from "../tags/TagCustomization";
import AngleDisplayChanger from "./AngleDisplayChanger";
import AngleSizeChanger from "./AngleSizeChanger";
import AngleColorAndFill from "./AngleColorAndFill";
import AngleIsBigChanger from "./AngleIsBigChanger";

type PropsType = {
  thisEntityId: TangId | undefined;
};

const AngleCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <div
      className={`mb-2 flex w-full flex-col gap-2 ${
        thisEntityId ? "text-c_scnd" : "text-c_scnd2 text-opacity-80"
      }`}
    >
      <AngleDisplayChanger angId={thisEntityId} />
      <AngleIsBigChanger angId={thisEntityId} />
      <AngleSizeChanger angId={thisEntityId} />
      <AngleColorAndFill angId={thisEntityId} />
      <TagCustomization thisEntityId={thisEntityId} />
    </div>
  );
};

export default AngleCustomization;
