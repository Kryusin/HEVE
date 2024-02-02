import Image from "next/image"
import Card from "./Card"

export default function InTreatment({ underTreatment, size }: { underTreatment: any, size:number }) {
    return (
        <div className="flex flex-row min-w-[393px] px-[30px] py-4 md:min-w-[450px] gap-[14px]">
            {underTreatment.map((u:any) => (
                <Card name={u.name} evaluation={u.evaluation} medicine={u.medicine} size={size} key={u.name} />
            ))}
        </div>
    )
};
