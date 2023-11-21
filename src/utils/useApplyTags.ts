import type { Action, State } from "import/utils/store";
import {
  type Tentity,
  type Tetiqueta,
  etiqueta,
  type Tponto,
  type Tsegmento,
  type Tangulo,
} from "public/entidades";

const useApplyTags = (store: State & Action) => {
  const applyTags = function <T extends Tentity>(
    tagFunction: (i: number, entity: T) => string,
    entities: Array<T>,
    setEntities: (updatedEntities: Array<T>) => void,
    tags: State["tags"],
    setTags: Action["setTags"],
    generateId: Action["generateId"],
  ) {
    let tagsToAdd = [] as Tetiqueta[];

    let tagsToRemove = [] as Tetiqueta[];

    let foundError = false;

    for (let i = 0; i < entities.length; i++) {
      let doNothing = false;

      let currentEntity = entities[i] as T;

      let entityTag = tags.find((tag) => tag.entityId == currentEntity.id);
      const entityAlreadyHasTag = entityTag ? true : false;

      let newTagValue = tagFunction(i, currentEntity);

      if (entityTag) {
        if (entityTag.value != newTagValue) {
          tagsToRemove.push(entityTag);
        } else {
          doNothing = true;
        }
      }

      if (!doNothing) {
        const isThisTagAlreadyInUse = tags.find(
          (tag) =>
            tag.value == newTagValue && newTagValue != currentEntity.etiqueta,
        );

        if (isThisTagAlreadyInUse) {
          tagsToRemove.push(isThisTagAlreadyInUse);
        }

        tagsToAdd.push(
          etiqueta(
            currentEntity,
            entities,
            setEntities,
            newTagValue,
            generateId("tag"),
          ),
        );
      }
    }

    const updatedTags = [...tags].filter((tag) => {
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

    setTags(updatedTags);

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

export default useApplyTags;
