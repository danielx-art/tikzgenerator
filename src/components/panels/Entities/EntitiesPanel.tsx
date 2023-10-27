import useMyStore from "store";
import PointsTab from "./Tabs/PointsTab";
import SegmentsTab from "./Tabs/SegmentsTab";
import AnglesTab from "./Tabs/AnglesTab";

const EntitiesPanel = () => {
  const { tab, setTab } = useMyStore();

  return (
    <div className="h-full w-full flex-1 self-start p-4 sm:w-1/2 md:h-1/2 md:w-1/3">
      <div className="grid h-fit w-full grid-cols-3 gap-0.5 text-sm">
        <div
          className={`${
            tab == "points"
              ? "border-2 border-b-0 border-a_neutral bg-a_light font-bold text-a_dark"
              : "border-2 border-a_neutral bg-a_dark text-a_light"
          } overflow-hidden rounded-t-lg px-2 py-1`}
          onClick={() => setTab("points")}
        >
          Pontos
        </div>
        <div
          className={`${
            tab == "segments"
              ? "border-2 border-b-0 border-a_neutral bg-a_light font-bold text-a_dark"
              : "border-2 border-a_neutral bg-a_dark text-a_light"
          } overflow-hidden rounded-t-lg px-2 py-1`}
          onClick={() => setTab("segments")}
        >
          Segmentos
        </div>
        <div
          className={`${
            tab == "angles"
              ? "border-2 border-b-0 border-a_neutral bg-a_light font-bold text-a_dark"
              : "border-2 border-a_neutral bg-a_dark text-a_light"
          } overflow-hidden rounded-t-lg px-2 py-1`}
          onClick={() => setTab("angles")}
        >
          Ângulos
        </div>
      </div>
      <div className="flex h-full w-full flex-col rounded-b-lg border-2 border-t-0 border-a_neutral bg-a_light p-2">
        {tab == "points" && <PointsTab />}
        {tab == "segments" && <SegmentsTab />}
        {tab == "angles" && <AnglesTab />}
      </div>
    </div>
  );
};

export default EntitiesPanel;
