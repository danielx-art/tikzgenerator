import {
  Tangle,
  Tentity,
  TentityWithKind,
  Ttag,
  Tpoint,
  Tsegment,
} from "public/entidades";
import { type Action, type State } from "import/utils/store";

export function getEntityKind(ent: Tentity|Ttag):"point"|"segment"|"angle"|"tag" {
  const entityKind = ent.id.split("_")[0] as "point"|"segment"|"angle"|"tag";
  //if(!entityKind) return "general";
  return entityKind;
}

export function findTagByEntityId(entityId: string, tags: Map<string, Ttag>): Ttag | undefined {
  for (let [tagId, tag] of tags) {
    if (tag.entityId === entityId) {
      return tag;
    }
  }
  return undefined;
};

export function getEntityById(
  id: string,
  store: (State & Action) | undefined,
) {
  if (!store) return;

  const entityKind = id.split("_")[0];

  switch (entityKind) {
    case "point":
      return store.points.get(id);
    case "segment":
      return store.segments.get(id);
    case "angle":
      return store.angles.get(id);
    case "tag":
      return store.tags.get(id);
    default:
      return;
  }
}

// export function updateTag(
//   store: State & Action,
//   thisTag: Ttag,
//   updatedTag: Ttag,
// ): void {
//   const updatedTags = [...store.tags].map((tag) =>
//     tag.id == thisTag.id ? updatedTag : tag,
//   );

//   store.setTags(updatedTags);

//   const thisEntity = getEntityById(thisTag.entityId, store);

//   if (!thisEntity) return;

//   switch (thisEntity.kind) {
//     case "point": {
//       const updatedPoints = [...store.points].map((point) =>
//         point.id == thisEntity.id
//           ? { ...point, tag: updatedTag.value }
//           : point,
//       );
//       store.setPoints(updatedPoints);
//       break;
//     }
//     case "segment": {
//       const updatedSegs = [...store.segments].map((seg) =>
//         seg.id == thisEntity.id ? { ...seg, tag: updatedTag.value } : seg,
//       );
//       store.setSegments(updatedSegs);
//       break;
//     }
//     case "angle": {
//       const updatedAngles = [...store.angles].map((angle) =>
//         angle.id == thisEntity.id
//           ? { ...angle, tag: updatedTag.value }
//           : angle,
//       );
//       store.setAngles(updatedAngles);
//       break;
//     }
//   }

//   return;
// }

// export function toggleEntitySelection(store: State&Action, entity: Tentity|Ttag){

//   const entityKind = getEntityKind(entity);
//   const storeKey = `${entityKind}s` as "points"|"segments"|"angles"|"tags"; 
//   const entitiesArr = store[storeKey];
//   const storeSetterKey = "set" + storeKey[0]!.toUpperCase() + storeKey.slice(1) as "setPoints"|"setSegments"|"setAngles"|"setTags"
//   const entitiesSetter = store[storeSetterKey];
//   const updatedEntities = [...entitiesArr].map(ent=>ent.id===entity.id?{...ent, selected: !ent.selected}:ent);
//   // @ts-ignore
//   entitiesSetter(updatedEntities);
//   const updatedSelectedEntities = [...store.selectedEntities[storeKey]];
//   const indexToChange = updatedSelectedEntities.indexOf(parseInt(entity.id));
//   if(indexToChange > -1){
//     updatedSelectedEntities.splice(indexToChange, 1);
//   } else {
//     updatedSelectedEntities.push(parseInt(entity.id));
//   }
//   store.setSelectedEntities({...store.selectedEntities, [storeKey]: updatedSelectedEntities});

// }
