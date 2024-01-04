import { cn } from "import/utils/cn";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { connectPoints } from "import/utils/storeHelpers/connectPoints";
import { ButtonHTMLAttributes } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const ConnectButton: React.FC<PropsType> = ({
  className,
  onClick,
  ...rest
}) => {
  const store = useStore(myStore, (state) => state);

  const handleConnect = () => connectPoints(store);

  return (
    <button className={cn("", className)} onClick={handleConnect} {...rest}>
      Connect!
    </button>
  );
};

export default ConnectButton;
