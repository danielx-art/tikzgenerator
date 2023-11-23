import Paginator from "import/components/micro/Paginator";
import { Tentity, Tetiqueta, Tponto } from "public/entidades";
import { useEffect, useState } from "react";
import PointDisplayCustomization from "./PointDisplayCustomization";
import { type State, type Action } from "import/utils/store";
import TagCustomization from "./TagCustomization";

type PropsType = {
  store: State & Action
  thisEntity: Tponto|undefined
};

const PointCustomization: React.FC<PropsType> = ({ store, thisEntity }) => {

  return (
    <div className="flex flex-col gap-4 text-c_scnd">
      <PointDisplayCustomization store={store} thisEntity={thisEntity} />
      <TagCustomization store={store} thisEntity={thisEntity} />
    </div>
  );
};

export default PointCustomization;
