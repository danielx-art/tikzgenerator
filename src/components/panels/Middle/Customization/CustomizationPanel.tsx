import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import { useEffect, useState } from "react";
import type {
  Tentity,
  TallKindPlural,
  TallId,
  TpointId,
  TsegId,
  TangId,
} from "public/entidades";
import Paginator from "import/components/micro/Paginator";
import PointCustomization from "./parts/PointCustomization";
import OpenCloseAccordionButton from "import/components/micro/OpenCloseAccordionButton";
import SegmentCustomization from "./parts/SegmentCustomization";
import AngleCustomization from "./parts/AngleCustomization";

const CustomizationPanel = () => {
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
    if (!store) return;
    const tab = store.tab as TallKindPlural;
    const entitiesMap = store[tab] as Map<TallId, Tentity>;

    let updatedEntities = [] as Array<Tentity>;

    for (let entId of store.selections) {
      const entityKindPlural = (entId.split("_")[0] + "s") as TallKindPlural;
      if (entityKindPlural === tab) {
        const ent = entitiesMap.get(entId);
        if (ent) updatedEntities.push(ent);
      }
    }

    switch (store.tab) {
      case "points":
        setTabMessage(`${updatedEntities.length} ponto(s) selecionado(s)`);
        break;
      case "segments":
        setTabMessage(`${updatedEntities.length} segmento(s) selecionado(s)`);
        break;
      case "angles":
        setTabMessage(`${updatedEntities.length} ângulo(s) selecionado(s)`);
        break;
      case "tags":
        setTabMessage(`${updatedEntities.length} tag(s) selecionada(s)`);
        break;
      default:
        setTabMessage(`Onde é que você tá?`);
        break;
    }
    let count = curr;
    while (count > updatedEntities.length - 1) {
      count--;
    }
    count < 0 ? (count = 0) : null;
    setCurr(count);
    setSelectedEntities(updatedEntities);
  }, [store, store?.tab, store?.selections]);

  useEffect(() => {
    if (selectedEntities && selectedEntities[curr]) {
      setThisEntityId(selectedEntities[curr]?.id);
    } else {
      setThisEntityId(undefined);
    }
  }, [curr, selectedEntities]);

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 rounded-md border-2 border-c_discrete p-4 pb-2">
      <div className="w-full">
        <div className="flex w-full select-none flex-row items-center gap-2 text-c_scnd">
          <div
            className="group flex flex-1 cursor-pointer select-none flex-row items-center"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <OpenCloseAccordionButton isOpen={isOpen} />
            <div className="">Customização</div>
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
            <div className="overflow-hidden whitespace-nowrap pr-2 text-sm italic text-c_scnd2 text-opacity-50">
              {tabMessage}
            </div>
          )}
        </div>
        <div
          className={`w-full p-1 transition-all ease-in-out ${
            isOpen
              ? "h-auto pb-2 opacity-100"
              : "disabled pointer-events-none h-0 select-none overflow-hidden opacity-0"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {store && store.tab === "points" && (
            <PointCustomization
              thisEntityId={thisEntityId as TpointId | undefined}
            />
          )}
          {store && store.tab === "segments" && (
            <SegmentCustomization
              thisEntityId={thisEntityId as TsegId | undefined}
            />
          )}
          {store && store.tab === "angles" && (
            <AngleCustomization
              thisEntityId={thisEntityId as TangId | undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
