import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import PointCustomization from "./PointCustomization";


const ItemCustomization:React.FC = () => {
    const store = useStore(myStore, (state) => state);

    if (!store) return;

    return (<div>
        {store.tab == "points" && <PointCustomization store={store} />}
        {store.tab == "segments" && <PointCustomization store={store} />}
        {store.tab == "angles" && <PointCustomization store={store} />}
        {store.tab == "tags" && <PointCustomization store={store} />}
    </div>)
}

export default ItemCustomization