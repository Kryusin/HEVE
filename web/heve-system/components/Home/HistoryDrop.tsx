'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import TableColum from "./TableColum";
import Accordion from "./Accordion";
import HistoryDropSkelton from "./HistoryDropSkelton";

interface historyMedicineProps {
    name: string;
    start: string;
    end: string;
    medicine: {
        name: string;
        description: string;
        count: number;
        day: number;
        type: number;
    }[];
}

export default function HistoryDrop({ historyMedicine }: { historyMedicine: historyMedicineProps[] }) {
    const [show, setShow] = useState<boolean>(false);
    setTimeout(() => {
        setShow(true);
    }, 2000);


    return (
        <div className="flex flex-col min-w-[337px] gap-4">
            <div className="self-stretch flex flex-row justify-start">
                <p>治療履歴</p>
            </div>
            {show ? (
                historyMedicine.map((h, i) => <Accordion name={h.name} start={h.start} end={h.end} medicine={h.medicine} key={h.name} />)
            ) : (
                historyMedicine.map((h, i) => <HistoryDropSkelton key={h.name} />)
            )}
        </div>
    )
};
