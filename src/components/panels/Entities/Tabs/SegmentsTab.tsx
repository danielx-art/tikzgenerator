export default function SegmentsTab() {
    return (
    <div className="flex h-full flex-col flex-nowrap">
        <div className="rounded-sm m-2 p-2 text-a_neutral text-sm ">
                Selecione dois ou mais pontos na aba "Pontos" e clique em "Conectar!". Múltiplos pontos serão conectados na ordem que estão na lista.
        </div>
        <div
          className="rounded-sm bg-a_dark py-2 px-4 text-a_highlight outline-1 w-fit self-center my-4"
        >
          Conectar!
        </div>
    </div>
    )
}