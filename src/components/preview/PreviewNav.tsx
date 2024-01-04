import { cn } from "import/utils/cn";

type PreviewNavProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
  childrenClassName?: string
};

const PreviewNav: React.FC<PreviewNavProps> = ({ className, children, childrenClassName }) => {
  return (
    <div className={cn("absolute right-auto left-auto top-2 border-2 border-c_discrete rounded-md flex flex-row gap-2", className)}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div key={`previewnavbar_${index}`} className={cn("w-8 h-8", childrenClassName)}>{child}</div>
        ))
      ) : (
        <div className={cn("w-8 h-8", childrenClassName)}>{children}</div>
      )}
    </div>
  );
};

export default PreviewNav;
