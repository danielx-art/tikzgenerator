import Paginator from "import/components/micro/Paginator";
import { Tponto } from "public/entidades";
import { useEffect, useState } from "react";
import PointDisplayCustomization from "./PointDisplayCustomization";
import { type State, type Action } from "import/utils/store";
import TagCustomization from "./TagCustomization";

type PropsType = {
  store: State & Action
};

const PointCustomization: React.FC<PropsType> = ({ store }) => {
  const [curr, setCurr] = useState(0);

  return (
    <div className="flex flex-col gap-4 text-c_scnd">
      <PointDisplayCustomization store={store} curr={curr} />
      <TagCustomization store={store} curr={curr} />
    </div>
  );
};

export default PointCustomization;
