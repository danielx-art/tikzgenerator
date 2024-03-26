import Settings from "./Settings";
import What from "./What";

const HeroBar = () => {
  return (
    <div className="flex h-fit max-h-fit w-full flex-row items-start gap-2 overflow-hidden rounded-sm px-2 text-c_scnd">
      <div className=" flex-1 cursor-default text-lg font-bold text-c_faded transition-all hover:text-c_scnd_int">
        GeoSimples
      </div>
      {/* <Settings /> */}
      <What />
    </div>
  );
};

export default HeroBar;
