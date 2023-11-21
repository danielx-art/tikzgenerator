import { useEffect, useState } from "react";

type PropsType = {
  children: React.ReactElement[];
  onChange?: (selectedIndex: number) => void;
  value: number;
  labelText?: string;
  disabled: boolean;
};

const RadioGroup: React.FC<PropsType> = ({
  children,
  onChange,
  value = 0,
  labelText,
  disabled,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(value);

  useEffect(() => {
    setSelectedIndex(value);
  }, [value]);

  function onSelect(index: number) {
    setSelectedIndex(index);
    onChange && onChange(index);
  }

  console.log(selectedIndex); //debugg

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {labelText && <div className="self-start text-c_scnd">{labelText}</div>}
      <div className="flex flex-row items-center gap-2">
        {children.map((el, index) => (
          <Option
            key={index}
            index={index}
            selectedIndex={selectedIndex}
            onSelect={(index) => onSelect(index)}
            disabled={disabled}
          >
            {el}
          </Option>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;

type TOptionProps = {
  index: number;
  selectedIndex?: number;
  onSelect: (index: number) => void;
  children: React.ReactNode;
  disabled: boolean;
};

const Option: React.FC<TOptionProps> = ({
  index,
  selectedIndex,
  onSelect,
  children,
  disabled,
}) => {
  const isSelected = index === selectedIndex;
  return (
    <div
      className={`flex h-fit flex-1 cursor-pointer select-none items-center rounded-full bg-c_base px-2 py-1 text-sm shadow transition duration-300 ${
        isSelected
          ? disabled
            ? " text-c_scnd2"
            : " text-c_scnd_int"
          : " text-c_scnd text-opacity-30"
      }`}
      onClick={disabled ? () => {} : () => onSelect(index)}
    >
      {/* <div
        className={`h-4 w-4 rounded-full border transition ${
          isSelected && "border-4 border-c_high1 bg-c_high1"
        } `}
      ></div> */}
      {children}
    </div>
  );
};
