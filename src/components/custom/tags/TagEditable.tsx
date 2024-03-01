import useStore from "import/utils/store/useStore";
import myStore from "import/utils/store/store";
import type { TallId, TtagId, Tentity, Ttag, TentId } from "public/entidades";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import {
  findTagByEntityId,
  getKindById,
} from "import/utils/storeHelpers/entityGetters";
import EnterIconSvg from "import/components/micro/EnterIconSVG";

type PropsType = {
  thisTagId: TtagId | undefined;
  thisEntityId: TallId | undefined;
};

const TagEditable: React.FC<PropsType> = ({ thisTagId, thisEntityId }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const store = useStore(myStore, (state) => state);

  useEffect(() => {
    
    if (!store || !thisEntityId) {
      setInputValue("");
      return;
    }


    if(!thisTagId) {
      setInputValue("");
      return;
    }

    const thisTag = store.tags.get(thisTagId);

    if(!thisTag) {
      setInputValue("");
      return;
    }
    const firstValue = thisTag.value;
    setInputValue(firstValue);
  }, [thisTagId, thisEntityId, store]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBtnPress = () => {
    if (!store || disabled || !thisEntityId) return;
    if (!editMode) {
      setEditMode(true);
    } else {
      if (inputValue.length <= 0) {
        if(thisTagId) {
          store.deleteTag(thisTagId);
        }
        setInputValue("");
        setEditMode(false);
        return;
      } else {
        const updatedTags = new Map(store.tags);
        const thisTagExists = thisTagId ? store.tags.has(thisTagId) : false;
        if(thisTagId && thisTagExists){
          
          const thisTag = store.tags.get(thisTagId)!;
          updatedTags.set(thisTagId, { ...thisTag, value: inputValue });
          store.setTags(updatedTags);
        } else if ( thisEntityId ) {

          store.addTag(inputValue, thisEntityId as TentId);
        }
        setEditMode(false);
      }
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
        disabled={disabled || !editMode}
        className={`${
          editMode ? "" : "bg-c_discrete"
        } w-10 p-2 focus:outline-c_high1`}
      />
      <button onClick={handleBtnPress} disabled={disabled}>
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
