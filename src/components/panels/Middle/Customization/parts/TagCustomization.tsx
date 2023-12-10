import { type Action, type State } from "import/utils/store";
import { TentId, type Tentity, type Ttag } from "public/entidades";
import { useEffect, useState } from "react";
import TagDirectionChanger from "./TagDirectionChanger";
import TagEditable from "./TagEditable";
import { findTagByEntityId, getEntityKind } from "import/utils/miscEntity";
import TagColorChanger from "./TagColorChanger";

type PropsType = {
  store: State & Action;
  thisEntity: Tentity | Ttag | undefined;
};

const TagCustomization: React.FC<PropsType> = ({ store, thisEntity }) => {
  const [thisTag, setThisTag] = useState<Ttag>();

  useEffect(() => {
    if (!store.tab || !thisEntity) return;

    const thisEntityKind = getEntityKind(thisEntity);

    if (thisEntityKind === "tag") {
      setThisTag(thisEntity as Ttag);
    }

    const foundTag = thisEntity
      ? findTagByEntityId(thisEntity.id as TentId, store.tags)
      : undefined;

    if (!foundTag) return;
    setThisTag(foundTag);
  }, [thisEntity]);

  return (
    <div className="mb-2 flex w-full flex-col gap-2">
      <div className="">Etiqueta</div>
      <div className="flex flex-1 flex-row gap-4">
        <TagEditable
          store={store}
          thisEntity={thisEntity}
          thisTag={thisTag}
          key={`tagEditable_${thisEntity?.id || "_e"}_${thisTag?.id || "_t"}`}
        />
        <TagDirectionChanger
          store={store}
          thisEntity={thisEntity}
          thisTag={thisTag}
          key={`tagDirectionChanger_${thisEntity?.id || "_e"}_${
            thisTag?.id || "_t"
          }`}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <TagColorChanger
          store={store}
          thisTag={thisTag}
          key={`tagColorChanger_${thisEntity?.id || "_e"}_${
            thisTag?.id || "_t"
          }`}
        />
      </div>
    </div>
  );
};

export default TagCustomization;
