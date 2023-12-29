import { Enriqueta } from "next/font/google";
import {
  Tpoint,
  Tsegment,
  Tangle,
  Ttag,
  Tentity,
  tag,
  TkindPlural,
  TpointId,
  TangId,
  TsegId,
  TtagId,
  TentId,
  Tkind,
  TallId,
  TallKind,
  TallKindPlural,
  TcircleId,
  TbodyFromKind,
  TidFromKind,
  TkindPluralFrom,
  Tcircle,
} from "public/entidades";
import { vec } from "import/utils/math/vetores";
import { create } from "zustand";
import { StorageValue, persist } from "zustand/middleware";
import { getKindById } from "../storeHelpers/miscEntity";

export type State = {
  tab: TallKindPlural;
  points: Map<TpointId, Tpoint>;
  segments: Map<TsegId, Tsegment>;
  angles: Map<TangId, Tangle>;
  circles: Map<TcircleId, Tcircle>;
  tags: Map<TtagId, Ttag>;
  groups: number[];
  selectedGroup: number;
  error: string;
  idCounters: Record<TallKind, number>;
  selections: Array<TallId>;
};

export type Action = {
  setTab: (tab: State["tab"]) => void;
  setPoints: (points: State["points"]) => void;
  setSegments: (segments: State["segments"]) => void;
  setAngles: (angles: State["angles"]) => void;
  setCircles: (circles: State["circles"]) => void;
  setGroups: (groups: State["groups"]) => void;
  setSelectedGroup: (selectedGroups: State["selectedGroup"]) => void;
  setTags: (tags: State["tags"]) => void;
  setError: (error: State["error"]) => void;
  generateId: <T extends TallKind>(type: T) => TidFromKind<T>;
  toggleSelection: (id: TallId) => void;
  addEntity: (entityKind: Tkind, elementBody: Tentity) => void;
  deleteEntity: (id: TentId) => void;
  addTag: (value: string, entityId: TentId) => void;
  deleteTag: (id: TtagId) => void;
  set: (state: State & Action)=>void;
};

