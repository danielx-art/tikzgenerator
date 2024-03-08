import type { Action, State } from "import/utils/store/store";
import { type Tentity } from "public/entidades";
import { toast } from "sonner";

const useApplyTags = (store: State & Action) => {
  const applyTags = <T extends Tentity>(
    tagFunction: (index: number, entity: T) => string,
    entities: Map<string, T>,
  ) => {
    if (!store || entities.size < 1) {
      toast.error("Não foram encontrados objetos para etiquetar");
      return;
    }

    let index = 0;
    entities.forEach((entity) => {
      const newTagValue = tagFunction(index++, entity);
      const existingTag = Array.from(store.tags.values()).find(
        (tag) => tag.entityId === entity.id,
      );

      if (existingTag) {
        if (existingTag.value !== newTagValue) {
          store.deleteTag(existingTag.id);
        } else {
          // If the tag value hasn't changed, do nothing.
          return;
        }
      }

      const isTagInUse = Array.from(store.tags.values()).find(
        (tag) => tag.value === newTagValue && tag.entityId !== entity.id,
      );
      if (isTagInUse) {
        store.deleteTag(isTagInUse.id);
      }
      store.addTag(newTagValue, entity.id);
    });
  };

  return applyTags;
};

export default useApplyTags;
