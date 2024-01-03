
type PropsType = {
    children?: React.ReactNode 
}

const ItemsList: React.FC<PropsType> = ({children}) => {
    return (
        <div className="flex-1 rounded-md bg-c_base border-2 border-c_faded p-1 md:overflow-y-auto">
            {children}
        </div>
    )
}

export default ItemsList;