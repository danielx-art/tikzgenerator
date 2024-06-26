import { useEffect, useState } from "react";
import { Button } from "./ui/button";

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
        <Button
          onClick={disabled ? () => {} : handleClick}
        >
          {children[optionSelected]}
        </Button>
      }
    </>
  );
};

export default CyclicBtn;
