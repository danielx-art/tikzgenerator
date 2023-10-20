import { useState } from "react";
import PointList from "./PointList";

const Tabs = () => {
  const [tab, setTab] = useState("points");

  return (
    <div className="w-1/3 p-4">
      <div className="">
        <div className="grid grid-cols-3">
          <div
            className={
              tab == "points"
                ? "bg-slate-500 font-bold text-black"
                : "bg-slate-200 text-gray-600"
            }
            onClick={() => setTab("points")}
          >
            Points
          </div>
          <div
            className={
              tab == "segments"
                ? "bg-slate-500 font-bold text-black"
                : "bg-slate-200 text-gray-600"
            }
            onClick={() => setTab("segments")}
          >
            Segments
          </div>
          <div
            className={
              tab == "angles"
                ? "bg-slate-500 font-bold text-black"
                : "bg-slate-200 text-gray-600"
            }
            onClick={() => setTab("angles")}
          >
            Angles
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
