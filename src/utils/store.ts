import { Tpoint, Tsegment, Tangle, Ttag } from "public/entidades";
import { create } from "zustand";
import { persist } from 'zustand/middleware'

export type State = {
  tab: string;
  points: Tpoint[];
  angles: Tangle[];
  segments: Tsegment[];
  groups: number[];
  selectedGroup: number;
  tags: Ttag[];
  error: string;
  idCounters: {
    point: number,
    segment: number,
    angle: number,
    tag: number
  },
  selections: string[],
};

export type Action = {
  setTab: (tab: State["tab"]) => void;
  setPoints: (points: State["points"]) => void;
  setAngles: (angles: State["angles"]) => void;
  setSegments: (segments: State["segments"]) => void;
  setGroups: (groups: State["groups"]) => void;
  setSelectedGroup: (selectedGroups: State["selectedGroup"]) => void;
  setTags: (tags: State["tags"]) => void;
  setError: (error: State["error"]) => void;
  generateId: (type: "point"|"segment"|"angle"|"tag") => string;
  toggleSelection: (id: string)=>void;
};

const myStore = create<State & Action>()(
  persist((set, get) => ({
  tab: "points",
  setTab: (tab) => set(() => ({ tab: tab })),
  points: [] as Tpoint[],
  angles: [] as Tangle[],
  segments: [] as Tsegment[],
  groups: [1] as number[],
  setPoints: (points) => set(() => ({ points: points })),
  setAngles: (angles) => set(() => ({ angles: angles })),
  setSegments: (segments) => set(() => ({ segments: segments })),
  setGroups: (groups) => set(() => ({ groups: groups })),
  selectedGroup: 1 as number,
  setSelectedGroup: (selectedGroup) =>
    set(() => ({ selectedGroup: selectedGroup })),
  tags: [] as Ttag[],
  setTags: (tags) => set(() => ({ tags: tags })),
  error: "",
  setError: (error) => set(() => ({ error: error })),
  idCounters: {
    point: 0, segment: 0, angle: 0, tag: 0,
  },
  generateId: (type) => {
    const id:string = `${type}_${get().idCounters[type]}`;
    set((state) => ({
      idCounters: {
        ...state.idCounters,
        [type]: state.idCounters[type] + 1,
      },
    }));
    return id;
  },
  selections: [],
  toggleSelection: (id) => {
    const entityKind = id.split("_")[0] as "points"|"segments"|"angles"|"tags";
    const entitiesArray = [...get()[entityKind]];
    const indexInArray = entitiesArray.findIndex(obj => obj.id === id);
    
    if (indexInArray !== -1) {
      const isSelected = entitiesArray[indexInArray]!.selected;
      entitiesArray[indexInArray] = { ...entitiesArray[indexInArray]!, selected: !isSelected };

      const updatedSelections = [...get().selections];
      if (isSelected) {
        const index = updatedSelections.indexOf(id);
        if (index > -1) updatedSelections.splice(index, 1);
      } else {
        updatedSelections.push(id);
      }

      set({ [entityKind]: entitiesArray, selections: updatedSelections });
    }
  }
}),
{
  name: "storage"
})

);

export default myStore;
