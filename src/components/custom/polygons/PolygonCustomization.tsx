import { TpolyId } from "public/entidades";

//customize the fill, and all the vertices and edges (create function to get the edges)

type PropsType = {
  thisEntityId: TpolyId | undefined;
};

const PolygonCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  return (
    <div
      className={`mb-2 flex w-full flex-col gap-4 ${
        thisEntityId ? "text-c_scnd" : "text-c_scnd2 text-opacity-80"
      }`}
    ></div>
  );
};

export default PolygonCustomization;
