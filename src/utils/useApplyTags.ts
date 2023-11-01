import myStore, { Action, State } from "import/utils/store";
import useStore from "./useStore";
import { type Tentity, type Tetiqueta, etiqueta } from "public/entidades";

const useApplyTags = (store: (State & Action)) => {

  const applyTags = <T extends Tentity>(
    tagFunction: (i: number) => string,
    entities: T[],
    tags: Tetiqueta[],
    setTags: (etiqueta: Tetiqueta[]) => void,
  ) => {
    let tagsToAdd = [] as Tetiqueta[];
    let tagsToRemove = [] as Tetiqueta[];

    let foundError = false;

    for (let i = 0; i < entities.length; i++) {
      let currentEntity = entities[i] as T;

      //1.find if entity already has a tag, then add it to remove list.
      let tagOccupied = tags.find((tag) => tag.entityId == currentEntity.id);

      //2.find if this tag is already in use, to ensure unique tags
      let newTagValue = tagFunction(i);
      const alreadyInUse = tags.find((tag) => tag.value == newTagValue) != undefined ? true : false;

      if (alreadyInUse) {
        //dont write a tag for this one, just continue
        continue;
      }

      //if the new tag is not in use but the entity is occupied with a tag, remove that occupied tag from it
      if(!alreadyInUse && tagOccupied) {
        tagsToRemove.push(tagOccupied)
      }

      const newTagId = `tag-${tags.length + tagsToAdd.length}`;
      const newTag = etiqueta(currentEntity, newTagValue, newTagId);
      tagsToAdd.push(newTag);
    }

    for (let i = 0; i < tagsToAdd.length; i++) {
      const currentTag = tagsToAdd[i] as Tetiqueta;
      const currentTagNumberStr = currentTag.id.split("-")[1] as string;
      const currentTagNumber = parseInt(currentTagNumberStr);
      currentTag.id = `tag-${currentTagNumber - tagsToRemove.length}`;
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
