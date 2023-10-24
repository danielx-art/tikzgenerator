import useMyStore from "store";
import PointsTab from "./PointsTab";
import SegmentsTab from "./SegmentsTab";
import AnglesTab from "./AnglesTab";

const Tabs = () => {
  const{tab, setTab} = useMyStore();

  return (
    <div className="md:w-1/3 sm:w-1/2 self-start p-4 h-full w-full">
      <div className="grid grid-cols-3 gap-0.5 w-full">
        <div
          className={`${
            tab == "points"
              ? "bg-slate-300 font-bold"
              : "bg-slate-600 text-slate-800 border-b-2 border-b-white"
          } rounded-t-lg px-2 py-1`}
          onClick={() => setTab("points")}
        >
          Points
        </div>
        <div
          className={`${
            tab == "segments"
              ? "bg-slate-300 font-bold"
              : "bg-slate-600 text-slate-800 border-b-2 border-b-white"
          } rounded-t-lg px-2 py-1`}
          onClick={() => setTab("segments")}
        >
          Segments
        </div>
        <div
          className={`${
            tab == "angles"
              ? "bg-slate-300 font-bold"
              : "bg-slate-600 text-slate-800 border-b-2 border-b-white"
          } rounded-t-lg px-2 py-1`}
          onClick={() => setTab("angles")}
        >
          Angles
        </div>
      </div>
      <div className="w-full h-[calc(100%-2rem)] bg-slate-300 rounded-b-lg p-4 overflow-y-auto">
        {tab=="points" && <PointsTab />}
        {tab=="segments" && <SegmentsTab />}
        {tab=="angles" && <AnglesTab />}
      </div>
    </div>
  );
};

export default Tabs;
