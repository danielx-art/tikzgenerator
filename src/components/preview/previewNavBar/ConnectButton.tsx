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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-full w-full p-1"
      >
        <circle
          cx={"20%"}
          cy={"80%"}
          r={"10%"}
          stroke="currentColor"
          strokeWidth={"1.5"}
          fill={"currentColor"}
        />
        <line
          x1="20%"
          y1="80%"
          x2="80%"
          y2="20%"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx={"80%"}
          cy={"20%"}
          r={"10%"}
          stroke="currentColor"
          strokeWidth={"1.5"}
          fill={"currentColor"}
        />
      </svg>
    </button>
  );
};

export default ConnectButton;
