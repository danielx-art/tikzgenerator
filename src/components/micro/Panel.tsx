import { cn } from "import/utils/misc/cn";

type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
};

const Panel: React.FC<PanelProps> = ({ className = "", children }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col items-start justify-start gap-2 rounded-md border-2 border-border p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
