import useMyStore from "store";

const CodePanel = () => {

  return (
    <div className="w-full justify-self-end p-4 text-a_dark sm:w-1/2 md:w-2/3 h-1/2">
      <div className="w-fit border-b-2 border-b-a_aux">Generated Code</div>
      <div className="h-[calc(100%-2rem)] w-full overflow-y-auto rounded-b-lg border-2 border-t-0 border-a_neutral bg-a_light p-4"></div>
    </div>
  );
};

export default CodePanel;