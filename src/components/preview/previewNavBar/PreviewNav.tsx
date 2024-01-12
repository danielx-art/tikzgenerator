import { cn } from "import/utils/cn";
import { type Ref, forwardRef } from "react";
import DownloadSVGBtn from "./DownloadSVGBtn";
import RemoveEntityButton from "./RemoveEntityButton";
import ConnectButton from "./ConnectButton";
import MakeAnglesButton from "./MakeAnglesButton";
import CloseFigureButton from "./CloseFigureButton";

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
        "flex flex-row mx-auto h-8 gap-2 rounded-md border-2 border-c_discrete",
        className,
      )}
    >
      <DownloadSVGBtn
        ref={ref}
        className="hover:-translate-y-0.5 hover:text-c_interact w-8"
      />
      <RemoveEntityButton className="hover:-translate-y-0.5 hover:text-c_interact w-8" />
      <ConnectButton className="hover:-translate-y-0.5 hover:text-c_interact w-8" />
      <MakeAnglesButton className="hover:-translate-y-0.5 hover:text-c_interact w-8" />
      <CloseFigureButton className="hover:-translate-y-0.5 hover:text-c_interact w-8" />
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
