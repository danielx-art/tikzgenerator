import myStore from "import/utils/store";
import PointsTab from "./Tabs/PointsTab";
import SegmentsTab from "./Tabs/SegmentsTab";
import AnglesTab from "./Tabs/AnglesTab";
import useStore from "import/utils/useStore";
import TabsNavigation from "./parts/TabsNavigation";
import TagsTab from "./Tabs/TagsTab";

const EntitiesPanel = () => {
  const store = useStore(myStore, (state) => state);

  return (
    store && (
      <>
        <TabsNavigation />
        <div className="flex w-full flex-1 flex-col rounded-b-lg border-2 border-t-0 border-c_discrete bg-c_base p-2">
          {store.tab == "points" && <PointsTab />}
          {store.tab == "segments" && <SegmentsTab />}
          {store.tab == "angles" && <AnglesTab />}
          {store.tab == "tags" && <TagsTab />}
        </div>
      </>
    )
  );
};

export default EntitiesPanel;
