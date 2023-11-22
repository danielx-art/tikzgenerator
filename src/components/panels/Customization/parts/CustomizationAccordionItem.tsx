import Paginator from "import/components/micro/Paginator";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import { useEffect, useState } from "react";
import PointCustomization from "./PointCustomization";
import OpenCloseAccordionButton from "import/components/micro/OpenCloseAccordionButton";

const CustomizationAccordionItem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [curr, setCurr] = useState(0);
  const [tabMessage, setTabMessage] = useState("");

  const store = useStore(myStore, (state) => state);

  let selectedEntities = [];

  if (store && store.tab === "points")
    selectedEntities = store.points.filter((point) => point.selected);
  if (store && store.tab === "segments")
    selectedEntities = store.segments.filter((seg) => seg.selected);
  if (store && store.tab === "angles")
    selectedEntities = store.angles.filter((ang) => ang.selected);
  if (store && store.tab === "tags")
    selectedEntities = store.tags.filter((tag) => tag.selected);

  useEffect(() => {
    if (!store) return;
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
  }, [store, store?.tab]);

  if (!store) return;

  return (
    <div className="w-full border-b-2 border-c_discrete border-opacity-20">
      <div className="flex w-full select-none flex-row items-center gap-2 text-c_scnd">
        <div
          className="group flex flex-1 cursor-pointer select-none flex-row items-center gap-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <OpenCloseAccordionButton isOpen={isOpen} />
          <div className="">Customização</div>
        </div>
        {isOpen ? (
          <div className=" self-end place-self-end">
            <Paginator
              curr={curr}
              setCurr={setCurr}
              total={selectedEntities.length}
            />
          </div>
        ) : (
          <div className="overflow-hidden whitespace-nowrap text-sm italic text-c_scnd2 text-opacity-50">
            {tabMessage}
          </div>
        )}
      </div>
      <div
        className={`w-full p-1 transition-all ease-in-out ${
          isOpen
            ? "h-auto pb-4 opacity-100"
            : "disabled pointer-events-none h-0 select-none overflow-hidden opacity-0"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {store.tab === "points" && <PointCustomization store={store} />}
      </div>
    </div>
  );
};

export default CustomizationAccordionItem;
