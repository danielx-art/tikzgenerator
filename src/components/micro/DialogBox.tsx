import { cn } from "import/utils/cn";
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
                  "relative left-1/2 top-1/2 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 flex-col flex-nowrap gap-2 rounded-md border-c_discrete bg-c_base p-2 font-jost shadow-md",
                  className,
                )}
              >
                {closeButton && (
                  <div
                    onClick={() => setIsOpen(false)}
                    className="absolute right-1 top-1 cursor-pointer rounded-full text-c_scnd2 transition-colors duration-75 hover:text-c_high1"
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
                {title && (
                  <div className="w-full text-lg font-bold text-c_scnd">
                    {title}
                  </div>
                )}
                {children}
                <div className="flex w-full flex-row justify-end gap-2 self-end">
                  {actionMessage && (
                    <button
                      onClick={handleAction}
                      className="h-fit w-fit rounded-md bg-c_base px-2 py-1 text-c_scnd ring-1 ring-c_interact transition-all duration-75 hover:bg-c_interact hover:text-white"
                    >
                      {actionMessage}
                    </button>
                  )}
                  {cancelMessage && (
                    <button
                      onClick={handleCancel}
                      className="h-fit w-fit rounded-md bg-c_base px-2 py-1 text-c_scnd ring-1 ring-c_disabled2 transition-all duration-75 hover:bg-c_interact hover:text-white"
                    >
                      {cancelMessage}
                    </button>
                  )}
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
