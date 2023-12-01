import { type Action, type State } from "import/utils/store";
import { type Tentity, type Ttag } from "public/entidades";
import { useEffect, useState } from "react";
import TagDirectionChanger from "./TagDirectionChanger";
import TagEditable from "./TagEditable";
import { findTagByEntityId } from "import/utils/miscEntity";

type PropsType = {
  store: State & Action;
  thisEntity: Tentity | Ttag | undefined;
};

const TagCustomization: React.FC<PropsType> = ({ store, thisEntity }) => {
  const [thisTag, setThisTag] = useState<Ttag>();

  useEffect(() => {
    if (!store.tab) return;

    //add the fact thisEntity could also be a tag itself
    const foundTag = thisEntity
      ? findTagByEntityId(thisEntity.id, store.tags)
      : undefined;

    if (!foundTag) return;
    setThisTag(foundTag);
  }, [thisEntity]);

  return (
    <div className="mb-2 flex w-full flex-col gap-2">
      <div className="">Etiqueta</div>
      <div className="flex-1 flex flex-row gap-4">
      <TagEditable store={store} thisEntity={thisEntity} thisTag={thisTag} />
      <TagDirectionChanger
        store={store}
        thisEntity={thisEntity}
        thisTag={thisTag}
      />
      </div>
    </div>
  );
};

export default TagCustomization;