const myStore = create<State & Action>()(
  persist(
    (set, get) => ({

      set: (state)=>set(()=>({...state})),

      tab: "points" as TallKindPlural,
      setTab: (tab) => set(() => ({ tab: tab })),
      points: new Map<TpointId, Tpoint>(),
      segments: new Map<TsegId, Tsegment>(),
      angles: new Map<TangId, Tangle>(),
      circles: new Map<TcircleId, Tcircle>(),
      tags: new Map<TtagId, Ttag>(),
      setPoints: (points) => set(() => ({ points: points })),
      setSegments: (segments) => set(() => ({ segments: segments })),
      setAngles: (angles) => set(() => ({ angles: angles })),
      setCircles: (circles) => set(() => ({ circles: circles })),
      setTags: (tags) => set(() => ({ tags: tags })),

      groups: [1] as number[],
      setGroups: (groups) => set(() => ({ groups: groups })),
      selectedGroup: 1 as number,
      setSelectedGroup: (selectedGroup) =>
        set(() => ({ selectedGroup: selectedGroup })),

      error: "",
      setError: (error) => set(() => ({ error: error })),
      idCounters: {
        point: 0,
        segment: 0,
        angle: 0,
        circle: 0,
        tag: 0,
      },

      generateId: <T extends TallKind>(type: T): TidFromKind<T> => {
        const id = `${type}_${get().idCounters[type]}`;
        set((state) => ({
          idCounters: {
            ...state.idCounters,
            [type]: state.idCounters[type] + 1,
          },
        }));
        return id as any;
      },

      selections: [] as Array<TallId>,
      toggleSelection: <T extends Tentity | Ttag>(id: TallId) => {
        const entityKind = getKindById(id) as TallKind;

        const storeMapKey = (entityKind + "s") as TallKindPlural;

        set((state) => {
          const entitiesMap = new Map(state[storeMapKey] as Map<TallId, T>);

          if (!entitiesMap.has(id)) return {};

          const entity = entitiesMap.get(id);
          if (!entity) return {};
          const isSelected = entity.selected;

          entitiesMap.set(id, { ...entity, selected: !isSelected });

          const updatedSelections = [...state.selections];
          const selectionIndex = updatedSelections.indexOf(id);
          if (!isSelected) {
            if (selectionIndex === -1) updatedSelections.push(id);
          } else {
            if (selectionIndex > -1)
              updatedSelections.splice(selectionIndex, 1);
          }

          return {
            [storeMapKey]: entitiesMap,
            selections: [...updatedSelections],
          };
        });
      },

      

      addEntity: <T extends Tkind>(
        entityKind: T,
        elementBody: TbodyFromKind<T>,
      ) => {
        const id = get().generateId(entityKind) as TidFromKind<T>;
        const stateMapKey = (entityKind + "s") as TkindPluralFrom<T>;

        set((state) => {
          const existingMap = state[stateMapKey] as Map<
            TentId,
            typeof elementBody
          >;
          const updatedMap = new Map(existingMap);
          updatedMap.set(id, { ...elementBody, id });

          return { [stateMapKey]: updatedMap };
        });
      },

      deleteEntity: (id: TentId) => {
        const entityKind = getKindById(id) as Tkind;

        const stateMapKey = (entityKind + "s") as TkindPlural;

        if (entityKind == "point") {
          set((state) => {
            const updatedPoints = new Map(state.points);
            const updatedSegments = new Map(state.segments);
            const updatedAngles = new Map(state.angles);
            const updatedTags = new Map(state.tags);
            const removedIds = [] as string[];
            const updatedSelections = [...state.selections];
            const indexOnSelections = updatedSelections.indexOf(id);
            if (indexOnSelections > -1)
              updatedSelections.splice(indexOnSelections, 1);

            removedIds.push(id);
            updatedPoints.delete(id as TpointId);

            // Check and delete any segments that reference the point
            updatedSegments.forEach((segment, segmentId) => {
              if (segment.p1.id === id || segment.p2.id === id) {
                removedIds.push(segment.id);
                updatedSegments.delete(segmentId);
              }
            });

            // Check and delete any angles that reference the point
            updatedAngles.forEach((angle, angleId) => {
              if (angle.a.id === id || angle.b.id === id || angle.c.id === id) {
                removedIds.push(angle.id);
                updatedAngles.delete(angleId);
              }
            });

            updatedTags.forEach((tag, tagId) => {
              if (removedIds.includes(tag.entityId)) {
                updatedTags.delete(tagId);
              }
            });

            return {
              points: updatedPoints,
              segments: updatedSegments,
              angles: updatedAngles,
              selections: updatedSelections,
            };
          });
        } else {
          set((state) => {
            const updatedMap = new Map(
              state[stateMapKey] as Map<TentId, Tentity>,
            );
            updatedMap.delete(id);

            const updatedSelections = [...state.selections];
            const indexOnSelections = updatedSelections.indexOf(id);
            if (indexOnSelections > -1)
              updatedSelections.splice(indexOnSelections, 1);

            const updatedTags = new Map(state.tags);

            updatedTags.forEach((tag, tagId) => {
              if (tag.entityId === id) {
                updatedTags.delete(tagId);
              }
            });

            return {
              [stateMapKey]: updatedMap,
              tags: updatedTags,
              selections: updatedSelections,
            };
          });
        }
      },

      addTag: (value: string, entityId: TentId) => {
        const tagId = get().generateId("tag") as TtagId;

        const newTag = tag(value, entityId, tagId);

        set((state) => {
          const updatedTags = new Map(state.tags);
          updatedTags.set(tagId, newTag);

          return { tags: updatedTags };
        });
      },

      deleteTag: (id: TtagId) => {
        set((state) => {
          const updatedTags = new Map(state.tags);
          updatedTags.delete(id);

          return { tags: updatedTags };
        });
      },
    }),
    {
      name: "storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);

          return {
            state: {
              ...state,
              points: new Map(state.points),
              segments: new Map(state.segments),
              angles: new Map(state.angles),
              tags: new Map(state.tags),
            },
          };
        },
        setItem: (name, newValue: StorageValue<State & Action>) => {
          // functions cannot be JSON encoded
          const str = JSON.stringify({
            state: {
              ...newValue.state,
              points: Array.from(newValue.state.points.entries()),
              segments: Array.from(newValue.state.segments.entries()),

              angles: Array.from(newValue.state.angles.entries()),
              tags: Array.from(newValue.state.tags.entries()),
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);

export default myStore;
