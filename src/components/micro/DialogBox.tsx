import { cn } from "import/utils/misc/cn";
import { createPortal } from "react-dom";

type PropsType = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  actionMessage?: string;
  cancelMessage?: string;
  onAction?: () => void;
  onCancel?: () => void;
  closeButton?: boolean | false;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode | React.ReactNode[];
};

const DialogBox: React.FC<PropsType> = ({
  className,
  title,
  actionMessage,
  cancelMessage,
  onAction,
  onCancel,
  closeButton,
  isOpen,
  setIsOpen,
  children,
}) => {
  const handleAction = () => {
    setIsOpen(false);
    onAction && onAction();
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel && onCancel();
  };

  return (
    <>
      {isOpen &&
        document.getElementById("myapp") !== null &&
        createPortal(
          <>
            <div className="absolute left-0 top-0 z-50 h-full w-full animate-comein">
              <div
                className={cn(
                  "relative left-1/2 top-1/2 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 flex-col flex-nowrap gap-4 overflow-hidden rounded-md border-border bg-background pb-4 pl-6 pr-4 pt-6 font-jost shadow-md",
                  className,
                )}
              >
                {closeButton && (
                  <div
                    onClick={() => setIsOpen(false)}
                    className="absolute right-1 top-1 cursor-pointer rounded-full text-foreground2 transition-colors duration-75 hover:text-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                  </div>
                )}
                <div className="flex w-full flex-1 flex-col overflow-auto">
                  {title ? (
                    <div className="w-full text-lg font-bold text-foreground">
                      {title}
                    </div>
                  ) : (
                    <div />
                  )}
                  {children}
                  <div className="flex w-full flex-row justify-end gap-2 self-end">
                    {actionMessage && (
                      <button
                        onClick={handleAction}
                        className="h-fit w-fit rounded-md bg-background px-2 py-1 text-foreground ring-1 ring-primary transition-all duration-75 hover:bg-primary hover:text-white"
                      >
                        {actionMessage}
                      </button>
                    )}
                    {cancelMessage && (
                      <button
                        onClick={handleCancel}
                        className="h-fit w-fit rounded-md bg-background px-2 py-1 text-foreground ring-1 ring-muted transition-all duration-75 hover:bg-primary hover:text-white"
                      >
                        {cancelMessage}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-30" />
          </>,
          document.getElementById("myapp")!,
        )}
    </>
  );
};

export default DialogBox;
