type PropsType = {
  message: string;
};

const ToolTip: React.FC<PropsType> = ({ message }) => {
  return (
    <div className="group flex w-auto flex-col items-center">
      <svg
        className="h-5 w-5 transition-all ease-in-out group-hover:opacity-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      <div className="fixed left-[50%] top-2 z-10 mx-auto hidden w-auto -translate-x-[50%] flex-row items-center group-hover:flex">
        <div className="rounded-md bg-c_scnd_int bg-opacity-70 p-4 text-sm leading-none text-white shadow-lg">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
