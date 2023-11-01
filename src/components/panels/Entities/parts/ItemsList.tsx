
type PropsType = {
    children?: React.ReactNode 
}

const ItemsList: React.FC<PropsType> = ({children}) => {
    return (
        <div className="flex-1 rounded-md bg-a_neutral p-1 md:overflow-y-auto">
            {children}
        </div>
    )
}

export default ItemsList;