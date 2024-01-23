'use client'
import OneWeek from "./OneWeek"
import { useState, useEffect } from "react";

export default function OneMonth({ month, today, onclickHandler, daylist, nowYear, nowMonth }: { month: Array<string>[], today: string, onclickHandler: React.MouseEventHandler }) {

    return (
        <div className="self-stretch flex flex-col">
            {month.map((w, i) => (
                <OneWeek week={w} onclickHandler={onclickHandler} today={today} daylist={daylist} nowYear={nowYear} nowMonth={nowMonth} key={i} />
            ))}
        </div>
    )
};
