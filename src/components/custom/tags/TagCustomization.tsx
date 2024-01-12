import type { TallId, TentId, TtagId } from "public/entidades";
import { useEffect, useState } from "react";
import TagDirectionChanger from "./TagDirectionChanger";
import TagEditable from "./TagEditable";
import {
  findTagByEntityId,
  getKindById,
} from "import/utils/storeHelpers/miscEntity";
import TagColorChanger from "./TagColorChanger";
import TagSizeChanger from "./TagSizeChanger";
import useStore from "import/utils/store/useStore";
import myStore from "import/utils/store/store";

type PropsType = {
  thisEntityId: TallId | undefined;
};

const TagCustomization: React.FC<PropsType> = ({ thisEntityId }) => {
  const [thisTagId, setThisTagId] = useState<TtagId>();

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!store || !thisEntityId) return;

    const thisEntityKind = getKindById(thisEntityId);

    if (thisEntityKind === "tag") {
      setThisTagId(thisEntityId as TtagId);
      return;
    }

    const foundTagId = thisEntityId
      ? findTagByEntityId(thisEntityId as TentId, store.tags)?.id
      : undefined;

    if (!foundTagId) return;
    setThisTagId(foundTagId);
  }, [store, thisEntityId]);

  return (
    <div className="mb-2 flex w-full flex-col gap-2">
      <div className="grid items-center">Etiqueta</div>
      <div className="flex flex-1 flex-row flex-wrap justify-evenly gap-6">
        <TagEditable
          thisTagId={thisTagId}
          thisEntityId={thisEntityId}
          key={`tagEditable_${thisEntityId || "_e"}_${thisTagId || "_t"}`}
        />
        <TagDirectionChanger
          thisTagId={thisTagId}
          key={`tagDirectionChanger_${thisEntityId || "_e"}_${
            thisTagId || "_t"
          }`}
        />
        <TagColorChanger
          thisTagId={thisTagId}
          key={`tagColorChanger_${thisEntityId || "_e"}_${thisTagId || "_t"}`}
        />
        <TagSizeChanger
          thisTagId={thisTagId}
          key={`tagSizeChanger_${thisEntityId || "_e"}_${thisTagId || "_t"}`}
        />
      </div>
    </div>
  );
};

export default TagCustomization;
