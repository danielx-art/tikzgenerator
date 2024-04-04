import { cn } from "import/utils/misc/cn";
import ZoomInBtn from "../parts/ZoomInBtn";
import ZoomOutBtn from "../parts/ZoomOutBtn";

type PreviewSideBarProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode | React.ReactNode[];
  childrenClassName?: string;
};

const PreviewSideBar: React.FC<PreviewSideBarProps> = ({
  children,
  childrenClassName,
}) => {
  return (
    <div
      className={cn(
        "absolute right-1 top-[50%] flex w-10 -translate-y-[50%] flex-col gap-2 rounded-md border-2 border-c_discrete bg-c_base px-1 py-1",
      )}
    >
      <ZoomOutBtn />
      <ZoomInBtn />
      {children &&
        (Array.isArray(children) ? (
          children.map((child, index) => (
            <div
              key={`previewsidebar_${index}`}
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
};

export default PreviewSideBar;
