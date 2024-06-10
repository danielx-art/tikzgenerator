import useIsTouchDevice from "import/utils/hooks/useIsTouchDevice";
import useWindowSize from "import/utils/hooks/useWindowsSize";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "sonner";

type PropsType = {
  message: string;
  children?: React.ReactNode;
};

const ToolTip: React.FC<PropsType> = ({ message, children }) => {
  const toolTipRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const windowDimensions = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);
  const [posX, setPosX] = useState(0);
  // const showTimeout = useRef<NodeJS.Timeout | null>(null);
  // const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const isTouchDevice = useIsTouchDevice();

  // useEffect(() => { 
  //   return () => {
  //     if (showTimeout.current) clearTimeout(showTimeout.current);
  //     if (hideTimeout.current) clearTimeout(hideTimeout.current);
  //   };
  // }, []);

  useEffect(() => {
    // hideTimeout.current ? clearTimeout(hideTimeout.current) : null;
    // hideTimeout.current = setTimeout(() => {
    //   setIsVisible(false);
    // }, 2000);

    if (!isVisible) return;

    const setPositionOrToast = () => {
      if (
        !containerRef.current ||
        !toolTipRef.current ||
        !windowDimensions ||
        isTouchDevice
      ) {
        return;
      }
      const containerDimensions = containerRef.current.getBoundingClientRect();
      const toolTipDimensions = toolTipRef.current.getBoundingClientRect();
      if (posX + toolTipDimensions.width < windowDimensions.width) {
        toolTipRef.current.style.left = posX + "px";
        if (containerDimensions.bottom - 30 < windowDimensions.height) {
          toolTipRef.current.style.top = containerDimensions.bottom - 10 + "px";
        } else {
          toolTipRef.current.style.top = containerDimensions.top + 10 + "px";
        }
      } else {
        if (
          toolTipDimensions.width < windowDimensions.width &&
          posX - toolTipDimensions.width > 0
        ) {
          toolTipRef.current.style.left = posX - toolTipDimensions.width + "px";
          if (containerDimensions.bottom - 30 < windowDimensions.height) {
            toolTipRef.current.style.top =
              containerDimensions.bottom - 10 + "px";
          } else {
            toolTipRef.current.style.top = containerDimensions.top + 10 + "px";
          }
        } else {
          toast.info(message, {
            closeButton: false,
            position: "bottom-center",
            duration: 3000
          });
        }
      }
    };

    setPositionOrToast();

    // return () => {
    //   if (showTimeout.current) clearTimeout(showTimeout.current);
    //   if (hideTimeout.current) clearTimeout(hideTimeout.current);
    // };
  }, [isVisible]);

  const mouseEnter = (clientX: number) => {
    // showTimeout.current = setTimeout(() => {
    //   setPosX(clientX);
    //   setIsVisible(true);
    // }, 1000);
    setPosX(clientX);
    setIsVisible(true);
  };

  const mouseLeave = () => {
    if (!toolTipRef.current) return;
    // if(showTimeout.current) {
    //   clearTimeout(showTimeout.current);
    // }
    setIsVisible(false);
  };

  const tooltipContent =
    isVisible && !isTouchDevice ? (
      <span
        ref={toolTipRef}
        className="pointer-events-none absolute animate-delayedquickcomein select-none whitespace-nowrap rounded bg-foreground p-1 font-jost text-sm text-background"
      >
        {message}
      </span>
    ) : null;

  if (children && document.getElementById("myapp") != null) {
    return (
      <div
        ref={containerRef}
        onMouseEnter={({ clientX }) => mouseEnter(clientX)}
        onMouseLeave={() => mouseLeave()}
        className="inline-block"
      >
        {children}
        {ReactDOM.createPortal(
          tooltipContent,
          document.getElementById("myapp")!,
        )}
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
        <div className="rounded-md bg-foreground bg-opacity-70 p-4 text-sm leading-none text-white shadow-lg">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
