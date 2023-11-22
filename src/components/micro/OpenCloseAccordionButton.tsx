const OpenCloseAccordionButton: React.FC<{ isOpen: boolean }> = ({
  isOpen,
}) => {
  return (
    <button className="flex h-6 w-6 items-center justify-center rounded-full group-hover:text-c_high1 pb-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.6}
        stroke="currentColor"
        className={`h-4 w-4 ${isOpen ? "rotate-180" : ""} transition-all`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>
  );
};

export default OpenCloseAccordionButton;
