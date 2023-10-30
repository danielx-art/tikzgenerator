import useStore from "import/utils/useStore";
import useMyStore from "store";

export const Debugger = () => {
  const store = useStore(useMyStore, (state)=>state);

  return (
    <div className="absolute right-0 top-0 flex flex-col flex-nowrap gap-2">
      <button onClick={() => console.log(store?.points)}>Pontos</button>
      <button onClick={() => console.log(store?.segments)}>Segmentos</button>
      <button onClick={() => console.log(store?.angles)}>Angulos</button>
      <button onClick={() => console.log(store?.tags)}>Etiquetas</button>
    </div>
  );
};
