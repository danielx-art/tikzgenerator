import myStore from "import/utils/store";
import PointItem from "../parts/PointItem";
import GroupItem from "../parts/GroupItem";
import useStore from "import/utils/useStore";
import ItemsList from "../parts/ItemsList";

export default function PresetsTab() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, groups, selectedGroup } = store;

  return <></>;
}
