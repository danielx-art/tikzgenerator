import { useEffect, useState } from "react";

type PropsType = {
  initOption?: number;
  onChange?: (newOption: number) => void;
  children: Array<React.ReactElement>;
  disabled?: boolean;
};

const CyclicBtn: React.FC<PropsType> = ({
  initOption = 0,
  onChange,
  children,
  disabled = false,
}) => {
  const [optionSelected, setOptionSelected] = useState(initOption);

  useEffect(() => {
    setOptionSelected(initOption);
  }, [initOption]);

  const handleClick = () => {
    const newOption = Math.floor((optionSelected + 1) % children.length);
    onChange && onChange(newOption);
    setOptionSelected(newOption);
  };

  return (
    <>
      {
        <div
          className={`flex h-fit flex-1 cursor-pointer select-none flex-row items-center justify-center rounded-full bg-c_base px-2 py-1 text-sm shadow transition duration-300 ${
            disabled ? "text-c_scnd2 text-opacity-50" : " text-c_scnd2"
          } hover:text-c_scnd_int`}
          onClick={disabled ? () => {} : handleClick}
        >
          {children[optionSelected]}
        </div>
      }
    </>
  );
};

export default CyclicBtn;
