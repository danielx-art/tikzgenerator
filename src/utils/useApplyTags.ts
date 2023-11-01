import type { Action, State } from "import/utils/store";
import { type Tentity, type Tetiqueta, etiqueta } from "public/entidades";

const useApplyTags = (store: (State & Action)) => {

  const applyTags = <T extends Tentity>(
    tagFunction: (i: number, entity: T) => string ,
    entities: T[],
    tags: State["tags"],
    setTags: Action["setTags"],
    generateId: Action["generateId"],
  ) => {
    let recipeNewTags = [] as {entity: Tentity, value: string, numId:number, strId?: string}[];
    let tagsToRemove = [] as Tetiqueta[];

    let foundError = false;

    for (let i = 0; i < entities.length; i++) {
      let currentEntity = entities[i] as T;

      //1.find if entity already has a tag, then add it to remove list.
      let tagOccupied = tags.find((tag) => tag.entityId == currentEntity.id);

      //2.find if this tag is already in use, to ensure unique tags
      let newTagValue = tagFunction(i, currentEntity);
      const alreadyInUse = tags.find((tag) => tag.value == newTagValue) != undefined ? true : false;

      if (alreadyInUse) {
        //dont write a tag for this one, just continue
        continue;
      }

      //if the new tag is not in use but the entity is occupied with a tag, remove that occupied tag from it
      if(!alreadyInUse && tagOccupied) {
        tagsToRemove.push(tagOccupied)
      }

      //const newTagId = generateId("tag", tagsToAdd.length);
      const newTagProps = {entity: currentEntity, value: newTagValue, numId: recipeNewTags.length};
      //const newTag = etiqueta(currentEntity, newTagValue, newTagId);
      recipeNewTags.push(newTagProps);
    }

    for (let i = 0; i < recipeNewTags.length; i++) {
      const currentTag = recipeNewTags[i]!;
      const newTagId = generateId("tag", currentTag.numId - tagsToRemove.length);
      currentTag.strId = newTagId
    }

    const updatedTags = [] as Tetiqueta[];

    for (let i = 0; i < tags.length; i++) {
      const currentTag = tags[i] as Tetiqueta;
      const toBeRemoved = tagsToRemove.find(
        (item) => (item.id = currentTag.id),
      );
      if (toBeRemoved) {
        continue;
      }
      updatedTags.push(currentTag);
    }

    const tagsToAdd = recipeNewTags.map((recipe)=>etiqueta(recipe.entity, recipe.value, recipe.strId!))

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
