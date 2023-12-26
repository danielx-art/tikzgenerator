import { useState } from "react";

type PropsType = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  messageOne: string;
  messageTwo?: string;
  onChange?: () => void;
};

const Switcher: React.FC<PropsType> = ({
  isChecked,
  setIsChecked,
  messageOne,
  messageTwo,
  onChange,
}) => {
  const handleCheckboxChange = () => {
    if (onChange) onChange();
    setIsChecked((prev) => !prev);
  };

  return (
    <label className="group isolate flex cursor-pointer select-none flex-wrap items-center justify-center px-2 py-2">
      <div
        className={`${
          isChecked ? "text-c_scnd_int" : "text-c_faded"
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
        <div className="relative h-3 w-6 rounded-full bg-c_base ring-1 ring-c_interact group-hover:ring-c_high1">
          <div
            className={`absolute left-0 top-0 flex h-full w-1/2 items-center justify-center rounded-full bg-c_interact transition group-hover:bg-c_high1 ${
              isChecked ? "translate-x-0" : "translate-x-full"
            }`}
          ></div>
        </div>
      </div>
      {messageTwo && <div
        className={`${
          !isChecked ? "text-c_scnd_int" : "text-c_faded"
        } whitespace-nowrap px-2 text-sm`}
      >
        {messageTwo}
      </div>}
    </label>
  );
};

export default Switcher;
