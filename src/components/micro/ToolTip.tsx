import useWindowSize from "import/utils/hooks/useWindowsSize";
import { useRef } from "react";
import ReactDOM from "react-dom";
import { toast } from "sonner";

type PropsType = {
  message: string;
  children?: React.ReactNode;
};

const ToolTip: React.FC<PropsType> = ({ message, children }) => {
  // const toolTipRef = useRef<HTMLSpanElement>(null);
  // const containerRef = useRef<HTMLDivElement>(null);
  // const windowDimensions = useWindowSize();

  if (children) {
    return (
      <div
        //ref={containerRef}
        // onMouseEnter={({ clientX, clientY }) => {
        //   if (!toolTipRef.current || !containerRef.current || !windowDimensions) return;
        //   const containerDimensions = containerRef.current.getBoundingClientRect();
        //   const spanDimensions = toolTipRef.current.getBoundingClientRect();
        //   const positionLeft = clientX - containerDimensions.left;
        //   if(clientX + spanDimensions.width < windowDimensions.width){
        //     toolTipRef.current.style.left = positionLeft + "px";
        //   } else {
        //     toolTipRef.current.style.display = "none";
        //     toast.info(message, {closeButton: false});
        //   }
        // }}
        onMouseEnter={()=>{
          toast.info(message, {closeButton: false});
        }}
        onMouseLeave={()=>{
          toast.dismiss();
        }}
        className="group relative inline-block"
      >
        {children}
        {/* <span
          //ref={toolTipRef}
          className="absolute z-50 top-1/2 select-none cursor-pointer invisible rounded whitespace-nowrap bg-c_scnd p-1 text-sm text-c_base opacity-0 transition-opacity delay-100 group-hover:opacity-80 group-hover:visible"
        >
          {message}
        </span> */}
      </div>
    );
  }

  return (
    <div className="group flex w-auto flex-col items-center">
      <svg
        className="h-5 w-5 transition-all ease-in-out group-hover:opacity-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      <div className="fixed left-[50%] top-2 z-10 mx-auto hidden w-auto -translate-x-[50%] flex-row items-center group-hover:flex">
        <div className="rounded-md bg-c_scnd_int bg-opacity-70 p-4 text-sm leading-none text-white shadow-lg">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
