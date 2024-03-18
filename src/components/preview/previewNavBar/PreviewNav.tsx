import { cn } from "import/utils/cn";
import { type Ref, forwardRef } from "react";
import DownloadSVGBtn from "./DownloadSVGBtn";
import RemoveEntityButton from "./RemoveEntityButton";
import ConnectButton from "./ConnectButton";
import MakeAnglesButton from "./MakeAnglesButton";
import CloseLoopButton from "./CloseLoopButton";
import CloseFigureButton from "./CloseFigureButton";
import CircleMenu from "./CircleMenu";
import DownloadMenu from "./DownloadMenu";

type PreviewNavProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode | React.ReactNode[];
  childrenClassName?: string;
};

const PreviewNav = forwardRef<SVGSVGElement, PreviewNavProps>(function (
  { className, children, childrenClassName },
  ref: Ref<SVGSVGElement>,
) {
  return (
    <div
      className={cn(
        "absolute top-10 bg-c_base mx-auto flex h-10 flex-row gap-2 rounded-md border-2 border-c_discrete px-1",
        className,
      )}
    >
      {/* <DownloadSVGBtn
        ref={ref}
        className="hover:-translate-y-0.5 hover:text-c_interact w-8"
      /> */}
      <DownloadMenu
        ref={ref}
        className="w-8 hover:-translate-y-0.5 hover:text-c_interact"
      />
      <RemoveEntityButton className="w-8 hover:-translate-y-0.5 hover:text-c_interact" />
      <ConnectButton className="w-8 hover:-translate-y-0.5 hover:text-c_interact" />
      <MakeAnglesButton className="w-8 hover:-translate-y-0.5 hover:text-c_interact" />
      <CloseLoopButton className="w-8 hover:-translate-y-0.5 hover:text-c_interact" />
      <CloseFigureButton className="w-8 hover:-translate-y-0.5 hover:text-c_interact" />
      <CircleMenu className="w-8 hover:-translate-y-0.5 hover:text-c_interact" />
      {children &&
        (Array.isArray(children) ? (
          children.map((child, index) => (
            <div
              key={`previewnavbar_${index}`}
              className={cn("h-8 w-8", childrenClassName, {
                "border-r-2 border-c_discrete": index > 0,
              })}
            >
              {child}
            </div>
          ))
        ) : (
          <div className={cn("h-8 w-8", childrenClassName)}>{children}</div>
        ))}
    </div>
  );
});

export default PreviewNav;
