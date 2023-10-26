import useMyStore from "store";
import PointsTab from "./PointsTab";
import SegmentsTab from "./SegmentsTab";
import AnglesTab from "./AnglesTab";

const EntitiesPanel = () => {
  const{tab, setTab} = useMyStore();

  return (
    <div className="md:w-1/3 sm:w-1/2 self-start p-4 flex-1 w-full">
      <div className="grid grid-cols-3 gap-0.5 w-full">
        <div
          className={`${
            tab == "points"
              ? "bg-a_light text-a_dark font-bold border-2 border-a_neutral border-b-0"
              : "bg-a_dark text-a_light border-2 border-a_neutral"
          } rounded-t-lg px-2 py-1 overflow-hidden`}
          onClick={() => setTab("points")}
        >
          Pontos
        </div>
        <div
          className={`${
            tab == "segments"
              ? "bg-a_light text-a_dark font-bold border-2 border-a_neutral border-b-0"
              : "bg-a_dark text-a_light border-2 border-a_neutral"
          } rounded-t-lg px-2 py-1 overflow-hidden`}
          onClick={() => setTab("segments")}
        >
          Segmentos
        </div>
        <div
          className={`${
            tab == "angles"
              ? "bg-a_light text-a_dark font-bold border-2 border-a_neutral border-b-0"
              : "bg-a_dark text-a_light border-2 border-a_neutral"
          } rounded-t-lg px-2 py-1 overflow-hidden`}
          onClick={() => setTab("angles")}
        >
          Ângulos
        </div>
      </div>
      <div className="w-full h-[calc(100%-2rem)] bg-a_light border-2 border-a_neutral border-t-0 rounded-b-lg p-4">
        {tab=="points" && <PointsTab />}
        {tab=="segments" && <SegmentsTab />}
        {tab=="angles" && <AnglesTab />}
      </div>
    </div>
  );
};

export default EntitiesPanel;
