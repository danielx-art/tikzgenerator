import { useEffect, useState } from "react";

type PropsType = {
  children: Array<React.ReactElement<{ children: Array<React.ReactElement> }>>;
  onChange?: (selectedIndex: number, optionSelected: number) => void;
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
  const [btnSelected, setBtnSelected] = useState(initBtnSelected);
  const [optionSelected, setOptionsSelected] = useState(initOptionSelected);

  useEffect(() => {
    if (initBtnSelected != btnSelected) setBtnSelected(initBtnSelected);
    if (initOptionSelected != optionSelected)
      setOptionsSelected(initOptionSelected);
  }, [initBtnSelected, initOptionSelected]);

  const handleSelect = (newbtn: number, newopt: number) => {
    onChange && onChange(newbtn, newopt);
    if (btnSelected === newbtn) {
      setOptionsSelected(newopt);
    } else {
      setBtnSelected(newbtn);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {labelText && <div className="self-start text-c_scnd">{labelText}</div>}
      <div className="flex flex-row items-center gap-2">
        {children.map((btn, index) => (
          <MultOption
            key={index}
            buttonIndex={index}
            selBtnIndex={btnSelected}
            optionSelected={optionSelected}
            onSelect={handleSelect}
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
  optionSelected: number;
  onSelect: (newBtnIndex: number, newOptIndex: number) => void;
  children: Array<React.ReactElement>;
  disabled: boolean;
};

const MultOption: React.FC<TMultOptionProps> = ({
  buttonIndex,
  selBtnIndex,
  optionSelected,
  onSelect,
  children,
  disabled,
}) => {
  return (
    <>
      {
        <div
          className={`flex h-fit flex-1 cursor-pointer select-none items-center rounded-full bg-c_base px-2 py-1 text-sm shadow transition duration-300 ${
            disabled
              ? "text-c_scnd2 text-opacity-50"
              : buttonIndex === selBtnIndex
              ? " text-c_scnd_int"
              : " text-c_scnd2"
          }`}
          onClick={
            disabled
              ? () => {}
              : () =>
                  onSelect(
                    buttonIndex,
                    buttonIndex === selBtnIndex
                      ? (optionSelected + 1) % children.length
                      : optionSelected,
                  )
          }
        >
          {children[optionSelected]}
        </div>
      }
    </>
  );
};
