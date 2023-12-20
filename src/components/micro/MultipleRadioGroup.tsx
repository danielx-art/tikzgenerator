import { useEffect, useState } from "react";

type PropsType = {
  children: Array<Array<React.ReactElement>>;
  onChange?: (selectedIndex: number) => void;
  selBtnIndex: number;
  multSelectedIndex: number;
  labelText?: string;
  disabled: boolean;
};

const MultipleRadioGroup: React.FC<PropsType> = ({
  children,
  onChange,
  selBtnIndex,
  multSelectedIndex,
  labelText,
  disabled,
}) => {
  //   const [selectedIndex, setSelectedIndex] = useState<number>(selBtnIndex);

  //   useEffect(() => {
  //     setSelectedIndex(selBtnIndex);
  //   }, [selBtnIndex]);

  function onClick(index: number) {
    onChange && onChange(index);
    setSelectedIndex(index);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {labelText && <div className="self-start text-c_scnd">{labelText}</div>}
      <div className="flex flex-row items-center gap-2">
        {children.map((btn, index) => (
          <MultOption
            key={index}
            buttonIndex={index}
            selBtnIndex={selectedIndex}
            multSelectedIndex={multSelectedIndex}
            onClick={(index) => onClick(index)}
            disabled={disabled}
          >
            {btn}
          </MultOption>
        ))}
      </div>
    </div>
  );
};

export default MultipleRadioGroup;

type TMultOptionProps = {
  buttonIndex: number;
  selBtnIndex: number;
  multSelectedIndex: number;
  onClick: (btnIndex: number, multSelIndex: number) => void;
  children: Array<React.ReactNode>;
  disabled: boolean;
};

const MultOption: React.FC<TMultOptionProps> = ({
  buttonIndex,
  selBtnIndex,
  multSelectedIndex,
  onClick,
  children,
  disabled,
}) => {
  const isSelected = buttonIndex === selBtnIndex;

  let safeMultIndex = multSelectedIndex;

  if (safeMultIndex > children.length - 1)
    safeMultIndex = safeMultIndex % children.length;
  if (safeMultIndex < 0) safeMultIndex = 0;

  return (
    <div
      className={`flex h-fit flex-1 cursor-pointer select-none items-center rounded-full bg-c_base px-2 py-1 text-sm shadow transition duration-300 ${
        disabled
          ? "text-c_scnd2 text-opacity-50"
          : isSelected
          ? " text-c_scnd_int"
          : " text-c_scnd2"
      }`}
      onClick={disabled ? () => {} : () => onClick(buttonIndex, safeMultIndex)}
    >
      {children[safeMultIndex]}
    </div>
  );
};
