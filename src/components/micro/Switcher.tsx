import { useState } from "react";

type PropsType = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  messageOne: string;
  messageTwo: string;
};

const Switcher: React.FC<PropsType> = ({
  isChecked,
  setIsChecked,
  messageOne,
  messageTwo,
}) => {
  const handleCheckboxChange = () => setIsChecked((prev) => !prev);

  return (
    <label className="isolate flex cursor-pointer select-none items-center px-2 py-2">
      <div
        className={`${
          isChecked ? "text-a_highlight" : "text-a_neutral"
        } px-2 text-sm`}
      >
        {messageOne}
      </div>
      <div className="mx-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <div className="relative h-3 w-6 rounded-full bg-a_highlight ring-2 ring-a_highlight">
          <div
            className={`absolute left-0 top-0 flex h-full w-1/2 items-center justify-center rounded-full bg-a_aux transition ${
              isChecked ? "translate-x-0" : "translate-x-full"
            }`}
          ></div>
        </div>
      </div>
      <div
        className={`${
          !isChecked ? "text-a_highlight" : "text-a_neutral"
        } whitespace-nowrap px-2 text-sm`}
      >
        {messageTwo}
      </div>
    </label>
  );
};

export default Switcher;
