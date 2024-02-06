import { getNextDay } from "@/app/lib/form-actions";
import { useState, useEffect } from "react";

export default function DaysCount({ diagnosis }: {diagnosis: any}) {
    const [days, setDays] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    setTimeout(() => {
        setDays(getNextDay(new Date(), diagnosis))
        setShow(true);
    }, 2000);
    
    return (
        <div className="flex flex-row gap-1 items-center justify-center shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)] px-3 py-1 max-w-[170px] rounded-full">
            <b className="text-sm">次の検診まで</b>
            {show ? (
                <b className="text-2xl text-[#FFAF00]">{days}</b>
            ):(
                <div className="w-[13.6px] h-[32] bg-gray-200 rounded" />
            )}
            <b className="text-sm">日</b>
        </div>
    )
};
