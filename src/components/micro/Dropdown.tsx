import { cn } from "import/utils/misc/cn";
import { useState } from "react";

type PropsType = React.HTMLAttributes<HTMLDivElement> & {
  keyword: string;
  children: React.ReactNode[];
  openClasses?: string;
  closedClasses?: string;
};

const Dropdown: React.FC<PropsType> = ({
  className = "",
  keyword,
  children,
  openClasses = "",
  closedClasses = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  let hoverTimeout: NodeJS.Timeout | null = null;

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  return (
    <div
      className={cn(
        "flex w-fit flex-col",
        isOpen ? openClasses : closedClasses,
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      {isOpen == false ? (
        <>{children[0]}</>
      ) : (
        <>
          {children.map((each, index) => (
            <div key={`dropdown_menu_${keyword}_${index}`}>{each}</div>
          ))}
        </>
      )}
    </div>
  );
};

export default Dropdown;
