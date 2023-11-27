import Paginator from "import/components/micro/Paginator";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import { useEffect, useState } from "react";
import PointCustomization from "./parts/PointCustomization";
import OpenCloseAccordionButton from "import/components/micro/OpenCloseAccordionButton";
import { Tentity, Ttag, Tpoint } from "public/entidades";

const CustomizationPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [curr, setCurr] = useState(0);
  const [tabMessage, setTabMessage] = useState("");
  const [selectedEntities, setSelectedEntities] =
    useState<Array<Tentity | Ttag>>();
  const [thisEntity, setThisEntity] = useState<Tentity | Ttag>();

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!store) return;
    const entityType = store.tab as "points" | "segments" | "angles" | "tags";
    setSelectedEntities(store[entityType].filter((ent) => ent.selected));
  }, [store, store?.tab]);

  useEffect(() => {
    if (!store || !selectedEntities) return;
    setThisEntity(selectedEntities[curr]);
  }, [selectedEntities, curr]);

  useEffect(() => {
    if (!store || !selectedEntities) return;
    switch (store.tab) {
      case "points":
        setTabMessage(`${selectedEntities.length} ponto(s) selecionado(s)`);
        break;
      case "segments":
        setTabMessage(`${selectedEntities.length} segmento(s) selecionado(s)`);
        break;
      case "angles":
        setTabMessage(`${selectedEntities.length} ângulo(s) selecionado(s)`);
        break;
      case "tags":
        setTabMessage(`${selectedEntities.length} etiqueta(s) selecionada(s)`);
        break;
      default:
        setTabMessage(`Onde é que você tá?`);
        break;
    }
  }, [selectedEntities]);

  if (!store) return;

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
          {store.tab === "points" && (
            <PointCustomization
              store={store}
              thisEntity={thisEntity as Tpoint | undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
