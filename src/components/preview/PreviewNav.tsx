import { cn } from "import/utils/cn";
import { Ref, forwardRef } from "react";
import { RemoveButton } from "../micro/RemoveButton";
import DownloadSVGBtn from "./parts/DownloadSVGBtn";
import useStore from "import/utils/store/useStore";
import myStore from "import/utils/store/store";
import { getKindById } from "import/utils/storeHelpers/miscEntity";
import type { TentId, TtagId } from "public/entidades";

type PreviewNavProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode | React.ReactNode[];
  childrenClassName?: string;
};

const PreviewNav = forwardRef<SVGSVGElement, PreviewNavProps>(function (
  { className, children, childrenClassName },
  ref: Ref<SVGSVGElement>,
) {
  const store = useStore(myStore, (state) => state);

  const handleRemove = () => {
    if (!store) return;
    const selections = store.selections;
    selections.forEach((sel) => {
      let kind = getKindById(sel);
      if (kind == "tag") {
        store.deleteTag(sel as TtagId);
      } else {
        store.deleteEntity(sel as TentId);
      }
    });
  };

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
        handleClick={handleRemove}
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
