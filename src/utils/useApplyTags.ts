import type { Action, State } from "import/utils/store";
import { type Tentity, type Tetiqueta, etiqueta } from "public/entidades";

const useApplyTags = (store: State & Action) => {
  const applyTags = <T extends Tentity>(
    tagFunction: (i: number, entity: T) => string,
    entities: T[],
    tags: State["tags"],
    setTags: Action["setTags"],
    generateId: Action["generateId"],
  ) => {

    let tagsToAdd = [] as Tetiqueta[];

    let tagsToRemove = [] as Tetiqueta[];

    let foundError = false;

    for (let i = 0; i < entities.length; i++) {
      let currentEntity = entities[i] as T;

      let tagOccupied =
        currentEntity.etiqueta.length > 0
          ? tags.find((tag) => tag.entityId == currentEntity.id)
          : undefined;

      let newTagValue = tagFunction(i, currentEntity);

      
      if (tagOccupied) {
        tagsToRemove.push(tagOccupied);
      }
      
      const alreadyInUse = tags.find((tag) => tag.value == newTagValue);
      
      if (alreadyInUse) {
        if(!(tagOccupied && tagOccupied.id == alreadyInUse.id)) tagsToRemove.push(alreadyInUse);
      }

      tagsToAdd.push(etiqueta(currentEntity, newTagValue, generateId("tag")));

    }

    const updatedTags = [...tags].filter((tag)=>{
      const toBeRemoved = tagsToRemove.find(tagToRemove=>tagToRemove.id == tag.id);
      if(toBeRemoved) {
        return false;
      } else {
        return true;
      }
    });


    updatedTags.push(...tagsToAdd);

    setTags(updatedTags);

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
