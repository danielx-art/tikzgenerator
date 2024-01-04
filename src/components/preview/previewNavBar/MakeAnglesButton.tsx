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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-full w-full p-1"
      >
        <circle
          cx={"80%"}
          cy={"20%"}
          r={"5%"}
          stroke="currentColor"
          strokeWidth={"1.5"}
          fill={"currentColor"}
        />
        <line
          x1="80%"
          y1="20%"
          x2="20%"
          y2="50%"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx={"20%"}
          cy={"50%"}
          r={"5%"}
          stroke="currentColor"
          strokeWidth={"1.5"}
          fill={"currentColor"}
        />
        <line
          x1="20%"
          y1="50%"
          x2="80%"
          y2="80%"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx={"80%"}
          cy={"80%"}
          r={"5%"}
          stroke="currentColor"
          strokeWidth={"1.5"}
          fill={"currentColor"}
        />
        <path
          stroke="currentColor"
          strokeWidth={"1.5"}
          fill={"currentColor"}
          fillOpacity={"20%"}
          d={`M 4.8 12 13.44 16.32 A 8.64 8.64 0 0 0 13.44 7.68 Z`}
          //d={`M 4.8 12 16.32 17.76 A 11.52 11.52 0 0 0 16.32 6.24`}
        />
      </svg>
    </button>
  );
};

export default MakeAnglesButton;
