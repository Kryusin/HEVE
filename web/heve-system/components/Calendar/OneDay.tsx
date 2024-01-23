'use client';
import { useEffect, useState } from "react"
import React from "react";

export default function OneDay({ day, index, onclickHandler, today, daylist, nowYear, nowMonth }: { day: string, index: number, onclickHandler: (element:string) => void, today: string, daylist: any, nowYear: number, nowMonth: number}) {

    const setDay = (e:any) => {
        var day = e.target.innerHTML
        if (day.length >= 2) {
            day = day.slice(0, 2)
            if (isNaN(day)) {
                day = day.slice(0, 1)
            }
        }

        onclickHandler(day);
    }

    return (
        <>
            {day != "" ? (
                <div className={`flex-1 text-center text-sm ${index == 6 ? "text-[#9747FF]" : index == 0 ? "text-[#FF4343]" : "text-black"} ${today == day ? "bg-[#E0E0E0]" : "hover:bg-[#ffae00d3]"} hover:font-bold hover:text-base rounded-lg`} onClick={(e) => setDay(e)} key={day}>
                    <>{day}
                        {daylist.map((d:any, i:number) => (
                            d.date == `${nowYear}-${nowMonth}-${day}` && (
                                <React.Fragment key={i}><br />〇</React.Fragment>
                            )
                        ))}
                    </>
                </div>
            ) : (
                <div className="flex-1" />
            )}
        </>
    )
};
