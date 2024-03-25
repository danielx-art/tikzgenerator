import Settings from "./Settings";

const HeroBar = () => {
  return (
    <div className="flex h-fit max-h-fit w-full flex-row items-start overflow-hidden rounded-sm px-2 text-c_scnd gap-2">
      <div className=" text-lg font-bold text-c_faded hover:text-c_scnd_int flex-1 cursor-default transition-all">GeoSimples</div>
      <Settings />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 transition-all duration-75 hover:-translate-y-0.5 hover:text-c_interact"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default HeroBar;
