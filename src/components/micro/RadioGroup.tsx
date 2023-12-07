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
    onChange && onChange(index);
    setSelectedIndex(index);
  }

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
        disabled
          ? "text-c_scnd2 text-opacity-50"
          : isSelected
          ? " text-c_scnd_int"
          : " text-c_scnd2"
      }`}
      onClick={disabled ? () => {} : () => onSelect(index)}
    >
      {children}
    </div>
  );
};
