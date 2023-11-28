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
      {/*
        1.shows current selected entity tag, if none showns "Nenhuma"
        2.a button to the side, pencil, to enable edit mode
        3. if edit mode enabled, the tag turns into an editable input
        4.after editing input, user can submit it pressing enter or clicking the pencil button that now has turned into an enter symbol
        5.if so, tag is changed both in entity and on the tag object itself
        6.Choose tag positioning: rosa dos ventos, on click change orientation (8 options), and also set distance, also a button that changes distance shown on click
        7.when positioning is set and distance too, then show on preview
        */}
    </div>
  );
};

export default TagCustomization;
