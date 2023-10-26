import { useState } from "react";

export const Dropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    let hoverTimeout: NodeJS.Timeout | null = null;
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
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

  const dropdownOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];

  return (
    <div className="relative flex w-fit flex-row" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="w-fit px-4 py-2 rounded-sm bg-a_dark text-a_light hover:bg-a_dark_highlight focus:outline-none focus:ring-2 focus:ring-a_aux focus:ring-offset-2 focus:ring-offset-a_aux"
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          Autoetiquetar pontos
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute left-full ml-2 bg-a_dark focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {dropdownOptions.map((option, index) => (
            <div
              key={index}
              className="w-auto cursor-pointer whitespace-nowrap px-2 py-2 text-sm text-a_light hover:bg-a_neutral"
              role="menuitem"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
