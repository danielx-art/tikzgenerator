import { Tponto, Tsegmento, Tangulo, Tetiqueta } from "public/entidades";
import { create } from "zustand";
import { persist } from 'zustand/middleware'

type State = {
  tab: string;
  points: Tponto[];
  angles: Tangulo[];
  segments: Tsegmento[];
  groups: number[];
  selectedGroup: number;
  tags: Tetiqueta[];
  error: string;
};

type Action = {
  setTab: (tab: State["tab"]) => void;
  setPoints: (points: State["points"]) => void;
  setAngles: (angles: State["angles"]) => void;
  setSegments: (segments: State["segments"]) => void;
  setGroups: (groups: State["groups"]) => void;
  setSelectedGroup: (selectedGroups: State["selectedGroup"]) => void;
  setTags: (tags: State["tags"]) => void;
  setError: (error: State["error"]) => void;
};

const useMyStore = create<State & Action>()(
  persist((set, get) => ({
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
  selectedGroup: 1 as number,
  setSelectedGroup: (selectedGroup) =>
    set(() => ({ selectedGroup: selectedGroup })),
  tags: [] as Tetiqueta[],
  setTags: (tags) => set(() => ({ tags: tags })),
  error: "",
  setError: (error) => set(() => ({ error: error })),
}),
{
  name: "storage"
})

);

export default useMyStore;
