'use client';
import TableColum from "./TableColum";
import { useState } from "react";
import { Medicine } from "@/app/interface/interface";

export default function Accordion({ name, start, end, medicine, size }: { name: string, start: string, end: string, medicine: Array<Medicine>, size:number }) {
    const [show, setShow] = useState<boolean>(false)
    const onclick = () => {
        setShow(!show);
    }




    return (
        <div className="self-stretch mx-3 relative rounded-lg min-w-[369.6px] min-h-[40px]">
            <div className={`transition-all ease-in-out duration-300 w-full absolute top-0 left-0 flex flex-row justify-between items-center bg-[#FFAF00] px-3 py-2 delay-75 z-50 rounded-lg ${show ? "shadow-none" : "shadow-xl"}`} onClick={onclick}>
                <p>{name}</p>
                <div id="arrow" className={`w-3 h-3 border-r-2 border-b-2 border-black rounded-sm duration-300 ${!show ? "rotate-45" : "-rotate-[135deg]"}`} />
            </div>
            <div className={`transition-all ease-in-out duration-300 relative top-0 left-0 px-2 pt-11 pb-2 bg-white w-full z-0 rounded-lg shadow-xl ${!show && "hidden"}`}>
                <div className="flex flex-row justify-between">
                    <small className="font-bold">感染日数</small>
                    <div className="flex flex-row items-center gap-2">
                        <small>{start}</small>
                        <small>~</small>
                        <small>{end}</small>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="self-streach flex justify-start">
                        <small className="font-bold">使用薬剤</small>
                    </div>
                    {medicine.map((h, i) => <TableColum name={h.name} description={h.description} count={h.count} days={h.day} type={h.type} key={i} />)}
                </div>
            </div>
        </div>
    )
};
