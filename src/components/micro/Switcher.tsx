type PropsType = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  messageOne?: string;
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
    <label className="group isolate flex cursor-pointer select-none flex-nowrap items-center justify-start">
      {messageOne && (
        <div
          className={`${
            isChecked ? "text-c_scnd_int" : "text-c_faded"
          } text-sm`}
        >
          {messageOne}
        </div>
      )}
      <div className="mx-4">
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
      {messageTwo && (
        <div
          className={`${
            !isChecked ? "text-c_scnd_int" : "text-c_faded"
          } whitespace-nowrap text-sm`}
        >
          {messageTwo}
        </div>
      )}
    </label>
  );
};

export default Switcher;
