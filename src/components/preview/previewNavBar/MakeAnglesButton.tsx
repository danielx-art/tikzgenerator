import { cn } from "import/utils/cn";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { makeAngles } from "import/utils/storeHelpers/makeAngles";
import { ButtonHTMLAttributes } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const MakeAnglesButton: React.FC<PropsType> = ({
  className,
  onClick,
  ...rest
}) => {
  const store = useStore(myStore, (state) => state);

  const handleMakeAngles = () => makeAngles(store);

  return (
    <button className={cn("", className)} onClick={handleMakeAngles} {...rest}>
      Make angles!
    </button>
  );
};

export default MakeAnglesButton;
