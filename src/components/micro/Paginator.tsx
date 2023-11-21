type PropsType = {
  curr: number;
  setCurr: React.Dispatch<React.SetStateAction<number>>;
  total: number;
};

const Paginator: React.FC<PropsType> = ({ curr, setCurr, total }) => {
  return (
    <>
      {total > 1 && (
        <div className="grid h-6 w-fit grid-cols-[1fr_2fr_1fr] place-items-center rounded-full border-2 border-c_discrete px-2">
          <div className="grid h-3 w-3 hover:text-c_high1">
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
          <div className="grid h-3 w-3 hover:text-c_high1">
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

export default Paginator;
