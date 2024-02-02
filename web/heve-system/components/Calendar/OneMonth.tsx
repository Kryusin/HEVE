'use client'
import OneWeek from "./OneWeek"

export default function OneMonth({ month, today, onclickHandler, daylist, nowYear, nowMonth }: { month: Array<string>[], today: string, onclickHandler: (element: string) => void, daylist: any, nowYear: number, nowMonth: number }) {
    return (
        <div className="self-stretch flex flex-col">
            {month.map((w, i) => (
                <OneWeek week={w} onclickHandler={onclickHandler} today={today} daylist={daylist} nowYear={nowYear} nowMonth={nowMonth} key={i} />
            ))}
        </div>
    )
};
