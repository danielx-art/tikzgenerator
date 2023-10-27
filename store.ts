import { Tponto, Tsegmento, Tangulo } from "public/entidades";
import { create } from "zustand";

type State = {
  tab: string;
  points: Tponto[];
  angles: Tangulo[];
  segments: Tsegmento[];
  groups: number[];
  // selectedPoints: Tponto[],
  // selectedAngles: Tangulo[],
  // selectedSegments: Tsegmento[],
  selectedGroup: number;
  tags: string[];
  error: string;
};

type Action = {
  setTab: (tab: State["tab"]) => void;
  setPoints: (points: State["points"]) => void;
  setAngles: (angles: State["angles"]) => void;
  setSegments: (segments: State["segments"]) => void;
  setGroups: (groups: State["groups"]) => void;
  // setSelectedPoints:(selectedPoints: State['selectedPoints']) => void;
  // setSelectedAngles:(selectedAngles: State['selectedAngles']) => void;
  // setSelectedSegments:(selectedSegments: State['selectedSegments']) => void;
  setSelectedGroup: (selectedGroups: State["selectedGroup"]) => void;
  setTags: (tags: State["tags"]) => void;
  setError: (error: State["error"]) => void;
};

const useMyStore = create<State & Action>((set) => ({
  tab: "points",
  setTab: (tab) => set(() => ({ tab: tab })),
  points: [] as Tponto[],
  angles: [] as Tangulo[],
  segments: [] as Tsegmento[],
  groups: [1] as number[],
  setPoints: (points) => set(() => ({ points: points })),
  setAngles: (angles) => set(() => ({ angles: angles })),
  setSegments: (segments) => set(() => ({ segments: segments })),
  setGroups: (groups) => set(() => ({ groups: groups })),
  // selectedPoints: [] as Tponto[],
  // selectedAngles: [] as Tangulo[],
  // selectedSegments: [] as Tsegmento[],
  selectedGroup: 1 as number,
  // setSelectedPoints: (selectedPoints)=>set(()=>({selectedPoints: selectedPoints})),
  // setSelectedAngles: (selectedAngles)=>set(()=>({selectedAngles: selectedAngles})),
  // setSelectedSegments: (selectedSegments)=>set(()=>({selectedSegments: selectedSegments})),
  setSelectedGroup: (selectedGroup) =>
    set(() => ({ selectedGroup: selectedGroup })),
  tags: [] as string[],
  setTags: (tags) => set(() => ({ tags: tags })),
  error: "",
  setError: (error) => set(() => ({ error: error })),
}));

export default useMyStore;
