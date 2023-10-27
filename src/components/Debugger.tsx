import useMyStore from "store";

export const Debugger = () => {
  const allState = useMyStore();

  return (
    <div className="absolute right-0 top-0 flex flex-col flex-nowrap gap-2">
      <button onClick={() => console.log(allState.points)}>Pontos</button>
      <button onClick={() => console.log(allState.segments)}>Segmentos</button>
      <button onClick={() => console.log(allState.angles)}>Angulos</button>
      <button onClick={() => console.log(allState.tags)}>Etiquetas</button>
    </div>
  );
};
