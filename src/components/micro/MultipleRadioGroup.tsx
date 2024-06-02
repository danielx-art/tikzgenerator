import { useCallback, useEffect, useState } from "react";

type PropsType = {
  children: Array<React.ReactElement<{ children: Array<React.ReactElement> }>>;
  onChange: (selectedIndex: number, optionSelected: number) => void;
  initBtnSelected: number;
  initOptionSelected: number;
  labelText?: string;
  disabled: boolean;
};

const MultipleRadioGroup: React.FC<PropsType> = ({
  children,
  onChange,
  initBtnSelected,
  initOptionSelected,
  labelText,
  disabled,
}) => {
  const [btnSelected, setBtnSelected] = useState<number>(initBtnSelected);

  useEffect(() => {
    if (initBtnSelected !== btnSelected) setBtnSelected(initBtnSelected);
  }, [initBtnSelected]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {labelText && <div className="self-start text-foreground">{labelText}</div>}
      {
        <div className="flex flex-row items-center gap-2">
          {children.map((btn, index) => (
            <MultOption
              key={`btn_${index}_opt_${initOptionSelected}`}
              buttonIndex={index}
              selBtnIndex={btnSelected}
              initOption={initOptionSelected}
              setSelectBtn={setBtnSelected}
              onChange={onChange}
              disabled={disabled}
            >
              {btn.props.children}
            </MultOption>
          ))}
        </div>
      }
    </div>
  );
};

export default MultipleRadioGroup;

type TMultOptionProps = {
  buttonIndex: number;
  selBtnIndex: number;
  initOption: number;
  setSelectBtn: React.Dispatch<React.SetStateAction<number>>;
  onChange: (newBtnIndex: number, newOptIndex: number) => void;
  children: Array<React.ReactElement>;
  disabled: boolean;
};

const MultOption: React.FC<TMultOptionProps> = ({
  buttonIndex,
  selBtnIndex,
  initOption,
  setSelectBtn,
  onChange,
  children,
  disabled,
}) => {
  const [option, setOption] = useState(0);

  useEffect(() => {
    if (selBtnIndex === buttonIndex && option !== initOption)
      setOption(initOption);
  }, [initOption, selBtnIndex, buttonIndex]);

  const handleClick = useCallback(() => {
    if (disabled) return;
    if (selBtnIndex !== buttonIndex) {
      onChange(buttonIndex, option);
      setSelectBtn(buttonIndex);
    } else {
      const newOptionIndex = (option + 1) % children.length;
      onChange(buttonIndex, newOptionIndex);
      setOption(newOptionIndex);
    }
  }, [option, selBtnIndex, buttonIndex]);

  return (
    <div
      className={`flex h-fit flex-1 cursor-pointer select-none items-center rounded-full bg-background px-2 py-1 text-sm shadow transition duration-300 ${
        disabled
          ? "text-foreground2 text-opacity-50"
          : buttonIndex === selBtnIndex
          ? " text-foreground_int ring-1 ring-foreground_int"
          : " text-foreground2 "
      }`}
      onClick={() => handleClick()}
    >
      {children[option]}
    </div>
  );
};
