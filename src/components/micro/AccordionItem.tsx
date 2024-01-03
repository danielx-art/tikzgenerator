import { useState } from "react";
import OpenCloseAccordionButton from "./OpenCloseAccordionButton";
import { cn } from "import/utils/cn";

type PropsType = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  children: React.ReactNode;
  conditionalClassNames?: string
};

const AccordionItem: React.FC<PropsType> = ({ title, className, conditionalClassNames, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  let conditionalClasses: {[key: string]: boolean} = {"": true};

  if(conditionalClassNames && conditionalClassNames.length > 0) {
    let separatedConditions = conditionalClassNames.split(" ");
    separatedConditions.forEach(cond=>conditionalClasses[cond] = isOpen)
  }

  return (
    <div className={cn("w-full border-b-2 border-c_discrete border-opacity-20", className, conditionalClassNames ? conditionalClasses : null)}>
      <div
        className="group flex w-fit cursor-pointer select-none flex-row text-c_scnd text-opacity-90 hover:text-opacity-100 mb-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <OpenCloseAccordionButton isOpen={isOpen} />
        <div className="flex-1 pl-1">{title}</div>
      </div>
      <div
        className={`w-full p-1 transition-all ease-in-out flex flex-col gap-2 ${
          isOpen
            ? "h-auto pb-4 opacity-100"
            : "disabled pointer-events-none h-0 select-none overflow-hidden opacity-0"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {Array.isArray(children) ? children.map((child, index)=><div key={`tools_child_${index}`} className="pl-2">{child}</div>) : <div key={`tools_child_0`} className="pl-6">{children}</div> }
      </div>
    </div>
  );
};

export default AccordionItem;
