import { useState } from "react";

type PropsType = {
  title: string;
  children: React.ReactNode;
};

const AccordionItem: React.FC<PropsType> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b-2 border-c_discrete border-opacity-20">
      <div className="flex w-full flex-row text-c_scnd group select-none cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}>
        <div className="flex-1">{title}</div>
        <button className="w-6 h-6 flex justify-center items-center group-hover:text-c_high1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
            className={`h-4 w-4 ${isOpen ? "rotate-180": ""} transition-all`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div
        className={`w-full transition-all p-2 ease-in-out ${isOpen ? "h-auto pb-4 opacity-100"
        : "disabled pointer-events-none h-0 overflow-hidden select-none opacity-0"}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionItem;
