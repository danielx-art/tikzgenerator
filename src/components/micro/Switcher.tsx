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
            isChecked ? "text-foreground_int" : "text-muted"
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
        <div className="relative h-3 w-6 rounded-full bg-background ring-1 ring-primary group-hover:ring-foregroung">
          <div
            className={`absolute left-0 top-0 flex h-full w-1/2 items-center justify-center rounded-full bg-primary transition group-hover:bg-foregroung ${
              isChecked ? "translate-x-0" : "translate-x-full"
            }`}
          ></div>
        </div>
      </div>
      {messageTwo && (
        <div
          className={`${
            !isChecked ? "text-foreground_int" : "text-muted"
          } whitespace-nowrap text-sm`}
        >
          {messageTwo}
        </div>
      )}
    </label>
  );
};

export default Switcher;
