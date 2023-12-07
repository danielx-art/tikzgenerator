import {
  Tentity,
  Ttag,
  TentId,
  Tkind,
  TallId,
  TallKind,
  TpointId,
  TsegId,
  TangId,
  TtagId,
  Tpoint,
  Tsegment,
  Tangle,
} from "public/entidades";
import { type Action, type State } from "import/utils/store";

export function findTagByEntityId(
  entityId: TentId,
  tags: Map<TtagId, Ttag>,
): Ttag | undefined {
  for (let [tagId, tag] of tags) {
    if (tag.entityId === entityId) {
      return tag;
    }
  }
  return undefined;
}

export function getEntityById(id: TallId, store: (State & Action) | undefined) {
  if (!store) return;

  const entityKind = getKindById(id);

  switch (entityKind) {
    case "point":
      return store.points.get(id as TpointId);
    case "segment":
      return store.segments.get(id as TsegId);
    case "angle":
      return store.angles.get(id as TangId);
    case "tag":
      return store.tags.get(id as TtagId);
    default:
      return;
  }
}

export function getKindById(id: TallId) {
  return id.split("_")[0] as TallKind;
}

export function getEntityKind(ent: Tentity | Ttag) {
  const entityKind = ent.id.split("_")[0] as TallKind;
  return entityKind;
}

export function fromSelectionsGet<T extends TallKind>(
  kind: T,
  selections: Array<TallId>,
) {
  const result = [...selections].filter((selId) => {
    const selKind = getKindById(selId);
    if (selKind == kind) {
      return true;
    }
    return false;
  }) as T extends "point"
    ? Array<TpointId>
    : T extends "segment"
    ? Array<TsegId>
    : T extends "angle"
    ? Array<TangId>
    : Array<TtagId>;

  return result;
}

export type TArrAllId = ReturnType<typeof fromSelectionsGet>;

export function getSelected<T extends TallKind>(
  kind: T,
  store: State & Action,
):
  | (T extends "point"
      ? Array<Tpoint>
      : T extends "segment"
      ? Array<Tsegment>
      : T extends "angle"
      ? Array<Tangle>
      : T extends TangId
      ? Array<Ttag>
      : undefined)
  | [] {
  if (store.selections.length < 1) return [] as any;

  const selections = fromSelectionsGet(kind, store.selections);

  if (selections.length < 1) return [] as any;

  const firstKind = getKindById(selections[0]!);

  switch (firstKind) {
    case "point": {
      let selected = [] as Array<Tpoint>;
      for (let sel of selections) {
        selected.push(store.points.get(sel as TpointId)!);
      }
      return selected as any;
    }
    case "segment": {
      let selected = [] as Array<Tsegment>;
      for (let sel of selections) {
        selected.push(store.segments.get(sel as TsegId)!);
      }
      return selected as any;
    }
    case "angle": {
      let selected = [] as Array<Tangle>;
      for (let sel of selections) {
        selected.push(store.angles.get(sel as TangId)!);
      }
      return selected as any;
    }
    case "tag": {
      let selected = [] as Array<Ttag>;
      for (let sel of selections) {
        selected.push(store.tags.get(sel as TtagId)!);
      }
      return selected as any;
    }
  }
  return [] as any;
}
