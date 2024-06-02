import { cn } from "import/utils/misc/cn";
import { type Ref, forwardRef } from "react";
import RemoveEntityButton from "./RemoveEntityButton";
import MakeAnglesButton from "./MakeAnglesButton";
import CloseFigureButton from "./CloseFigureButton";
import CircleMenu from "./CircleMenu";
import DownloadMenu from "./DownloadMenu";
import ConnectMenu from "./ConnectMenu";

type PreviewToolBarProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode | React.ReactNode[];
  childrenClassName?: string;
};

const PreviewToolBar = forwardRef<SVGSVGElement, PreviewToolBarProps>(function (
  { className, children, childrenClassName },
  ref: Ref<SVGSVGElement>,
) {
  const commonClasses =
    "w-8 hover:-translate-y-0.5 hover:text-primary transition-all duration-75";

  return (
    <div
      className={cn(
        "absolute top-10 mx-auto flex h-10 flex-row gap-2 rounded-md border-2 border-border bg-background px-1",
        className,
      )}
    >
      {/* <DownloadSVGBtn
        ref={ref}
        className="hover:-translate-y-0.5 hover:text-primary w-8"
      /> */}
      <DownloadMenu ref={ref} className={commonClasses} />
      <RemoveEntityButton className={commonClasses} />
      <ConnectMenu className={commonClasses} />
      <MakeAnglesButton className={commonClasses} />
      <CloseFigureButton className={commonClasses} />
      <CircleMenu className={commonClasses} />
      {children &&
        (Array.isArray(children) ? (
          children.map((child, index) => (
            <div
              key={`previewnavbar_${index}`}
              className={cn("h-8 w-8", childrenClassName, {
                "border-r-2 border-border": index > 0,
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

export default PreviewToolBar;
