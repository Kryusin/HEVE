'use client'
import Feedback from "./Feedback";
import Schedule from "./Schedule";
import { useState, useEffect } from 'react';
import getMonth from "@/app/lib/datetime";
import { Today } from "@/app/interface/interface";

export default function Calendar({ diagnosis, size, uid }:{ diagnosis: any, size:number, uid:string }) {
    // console.log(diagnosis);
    
    const [today, setToday] = useState<string>("");
    const [month, setMonth] = useState<Array<string>[]>([[]]);
    const [todays, setTodays] = useState<Today>({ prevYear: new Date().getFullYear(), prevMonth: new Date().getMonth(), year: new Date().getFullYear(), month: new Date().getMonth() + 1, nextYear: new Date().getFullYear(), nextMonth: new Date().getMonth() + 2 })

    useEffect(() => {
        if (todays.prevMonth === 13) {
            setTodays({ ...todays, prevYear: todays.year + 1, prevMonth: 1 })
        } else if (todays.prevMonth === -1 || todays.prevMonth === 0) {
            setTodays({ ...todays, prevYear: todays.year - 1, prevMonth: 12 })
        }

        if (todays.nextMonth === 13) {
            setTodays({ ...todays, nextYear: todays.year + 1, nextMonth: 1 })
        } else if (todays.nextMonth === -1 || todays.nextMonth === 0) {
            setTodays({ ...todays, nextYear: todays.year - 1, nextMonth: 12 })
        }

        if (todays.month === 13) {
            setTodays({ ...todays, year: todays.year + 1, month: 1 })
        } else if (todays.month === -1 || todays.month === 0) {
            setTodays({ ...todays, year: todays.year - 1, month: 12 })
        }
        const week = getMonth({ year: todays.year, month: todays.month - 1 });
        week.then(result => setMonth(result))
    }, [todays])

    const decrement = () => {
        setTodays({ prevYear: todays.prevYear, prevMonth: todays.prevMonth - 1, year: todays.year, month: todays.month - 1, nextYear: todays.nextYear, nextMonth: todays.nextMonth - 1 })
    }

    const increment = () => {
        setTodays({ prevYear: todays.prevYear, prevMonth: todays.prevMonth + 1, year: todays.year, month: todays.month + 1, nextYear: todays.nextYear, nextMonth: todays.nextMonth + 1 })
    }

    const onclickHandler = (element: string) => {
        setToday(element)
    }

    useEffect(() => {
        const date = new Date();
        setToday(String(date.getDate()));
    }, [])
    return (
        <div className="min-w-[353px] h-screen flex flex-col gap-4">
            <Schedule onclickHandler={onclickHandler} today={today} decrement={decrement} increment={increment} todays={todays} month={month} daylist={diagnosis} />
            <Feedback todays={todays} today={today} diagnosis={diagnosis} size={size} uid={uid} />
        </div>
    )
};
