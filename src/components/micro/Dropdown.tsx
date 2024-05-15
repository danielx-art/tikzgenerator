import { cn } from "import/utils/misc/cn";
import { useState, useEffect } from "react";

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

  let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

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

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <div
      className={cn(
        "flex w-fit flex-col transition-all duration-75",
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
      {!isOpen && <>{children[0]}</>}
      {isOpen && children.map((child, index) => (
        <div key={`dropdown_menu_${keyword}_${index}`}>{child}</div>
      ))}
    </div>
  );
};

export default Dropdown;
