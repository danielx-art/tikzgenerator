import Settings from "./Settings";
import What from "./What";

const HeroBar = () => {
  return (
    <div className="flex h-fit max-h-fit w-full flex-row items-start gap-2 overflow-hidden rounded-sm px-2 text-foreground">
      <div className=" flex-1 cursor-default text-lg font-bold text-muted-foreground transition-all hover:text-accent-foreground">
        GeoSimples
      </div>
      <Settings />
      <What />
    </div>
  );
};

export default HeroBar;
