import useStore from "import/utils/useStore";
import myStore from "import/utils/store";
import type { TallId, TtagId, Tentity, Ttag, TentId } from "public/entidades";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import {
  findTagByEntityId,
  getEntityKind,
  getKindById,
} from "import/utils/miscEntity";
import EnterIconSvg from "import/components/micro/EnterIconSVG";

type PropsType = {
  thisEntityId: TallId | undefined;
  thisTagId: TtagId | undefined;
};

const TagEditable: React.FC<PropsType> = ({ thisEntityId, thisTagId }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [editMode, setEditMode] = useState(false);

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    if (!thisEntityId || !store) {
      setEditMode(false);
      return;
    }
    const entityKind = getKindById(thisEntityId);
    if (entityKind === "tag") {
      const thisEntityWithKind = thisEntityId as TtagId;
      const tagValue = store.tags.get(thisEntityWithKind)?.value || "";
      setInputValue(tagValue);
    } else {
      const thisEntityWithKind = thisEntityId as TentId;

      setInputValue(
        findTagByEntityId(thisEntityWithKind, store.tags)?.value || "",
      );
    }
  }, [thisEntityId, editMode]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBtnPress = () => {
    if (!store || !thisEntityId || !thisTagId) return;
    if (!editMode) {
      setEditMode(true);
    } else {
      if (inputValue.length <= 0) return;
      const updatedTags = new Map(store.tags);
      const thisTag = store.tags.get(thisTagId)!;
      updatedTags.set(thisTagId, { ...thisTag, value: inputValue });
      store.setTags(updatedTags);
      setEditMode(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBtnPress();
    }
  };

  return (
    <div className="flex flex-row flex-nowrap gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={!editMode}
        className={`${
          editMode ? "" : "bg-c_discrete"
        } w-10 p-2 focus:outline-c_high1`}
      />
      <button onClick={handleBtnPress}>
        {editMode ? (
          <div className="h-4 w-4">
            <EnterIconSvg />
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default TagEditable;
