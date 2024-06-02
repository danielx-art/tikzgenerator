import { RemoveButton } from "import/components/micro/RemoveButton";

type PropsType = {
  highlight: boolean;
  handleClickFn?: () => void;
  removeFn: () => void;
  children?: React.ReactNode;
};

const Item: React.FC<PropsType> = ({
  highlight,
  handleClickFn,
  children,
  removeFn,
}) => {
  return (
    <div
      className={`${
        highlight ? "bg-foreground_int bg-opacity-10" : null
      } flex w-full flex-row flex-nowrap justify-stretch text-sm text-foreground_int`}
    >
      <div className="flex flex-1 select-none flex-row flex-nowrap py-1 pl-4 pr-2">
        <div
          className={`grid flex-1 grid-cols-[7fr_5fr_1fr] ${
            handleClickFn ? "cursor-pointer" : ""
          }`}
          onClick={handleClickFn}
        >
          {children}
        </div>
        <div className="">
          <RemoveButton onClick={removeFn} className="text-muted" />
        </div>
      </div>
    </div>
  );
};

export default Item;
