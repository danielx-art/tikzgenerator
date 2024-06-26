import { useEffect, useState } from "react";
import { Button } from "./ui/button";

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
      {labelText && <div className="self-start text-foreground">{labelText}</div>}
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
    <Button
      className={`${
        disabled
          ? "text-foreground/50"
          : isSelected
          ? " text-foreground ring-1 ring-primary/50"
          : " text-foreground"
      }`}
      onClick={disabled ? () => {} : () => onSelect(index)}
    >
      {children}
    </Button>
  );
};
