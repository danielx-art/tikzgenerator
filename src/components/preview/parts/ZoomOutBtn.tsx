import { cn } from "import/utils/cn";
import configStore from "import/utils/store/configStore";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { ButtonHTMLAttributes } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const ZoomOutBtn: React.FC<PropsType> = ({ className, ...rest }) => {
  const store = useStore(myStore, (state) => state);
  const configs = useStore(configStore, (state)=>state);

  if(!configs) return

  const scale = configs.TIKZ_SCALE;

  const handleZoomOut = () => {
    if (!store) return;
    const newValue = scale-0.1;
    configs.setConfig("TIKZ_SCALE", newValue);
  };

  return (
    <button className={cn("", className)} onClick={handleZoomOut} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="mx-auto my-auto h-6 w-6 hover:-translate-y-0.5 hover:text-c_interact"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
        />
      </svg>
    </button>
  );
};

export default ZoomOutBtn;
