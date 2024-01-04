import { cn } from "import/utils/cn";
import { Ref, forwardRef } from "react";
import { RemoveButton } from "../micro/RemoveButton";
import DownloadSVGBtn from "./parts/DownloadSVGBtn";

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
        "absolute left-auto right-auto top-2 flex h-8 w-fit flex-row gap-2 rounded-md border-2 border-c_discrete",
        className,
      )}
    >
      <DownloadSVGBtn
        ref={ref}
        className="hover:-translate-y-0.5 hover:text-c_interact"
      />
      <RemoveButton
        handleClick={() => {}}
        className="hover:-translate-y-0.5 hover:text-c_interact"
      />
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
