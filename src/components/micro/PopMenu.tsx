import { useState } from "react";
import Switcher from "./Switcher";

type PropsType = {
  title: string;
  withToggle: boolean;
  toggleMessages?: [string, string];
  Options: {
    title: string;
    action?: () => void;
  }[];
};

const PopMenu: React.FC<PropsType> = ({
  title,
  withToggle,
  toggleMessages,
  Options,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isChecked, setIsChecked] = useState(true);

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

  return (
    <div
      className="relative flex w-fit flex-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className={`w-fit rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-a_aux focus:ring-offset-2 focus:ring-offset-a_aux ${
            isOpen
              ? "bg-a_dark_highlight text-a_highlight"
              : "bg-a_light  text-a_dark"
          }`}
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {title}
        </button>
      </div>

      <div
        className={`absolute bottom-0 left-full z-10 ml-1 rounded-sm border-2 border-a_dark_highlight shadow-md transition-all ease-in-out focus:outline-none ${
          isOpen
            ? "scale-y-100 cursor-pointer opacity-100"
            : "disabled pointer-events-none -translate-y-[50%] scale-y-0 select-none opacity-0 sm:-translate-x-[50%]"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {withToggle && (
          <>
            <Switcher
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              messageOne="Todos"
              messageTwo="Somente selecionados"
            />
            <div className="flex h-2 w-full flex-row flex-nowrap items-center justify-center bg-a_dark">
              <div className="h-0.5 w-[90%] rounded-lg bg-a_light opacity-10"></div>
            </div>
          </>
        )}
        {Options.map((option, index) => (
          <div
            key={index}
            className="flex w-auto select-none flex-row justify-between gap-2 whitespace-nowrap bg-a_dark py-2 pl-4 pr-2 text-sm text-a_light hover:bg-a_dark_highlight hover:text-a_highlight"
            role="menuitem"
            onClick={option.action}
          >
            <div>{option.title}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopMenu;