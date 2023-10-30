import useMyStore from "store";
import PointsTab from "./Tabs/PointsTab";
import SegmentsTab from "./Tabs/SegmentsTab";
import AnglesTab from "./Tabs/AnglesTab";
import useStore from "import/utils/useStore";

const EntitiesPanel = () => {
  const store = useStore(useMyStore, (state) => state);

  return (
    store && (
      <div className="h-full w-full flex-1 self-start p-4 sm:w-1/2 md:h-1/2 md:w-1/3">
        <div className="grid h-fit w-full grid-cols-3 gap-0.5 text-sm">
          <div
            className={`${
              store.tab == "points"
                ? "border-2 border-b-0 border-a_neutral bg-a_light font-bold text-a_dark"
                : "border-2 border-a_neutral bg-a_dark text-a_light"
            } overflow-hidden rounded-t-lg px-2 py-1`}
            onClick={() => store.setTab("points")}
          >
            Pontos
          </div>
          <div
            className={`${
              store.tab == "segments"
                ? "border-2 border-b-0 border-a_neutral bg-a_light font-bold text-a_dark"
                : "border-2 border-a_neutral bg-a_dark text-a_light"
            } overflow-hidden rounded-t-lg px-2 py-1`}
            onClick={() => store.setTab("segments")}
          >
            Segmentos
          </div>
          <div
            className={`${
              store.tab == "angles"
                ? "border-2 border-b-0 border-a_neutral bg-a_light font-bold text-a_dark"
                : "border-2 border-a_neutral bg-a_dark text-a_light"
            } overflow-hidden rounded-t-lg px-2 py-1`}
            onClick={() => store.setTab("angles")}
          >
            Ângulos
          </div>
        </div>
        <div className="flex h-full w-full flex-col rounded-b-lg border-2 border-t-0 border-a_neutral bg-a_light p-2">
          {store.tab == "points" && <PointsTab />}
          {store.tab == "segments" && <SegmentsTab />}
          {store.tab == "angles" && <AnglesTab />}
        </div>
      </div>
    )
  );
};

export default EntitiesPanel;
