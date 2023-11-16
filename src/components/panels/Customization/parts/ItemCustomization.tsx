import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import PointCustomization from "./PointCustomization";


const ItemCustomization:React.FC = () => {
    const store = useStore(myStore, (state) => state);

    if (!store) return;

    return (<div>
        {store.tab == "points" && <PointCustomization points={store.points} setPoints={store.setPoints} />}
        {store.tab == "segments" && <PointCustomization points={store.points} setPoints={store.setPoints} />}
        {store.tab == "angles" && <PointCustomization points={store.points} setPoints={store.setPoints} />}
        {store.tab == "tags" && <PointCustomization points={store.points} setPoints={store.setPoints} />}
    </div>)
}

export default ItemCustomization