import Image from "next/image";
import OneMonth from "./OneMonth";
import { useEffect, useState } from "react"

interface Today {
    prevYear: number,
    prevMonth: number,
    year: number,
    month: number,
    nextYear: number,
    nextMonth: number,
}

export default function Schedule({ onclickHandler, today, decrement, increment, todays, month, daylist }: { onclickHandler: (element:string) => void, today: string, decrement: React.MouseEventHandler, increment: React.MouseEventHandler, todays: Today, month: Array<string>[], daylist: any}) {
    const [show, setShow] = useState(false);
    // useEffect(() => {
    //     setShow(true)
    // }, [])
    setTimeout(() => {
        setShow(true)
    }, 2000)

    return (
        <>
            {show ? (
                <div className="w-full flex flex-col gap-4 items-end px-5 bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)] rounded-2xl py-4">
                    <div className="self-stretch flex flex-row justify-between items-center px-[60px]">
                        <b className="text-sm text-[#999] hover:cursor-pointer" onClick={decrement}>{todays.prevMonth}</b>
                        <div className="flex flex-col items-center"><b className="text-xl">{todays.month}</b><span className="text-[12px]">{todays.year}</span></div>
                        <b className="text-sm text-[#999] hover:cursor-pointer" onClick={increment}>{todays.nextMonth}</b>
                    </div>
                    <div className="self-stretch flex flex-row text-center">
                        <span className="flex-1 text-sm text-[#FF4343]">Sun</span>
                        <span className="flex-1 text-sm">Mon</span>
                        <span className="flex-1 text-sm">Tue</span>
                        <span className="flex-1 text-sm">Wed</span>
                        <span className="flex-1 text-sm">Thu</span>
                        <span className="flex-1 text-sm">Fri</span>
                        <span className="flex-1 text-sm text-[#9747FF]">Sat</span>
                    </div>
                    <OneMonth month={month} today={today} onclickHandler={onclickHandler} daylist={daylist} nowYear={todays.year} nowMonth={todays.month} />
                </div>
            ) : (
                <div className="w-full flex flex-col gap-4 items-end px-5 bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)] rounded-2xl py-4">
                    <div className="self-stretch flex flex-row justify-between items-center px-[60px]">
                        <p className="w-3 h-3 rounded-lg bg-gray-200" />
                        <div className="flex flex-col items-center"><b className="bg-gray-200 w-3 h-7 rounded-lg" /><span className="w-7 h-3 bg-gray-200 rounded-lg" /></div>
                        <p className="w-3 h-3 rounded-lg bg-gray-200" />
                    </div>
                    <div className="self-stretch flex flex-row text-center bg-gray-200 rounded-lg h-3">
                        <span className="flex-1" />
                        <span className="flex-1" />
                        <span className="flex-1" />
                        <span className="flex-1" />
                        <span className="flex-1" />
                        <span className="flex-1" />
                        <span className="flex-1" />
                    </div>
                    <OneMonth month={month} today={today} onclickHandler={onclickHandler} daylist={daylist} nowYear={todays.year} nowMonth={todays.month} />
                </div>
            )}
        </>
    );
};
