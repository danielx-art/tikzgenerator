import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";

const TabsNavigation: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { tab, setTab } = store;

  return (
    <div className="grid h-fit w-full grid-cols-3 gap-0.5 text-sm">
      {/* <TabItem
        storeTab={tab}
        thisTab="presets"
        action={() => setTab("presets")}
        title="Predefinidos"
      /> */}
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
      {/* <TabItem
        storeTab={tab}
        thisTab="tags"
        action={() => setTab("tags")}
        title="Etiquetas"
      /> */}
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
          ? "border-2 border-b-0 border-border bg-background font-bold text-foreground"
          : "border-2 border-border bg-background text-muted"
      } cursor-pointer overflow-hidden rounded-t-lg px-2 py-1`}
      onClick={action}
    >
      <div className="overflow-hidden">{title}</div>
    </div>
  );
};
