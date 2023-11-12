import { useState } from "react";
import Switcher from "./Switcher";

type PropsType = {
  title: string;
  withToggle: boolean;
  toggleMessages?: [string, string];
  Options: {
    title: string;
    action?: [() => void] | [() => void, () => void];
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

  const processedOptions = Options.map((option) => {
    let resultOptions = [];

    if (option.action == undefined) {
      resultOptions.push(
        () => {},
        () => {},
      );
    } else if (option.action.length == 1) {
      resultOptions.push(option.action[0], () => {});
    } else {
      resultOptions.push(option.action[0], option.action[1]);
    }

    return resultOptions as [() => void, () => void];
  });

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
          className={`w-fit rounded-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-c_high1 focus:ring-offset-2 focus:ring-offset-c_high1 ${
            isOpen
              ? "bg-c_high1 text-c_base"
              : "bg-c_interact  text-c_base"
          }`}
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {title}
        </button>
      </div>

      <div
        className={`bg-c_base absolute bottom-0 left-full z-10 ml-1 rounded-md shadow-sm shadow-c_high1 transition-all ease-in-out focus:outline-none ${
          isOpen
            ? "scale-y-100 cursor-pointer opacity-100"
            : "disabled pointer-events-none -translate-y-[50%] scale-y-0 select-none opacity-0 sm:-translate-x-[50%]"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {withToggle && (
            <div className="">
              <Switcher
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                messageOne="Todos"
                messageTwo="Somente selecionados"
              />
            </div>
        )}
        {Options.map((option, index) => (
          <div
            key={index}
            className="flex w-auto select-none flex-row justify-between gap-2 whitespace-nowrap py-2 pl-4 pr-2 text-sm text-c_scnd hover:bg-c_interact hover:text-c_base"
            role="menuitem"
            onClick={
              isChecked
                ? processedOptions![index]![0]
                : processedOptions![index]![1]
            }
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
