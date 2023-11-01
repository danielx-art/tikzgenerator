import myStore from "import/utils/store";
import PointsTab from "./Tabs/PointsTab";
import SegmentsTab from "./Tabs/SegmentsTab";
import AnglesTab from "./Tabs/AnglesTab";
import useStore from "import/utils/useStore";
import TabsNavigation from "./parts/TabsNavigation";

const EntitiesPanel = () => {
  const store = useStore(myStore, (state) => state);

  return (
    store && (
      <div className="flex h-full w-full flex-1 flex-col self-start sm:w-1/2 md:h-1/2 md:w-1/3">
        <TabsNavigation />
        <div className="w-full flex-1 flex-col rounded-b-lg border-2 border-t-0 border-a_neutral bg-a_light p-2">
          {store.tab == "points" && <PointsTab />}
          {store.tab == "segments" && <SegmentsTab />}
          {store.tab == "angles" && <AnglesTab />}
        </div>
      </div>
    )
  );
};

export default EntitiesPanel;
