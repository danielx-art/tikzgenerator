import myStore from "import/utils/store";
import useStore from "import/utils/useStore";

const TabsNavigation: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { tab, setTab } = store;

  return (
    <div className="grid h-fit w-full grid-cols-3 gap-0.5 text-sm">
      <TabItem
        storeTab={tab}
        thisTab="points"
        action={() => setTab("points")}
        title="Pontos"
      />
      <TabItem
        storeTab={tab}
        thisTab="segments"
        action={() => setTab("segments")}
        title="Segmentos"
      />
      <TabItem
        storeTab={tab}
        thisTab="angles"
        action={() => setTab("angles")}
        title="Ângulos"
      />
    </div>
  );
};

export default TabsNavigation;

type TabItemProps = {
  storeTab: string;
  thisTab: string;
  action: () => void;
  title: string;
};

const TabItem: React.FC<TabItemProps> = ({
  storeTab,
  thisTab,
  action,
  title,
}) => {
  return (
    <div
      className={`${
        storeTab == thisTab
          ? "border-2 border-b-0 border-a_neutral bg-a_light font-bold text-a_dark"
          : "border-2 border-a_neutral bg-a_dark text-a_light"
      } overflow-hidden rounded-t-lg px-2 py-1`}
      onClick={action}
    >
      <div className="overflow-hidden">{title}</div>
    </div>
  );
};