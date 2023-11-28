import { type Action, type State } from "import/utils/store";
import { type Tentity, type Ttag } from "public/entidades";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { findTagByEntityId, getEntityKind } from "import/utils/miscEntity";
import EnterIconSvg from "import/components/micro/EnterIconSVG";

type PropsType = {
  store: State & Action;
  thisEntity: Tentity | Ttag | undefined;
  thisTag: Ttag | undefined;
};

const TagEditable: React.FC<PropsType> = ({ store, thisEntity, thisTag }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [editMode, setEditMode] = useState(false);

  useEffect(()=>{
    if(!thisEntity) return;
    const entityKind = getEntityKind(thisEntity);
    if(entityKind == "tag") {
      const thisEntTypeSure = thisEntity as Ttag;
      setInputValue(thisEntTypeSure.value);
    } else {
      const thisEntTypeSure = thisEntity as Tentity;
      setInputValue(findTagByEntityId(thisEntity.id, store.tags)?.value || "");
    }

  },[thisEntity])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBtnPress = () => {
    if (!store || !thisEntity || !thisTag) return;
    if (!editMode) {
      setEditMode(true);
    } else {
      if (inputValue.length <= 0) return;
      const updatedTags = new Map(store.tags);
      updatedTags.set(thisTag.id, {...thisTag, value: inputValue});
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
    <div className="flex flex-1 flex-row flex-nowrap gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={!editMode}
        className={`${
          editMode ? "" : "bg-c_discrete"
        } flex-1 focus:outline-c_high1 p-2`}
      />
      <button onClick={handleBtnPress}>
        {editMode ? (
          <div className="h-4 w-4">
            <EnterIconSvg />
          </div>
        ) : (
          // <svg
          //   xmlns="http://www.w3.org/2000/svg"
          //   fill="none"
          //   viewBox="0 0 24 24"
          //   strokeWidth="1.5"
          //   stroke="currentColor"
          //   className="h-6 w-6"
          // >
          //   <path
          //     strokeLinecap="round"
          //     strokeLinejoin="round"
          //     d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
          //   />
          //   <path
          //     strokeLinecap="round"
          //     strokeLinejoin="round"
          //     d="M6 6h.008v.008H6V6z"
          //   />
          // </svg>
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
