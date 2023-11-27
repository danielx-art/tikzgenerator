import type { Action, State } from "import/utils/store";
import {
  type Tentity,
  type Ttag,
  etiqueta,
  type Tpoint,
  type Tsegment,
  type Tangle,
} from "public/entidades";
import { getEntityKind } from "./miscEntity";

const useApplyTags = (store: State & Action) => {
  const applyTags = function <T extends Tentity>(
    tagFunction: (i: number, entity: T) => string,
    entities: Array<T>,
  ) {

    if(!store || !entities) return;

    let tagsToAdd = [] as Ttag[];

    let tagsToRemove = [] as Ttag[];

    let updatedEntitiesByType = {points: [], segments: [], angles: []} as {points: Array<Tpoint>, segments: Array<Tsegment>, angles: Array<Tangle>};

    let foundError = false;

    if(entities.length < 1) {
      store.setError("Não foram encontrados objetos para etiquetar");
      return;
    }

    for (let i = 0; i < entities.length; i++) {
      let doNothing = false;

      let currentEntity = entities[i] as T;

      let entityTag = store.tags.find((tag) => tag.entityId == currentEntity.id);

      let newTagValue = tagFunction(i, currentEntity);

      if (entityTag) {
        if (entityTag.value != newTagValue) {
          tagsToRemove.push(entityTag);
        } else {
          doNothing = true;
        }
      }

      if (!doNothing) {
        const isThisTagAlreadyInUse = store.tags.find(
          (tag) =>
            tag.value == newTagValue && newTagValue != currentEntity.etiqueta,
        );

        if (isThisTagAlreadyInUse) {
          tagsToRemove.push(isThisTagAlreadyInUse);
        }

        tagsToAdd.push(etiqueta(currentEntity, newTagValue, store.generateId("tag")));

        const updatedEntitiy = { ...currentEntity, etiqueta: newTagValue };
        
        const updatesKey = getEntityKind(updatedEntitiy) as "point"|"segment"|"angle"

        //@ts-ignore
        updatedEntitiesByType[`${updatesKey}s`].push(updatedEntitiy);
        
        /*debugg - not actually. This is wrong. Since 
        updatedEntities could have points, segments or angles, meaning its not surely all the same type, and also, even if
        given they are the same type, they are usually not ALL the entities of that type, there's no way to use
        "setEntities(updatedEntities), I will have to split this updatedEntities into updatedPoints, updatedSegments or updatedAngles
        and then update each one separately*/
      }
      
      const updatedTags = [...store.tags].filter((tag) => {
        const toBeRemoved = tagsToRemove.find(
          (tagToRemove) => tagToRemove.id == tag.id,
        );
        if (toBeRemoved) {
          return false;
        } else {
          return true;
        }
      });
  
      updatedTags.push(...tagsToAdd);
      
      store.setTags(updatedTags);
    }

    //this is not in use now, but maybe make it a user defined general config.
    if (foundError) {
      store?.setError(
        store?.error +
          "Alguma(s) etiqueta(s) que já estão em uso não foram aplicadas, para evitar duplicatas. Caso deseje, limpe todas as etiquetas, depois selecione todos os objetos que deseja etiquetar e etiquete-os novamente. ",
      );
    }
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
//               tag.value == newTagValue && newTagValue != currentEntity.etiqueta,
//           );
  
//           if (isThisTagAlreadyInUse) {
//             tagsToRemove.push(isThisTagAlreadyInUse);
//           }
  
//           tagsToAdd.push(etiqueta(currentEntity, newTagValue, store.generateId("tag")));
  
//           updatedEntities.push({ ...currentEntity, etiqueta: newTagValue }); /*debugg - not actually. This is wrong. Since 
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
//           "Alguma(s) etiqueta(s) que já estão em uso não foram aplicadas, para evitar duplicatas. Caso deseje, limpe todas as etiquetas, depois selecione todos os objetos que deseja etiquetar e etiquete-os novamente. ",
//       );
//     }
//   };

//   return applyTags;
// };

export default useApplyTags;
