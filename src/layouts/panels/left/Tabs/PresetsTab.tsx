import myStore from "import/utils/store/store";
import PointItem from "../../../../components/entities/PointItem";
import GroupItem from "../../../../components/entities/GroupItem";
import useStore from "import/utils/store/useStore";
import ItemsList from "../../../../components/entities/ItemsList";

export default function PresetsTab() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, groups, selectedGroup } = store;

  return <></>;
}
