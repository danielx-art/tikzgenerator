import { useState } from "react";
import OpenCloseAccordionButton from "./OpenCloseAccordionButton";

type PropsType = {
  title: string;
  children: React.ReactNode;
};

const AccordionItem: React.FC<PropsType> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b-2 border-c_discrete border-opacity-20">
      <div
        className="group flex w-fit cursor-pointer select-none flex-row text-c_scnd"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <OpenCloseAccordionButton isOpen={isOpen} />
        <div className="flex-1">{title}</div>
      </div>
      <div
        className={`w-full p-1 transition-all ease-in-out ${
          isOpen
            ? "h-auto pb-4 opacity-100"
            : "disabled pointer-events-none h-0 select-none overflow-hidden opacity-0"
        }`}
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
