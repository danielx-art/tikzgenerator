import type { Action, State } from "import/utils/store";
import {
  type Tentity,
  type Ttag,
  tag,
  type Tpoint,
  type Tsegment,
  type Tangle,
} from "public/entidades";
import { getEntityKind } from "./miscEntity";

const useApplyTags = (store: State & Action) => {
  const applyTags = <T extends Tentity>(tagFunction: (index: number, entity: T) => string, entities: Map<string, T>) => {
    if (!store || entities.size < 1) {
      store.setError("Não foram encontrados objetos para etiquetar");
      return;
    }

    let index = 0;
    entities.forEach((entity) => {
      const newTagValue = tagFunction(index++, entity);
      const existingTag = Array.from(store.tags.values()).find(tag => tag.entityId === entity.id);

      if (existingTag) {
        if (existingTag.value !== newTagValue) {
          store.deleteTag(existingTag.id);
        } else {
          // If the tag value hasn't changed, do nothing.
          return;
        }
      }

      const isTagInUse = Array.from(store.tags.values()).find(tag => tag.value === newTagValue && tag.entityId !== entity.id);
      if (isTagInUse) {
        // Handle error or duplicate tag scenario.
        // Set an error message or take appropriate action.
        store.deleteTag(isTagInUse.id)
        return;
      }
      store.addTag(newTagValue, entity.id); 
    });
  };

  return applyTags;
};

// const useApplyTags = (store: State & Action) => {
//   const applyTags = function <T extends Tentity>(
//     tagFunction: (i: number, entity: T) => string,
//     entities: Array<T>,
//   ) {

//     if(!store || !entities) return;

//     let tagsToAdd = [] as Ttag[];

//     let tagsToRemove = [] as Ttag[];

//     let updatedEntities = [] as Array<T>;

//     let foundError = false;

//     if(entities.length < 1) {
//       store.setError("Não foram encontrados objetos para etiquetar");
//       return;
//     }

//     const loopEntities = function(entitiesArr: Array<T>, setEntities: (updatedEntitiesOfEqualType: Array<T>) => void) {
//       for (let i = 0; i < entities.length; i++) {
//         let doNothing = false;
  
//         let currentEntity = entities[i] as T;
  
//         let entityTag = store.tags.find((tag) => tag.entityId == currentEntity.id);
  
//         let newTagValue = tagFunction(i, currentEntity);
  
//         if (entityTag) {
//           if (entityTag.value != newTagValue) {
//             tagsToRemove.push(entityTag);
//           } else {
//             doNothing = true;
//           }
//         }
  
//         if (!doNothing) {
//           const isThisTagAlreadyInUse = store.tags.find(
//             (tag) =>
//               tag.value == newTagValue && newTagValue != currentEntity.tag,
//           );
  
//           if (isThisTagAlreadyInUse) {
//             tagsToRemove.push(isThisTagAlreadyInUse);
//           }
  
//           tagsToAdd.push(tag(currentEntity, newTagValue, store.generateId("tag")));
  
//           updatedEntities.push({ ...currentEntity, tag: newTagValue }); /*debugg - not actually. This is wrong. Since 
//           updatedEntities could have points, segments or angles, meaning its not surely all the same type, and also, even if
//           given they are the same type, they are usually not ALL the entities of that type, there's no way to use
//           "setEntities(updatedEntities), I will have to split this updatedEntities into updatedPoints, updatedSegments or updatedAngles
//           and then update each one separately*/
//         } else {
//           updatedEntities.push(currentEntity);
//         }
//       }
  
//       const updatedTags = [...store.tags].filter((tag) => {
//         const toBeRemoved = tagsToRemove.find(
//           (tagToRemove) => tagToRemove.id == tag.id,
//         );
//         if (toBeRemoved) {
//           return false;
//         } else {
//           return true;
//         }
//       });
  
//       updatedTags.push(...tagsToAdd);
  
//       setEntities(updatedEntities);
//       store.setTags(updatedTags);
//     }

//     const entityKind = getEntityKind(entities[0] as T);

//     switch(entityKind) {
//       case "point": {
//         loopEntities(store.points as T[], store.setPoints as ((a:T[])=>void))
//       }
//       case "segment": {
//         loopEntities(store.segments as T[], store.setSegments as ((a:T[])=>void))
//       }
//       case "angle": {
//         loopEntities(store.angles as T[], store.setAngles as ((a:T[])=>void))
//       }
//     }

//     //this is not in use now, but maybe make it a user defined general config.
//     if (foundError) {
//       store?.setError(
//         store?.error +
//           "Alguma(s) tag(s) que já estão em uso não foram aplicadas, para evitar duplicatas. Caso deseje, limpe todas as etiquetas, depois selecione todos os objetos que deseja etiquetar e etiquete-os novamente. ",
//       );
//     }
//   };

//   return applyTags;
// };

export default useApplyTags;
