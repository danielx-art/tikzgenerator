import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { useEffect, useState } from "react";
import type {
  Tentity,
  TallId,
  TpointId,
  TsegId,
  TangId,
  TcircleId,
  TpolyId,
} from "public/entidades";
import PointCustomization from "./points/PointCustomization";
import SegmentCustomization from "./segments/SegmentCustomization";
import AngleCustomization from "./angles/AngleCustomization";
import {
  getEntityById,
  getKindById,
} from "import/utils/storeHelpers/entityGetters";
import PolygonCustomization from "./polygons/PolygonCustomization";
import CircleCustomization from "./circles/CircleCustomization";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "../micro/ui/accordion";
import ItemPaginator from "../micro/ItemPaginator";

const Customization = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [curr, setCurr] = useState(0);
  const [selectedEntities, setSelectedEntities] = useState<
    Array<Tentity> | undefined
  >();

  const [thisEntityId, setThisEntityId] = useState<TallId | undefined>(
    undefined,
  );

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!store || !store.selections) return;
    const selectedFromStore = store.selections;
    const updatedSelectedEntities: Array<Tentity> = [];
    for (let entId of selectedFromStore) {
      const thisEntityBody = getEntityById(entId as TallId, store);
      if (thisEntityBody) {
        updatedSelectedEntities.push(thisEntityBody as Tentity);
      }
    }
    setSelectedEntities(updatedSelectedEntities);
    let count = curr;
    while (count > updatedSelectedEntities.length - 1) {
      count--;
    }
    count < 0 ? (count = 0) : null;
    setCurr(count);
  }, [store, store?.selections]);

  useEffect(() => {
    if (selectedEntities && selectedEntities[curr]) {
      setThisEntityId(selectedEntities[curr]?.id);
    } else {
      setThisEntityId(undefined);
    }
  }, [curr, selectedEntities]);

  return (
    <AccordionItem value="customization">
      <AccordionTrigger>
        <div className="flex flex-1">Customização</div>
      </AccordionTrigger>
      <AccordionContent
        className={`w-full p-1 pl-2 transition-all ease-in-out ${
          isOpen
            ? "h-auto pb-2 opacity-100"
            : "disabled pointer-events-none h-0 select-none overflow-hidden opacity-0"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="flex flex-row justify-end">
          <ItemPaginator
            curr={curr}
            setCurr={setCurr}
            total={selectedEntities?.length || 0}
          />
        </div>
        {thisEntityId && getKindById(thisEntityId) === "point" ? (
          <PointCustomization
            thisEntityId={thisEntityId as TpointId | undefined}
          />
        ) : null}
        {thisEntityId && getKindById(thisEntityId) === "segment" ? (
          <SegmentCustomization
            thisEntityId={thisEntityId as TsegId | undefined}
          />
        ) : null}
        {thisEntityId && getKindById(thisEntityId) === "angle" ? (
          <AngleCustomization
            thisEntityId={thisEntityId as TangId | undefined}
          />
        ) : null}
        {thisEntityId && getKindById(thisEntityId) === "circle" ? (
          <CircleCustomization
            thisEntityId={thisEntityId as TcircleId | undefined}
          />
        ) : null}
        {thisEntityId && getKindById(thisEntityId) === "polygon" ? (
          <PolygonCustomization
            thisEntityId={thisEntityId as TpolyId | undefined}
          />
        ) : null}
        {!thisEntityId && (
          <div className="py-1 text-sm text-foreground">
            Selecione um objeto para customizá-lo
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Customization;
