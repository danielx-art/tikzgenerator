import type { TangId } from "public/entidades";
import TagCustomization from "../tags/TagCustomization";

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
      {/* <PointDisplayCustomization
        store={store}
        point={thisEntity}
        key={`pointDisplayCustomization_${thisEntity?.id || "_"}`}
      /> */}
      <TagCustomization thisEntityId={thisEntityId} />
    </div>
  );
};

export default AngleCustomization;
