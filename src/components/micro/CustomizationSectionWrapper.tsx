import { cn } from "import/utils/misc/cn";


export default function CustomizationSectionWrapper({children, className}:{children: React.ReactNode, className?:string}){
    return (
        <div className={cn("flex flex-col flex-nowrap divide-y-2 [&>*]:py-4", className)}>
            {children}
        </div>
    )
}