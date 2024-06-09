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
import Paginator from "import/components/micro/old/Paginator";
import PointCustomization from "../../custom/points/PointCustomization";
import OpenCloseAccordionButton from "import/components/micro/old/old-OpenCloseAccordionButton";
import SegmentCustomization from "../../custom/segments/SegmentCustomization";
import AngleCustomization from "../../custom/angles/AngleCustomization";
import {
  getEntityById,
  getKindById,
} from "import/utils/storeHelpers/entityGetters";
import PolygonCustomization from "../../custom/polygons/PolygonCustomization";
import CircleCustomization from "../../custom/circles/CircleCustomization";

const Customization = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [curr, setCurr] = useState(0);
  const [selectedEntities, setSelectedEntities] = useState<
    Array<Tentity> | undefined
  >();
  const [tabMessage, setTabMessage] = useState("");
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
    <div className="w-full border-b-2 border-border border-opacity-20">
      <div className="mb-1 flex w-full select-none flex-row items-center gap-2 text-foreground text-opacity-90 hover:text-opacity-100">
        <div
          className="group flex flex-1 cursor-pointer select-none flex-row items-center"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <OpenCloseAccordionButton isOpen={isOpen} />
          <div className="pl-1">Customização</div>
        </div>
        {isOpen ? (
          <div className=" place-self-end self-end">
            <Paginator
              curr={curr}
              setCurr={setCurr}
              total={selectedEntities?.length || 0}
            />
          </div>
        ) : (
          <div className="overflow-hidden whitespace-nowrap pr-2 text-sm italic text-foreground2 text-opacity-50">
            {tabMessage}
          </div>
        )}
      </div>
      <div
        className={`w-full p-1 pl-7 transition-all ease-in-out ${
          isOpen
            ? "h-auto pb-2 opacity-100"
            : "disabled pointer-events-none h-0 select-none overflow-hidden opacity-0"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
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
      </div>
    </div>
  );
};

export default Customization;
