'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import TableColum from "./TableColum";
import Accordion from "./Accordion";
import HistoryDropSkelton from "./HistoryDropSkelton";
import { historyMedicineProps, classifictionProps } from "@/app/interface/interface";

export default function HistoryDrop({ historyMedicine,size }: { historyMedicine: historyMedicineProps[], size:number }) {
    const [show, setShow] = useState<boolean>(false);
    const [classification, setClassification] = useState<Array<string>>([]);
    setTimeout(() => {
        // console.log(historyMedicine);
        historyMedicine.map((h:historyMedicineProps, i:number) => {
            const dateYear:string = h.start.split('/')[0];
            if (!classification.includes(dateYear)) {
                setClassification([...classification, dateYear]);
            }
        })
        setShow(true);
    }, 2000);

    return (
        <div className="self-stretch flex flex-col justify-center items-center min-w-[337px] gap-6">
            <div className="flex flex-row justify-start">
                <p className="font-bold">治療履歴</p>
            </div>
            {show ? (
                classification.map((c, i) => (
                    <div className="flex flex-col gap-3 justify-center items-center lg:min-w-[500px]" key={`${c}-${i}`}>
                        <p className={`${size==1 ? "text-sm" : size==2 ? "text-base" : size==3 ? "text-lg" : size==4 && "text-xl"} font-bold text-gray-300`}>~ {c} ~</p>
                        {historyMedicine.map((h:historyMedicineProps, j:number) => (
                            h.start.split('/')[0] == c && <Accordion name={h.name} start={h.start} end={h.end} medicine={h.medicine} size={size} key={h.name} />
                        ))}
                    </div>
                ))
            ) : (
                historyMedicine.map((h, i) => <HistoryDropSkelton key={i} />)
            )}
        </div>
    )
};
