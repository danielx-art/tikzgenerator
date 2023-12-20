import { useEffect, useState } from "react";

type PropsType = {
  children: Array<React.ReactElement<{ children: Array<React.ReactElement> }>>;
  onChange?: (selectedIndex: number, optionSelected: number) => void;
  initBtnSelected: number;
  labelText?: string;
  disabled: boolean;
};

const MultipleRadioGroup: React.FC<PropsType> = ({
  children,
  onChange,
  initBtnSelected,
  labelText,
  disabled,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(initBtnSelected);

  useEffect(() => {
    setSelectedIndex(initBtnSelected);
  }, [initBtnSelected]);

  function onSelect(btnIndex: number) {
    setSelectedIndex(btnIndex);
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
            onSelect={() => onSelect(index)}
            onChange={onChange}
            disabled={disabled}
          >
            {btn.props.children}
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
  initMultSelected?: number;
  onSelect: (btnIndex: number) => void;
  onChange?: (selectedIndex: number, optionSelected: number) => void;
  children: Array<React.ReactElement>;
  disabled: boolean;
};

const MultOption: React.FC<TMultOptionProps> = ({
  buttonIndex,
  selBtnIndex,
  initMultSelected,
  onSelect,
  onChange,
  children,
  disabled,
}) => {
  const [isSelected, setIsSelected] = useState(buttonIndex === selBtnIndex);

  const [optionSelIndex, setOptionSelIndex] = useState(initMultSelected || 0);

  useEffect(() => {
    setIsSelected(buttonIndex === selBtnIndex);
  }, [selBtnIndex]);

  useEffect(() => {
    console.log(onChange);
    onChange && onChange(buttonIndex, optionSelIndex);
  }, [selBtnIndex, optionSelIndex]);

  return (
    <div
      className={`flex h-fit flex-1 cursor-pointer select-none items-center rounded-full bg-c_base px-2 py-1 text-sm shadow transition duration-300 ${
        disabled
          ? "text-c_scnd2 text-opacity-50"
          : isSelected
          ? " text-c_scnd_int"
          : " text-c_scnd2"
      }`}
      onClick={
        disabled
          ? () => {}
          : isSelected
          ? () =>
              setOptionSelIndex(
                (multIndex) => (multIndex + 1) % children.length,
              )
          : () => onSelect(buttonIndex)
      }
    >
      {children[optionSelIndex]}
    </div>
  );
};
