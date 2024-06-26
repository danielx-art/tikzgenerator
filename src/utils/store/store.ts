import {
  type Tpoint,
  type Tsegment,
  type Tangle,
  type Ttag,
  type Tentity,
  type TkindPlural,
  type TpointId,
  type TangId,
  type TsegId,
  type TtagId,
  type TentId,
  type Tkind,
  type TallId,
  type TallKind,
  type TallKindPlural,
  type TcircleId,
  type TinitKind,
  type TidFromKind,
  type TkindPluralFrom,
  type Tcircle,
  type TpolyId,
  type Tpolygon,
  tag,
} from "public/entidades";
import { vec, type vector } from "import/utils/math/vetores";
import { create } from "zustand";
import { StorageValue, persist } from "zustand/middleware";
import { getEntityById, getKindById } from "../storeHelpers/entityGetters";
//import { initConfigs } from "public/generalConfigs";

export type State = {
  points: Map<TpointId, Tpoint>;
  segments: Map<TsegId, Tsegment>;
  angles: Map<TangId, Tangle>;
  circles: Map<TcircleId, Tcircle>;
  polygons: Map<TpolyId, Tpolygon>;
  tags: Map<TtagId, Ttag>;
  idCounters: Record<TallKind, number>;
  selections: Array<TallId>;
};

export type Action = {
  generateId: <T extends TallKind>(type: T) => TidFromKind<T>;
  toggleSelection: (id: TallId) => void;
  update: <T extends Tentity | Ttag>(newValue: T | Array<T>) => void;
  deleteEntity: (id: TentId) => void;
  movePoint: (id: TpointId, newPosition: vector, shallow?: boolean) => void;
  addTag: (value: string, entityId: TentId) => void;
  deleteTag: (id: TtagId) => void;
  clear: () => void;
  set: (state: State & Action) => void;
};

const myStore = create<State & Action>()(
  persist(
    (set, get) => ({
      set: (state) => set(() => ({ ...state })),
      points: new Map<TpointId, Tpoint>(),
      segments: new Map<TsegId, Tsegment>(),
      angles: new Map<TangId, Tangle>(),
      circles: new Map<TcircleId, Tcircle>(),
      polygons: new Map<TpolyId, Tpolygon>(),
      tags: new Map<TtagId, Ttag>(),

      idCounters: {
        point: 0,
        segment: 0,
        angle: 0,
        circle: 0,
        polygon: 0,
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

      update: <T extends Tentity | Ttag>(newValue: T | Array<T>) => {

        if(Array.isArray(newValue) && newValue.length === 0) return;

        const kind = Array.isArray(newValue) ? getKindById(newValue[0]!.id) : getKindById(newValue.id);
        
        const stateMapKey = (kind+"s") as TallKindPlural;

        const valuesToAdd = Array.isArray(newValue) ? newValue : [newValue];

        set((state)=>{
          const updatedMap = new Map(
            state[stateMapKey] as Map<TidFromKind<typeof kind>, T>,
          )

          for(let value of valuesToAdd) {
            updatedMap.set(value.id, value);
          }

          return {[stateMapKey]: updatedMap}})
      },

      deleteEntity: (id: TentId) => {
        const entityKind = getKindById(id) as Tkind;

        const stateMapKey = (entityKind + "s") as TkindPlural;

        if (entityKind == "point") {
          set((state) => {
            const updatedPoints = new Map(state.points);
            const updatedSegments = new Map(state.segments);
            const updatedAngles = new Map(state.angles);
            const updatedPolygons = new Map(state.polygons);
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

            //now for polygons
            updatedPolygons.forEach((polygon, polyId) => {
              const verticesIds = polygon.vertices.map((each) => each.id);

              if (verticesIds.includes(id as TpointId)) {
                removedIds.push(polyId);
                updatedPolygons.delete(polyId);
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
              polygons: updatedPolygons,
              selections: updatedSelections,
              tags: updatedTags,
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

      movePoint: (id, newPosition, shallow = false) =>
        set((state) => {
          if (shallow === false) {
            const updatedPoints = new Map(state.points);
            const point = updatedPoints.get(id);
            if (point) {
              updatedPoints.set(id, { ...point, coords: newPosition });
            }
            return { points: updatedPoints };
          } else {
            const point = state.points.get(id);
            if (point) {
              point.coords = vec(newPosition.x, newPosition.y);
              return {};
            }
          }
          return {};
        }),

      addTag: (value: string, entityId: TentId) => {
        const tagId = get().generateId("tag") as TtagId;

        let anchor = vec(0, 0);

        const thisEntity = getEntityById(entityId, get());

        if (!thisEntity) return;

        const entityKind = getKindById(entityId);

        switch (entityKind) {
          case "point": {
            const ref = thisEntity as Tpoint;
            anchor.add(ref.coords);
            break;
          }
          case "segment": {
            const ref = thisEntity as Tsegment;
            const { p1, p2 } = ref;
            const midPoint = vec()
              .copy(p1.coords)
              .add(vec().copy(p2.coords))
              .div(2);
            anchor.add(midPoint);
            break;
          }
          case "angle": {
            const ref = thisEntity as Tangle;
            anchor.add(ref.b.coords);
            break;
          }
          case "circle": {
            const ref = thisEntity as Tcircle;
            anchor.add(ref.center);
            break;
          }
          case "polygon": {
            const ref = thisEntity as Tpolygon;
            let centroid = vec(0, 0);
            ref.vertices.forEach((vertex) => {
              centroid.add(vertex.coords);
            });
            centroid.div(ref.vertices.length);
            anchor.add(centroid);
            break;
          }
        }

        const newTag = tag(value, entityId, tagId, vec(0, 0.35), anchor);

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

      scale: 1,

      clear: () => {
        set(() => {
          return {
            points: new Map<TpointId, Tpoint>(),
            segments: new Map<TsegId, Tsegment>(),
            angles: new Map<TangId, Tangle>(),
            circles: new Map<TcircleId, Tcircle>(),
            polygons: new Map<TpolyId, Tpolygon>(),
            tags: new Map<TtagId, Ttag>(),
          };
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
              circles: new Map(state.circles),
              polygons: new Map(state.polygons),
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
              circles: Array.from(newValue.state.circles.entries()),
              polygons: Array.from(newValue.state.polygons.entries()),
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
