type PropsType = {
  curr: number;
  setCurr: React.Dispatch<React.SetStateAction<number>>;
  total: number;
};

const ItemPaginator: React.FC<PropsType> = ({ curr, setCurr, total }) => {
  return (
    <>
      {total > 1 && (
        <div className="grid h-6 overflow-hidden grid-cols-[1fr_2fr_1fr] place-items-center rounded-full border-2 border-border hover:border-primary hover:text-primary">
          <div className={`${curr > 0 ? "hover:bg-primary hover:text-primary-foreground":"" }  pl-1 pr-[0.12rem] h-full`}>
            {curr > 0 && (
              <button onClick={() => setCurr((prev) => prev - 1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                  className={`h-3 w-3 rotate-90`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="h-full text-sm">
            {curr + 1}/{total}
          </div>
          <div className={`${curr < total - 1 ? "hover:bg-primary hover:text-primary-foreground":"" }  pr-1 pl-[0.12rem] h-full`}>
            {curr < total - 1 && (
              <button onClick={() => setCurr((prev) => prev + 1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                  className={`h-3 w-3 -rotate-90`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ItemPaginator;
