import Image from "next/image"
import { useState } from "react";

interface Medicine {
    name: string;
    description: string;
    count: number;
    day: number;
}

export default function Card({ name, evaluation, medicine, size }: { name: string, evaluation: string, medicine: Array<Medicine>, size:number }) {
    const [show, setShow] = useState<boolean>(false);
    const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
    setTimeout(() => {
        setShow(true);
    }, 2000);
    return (
        show ? (
            <div className="flex flex-col gap-4 p-6 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] rounded-2xl">
                <div className="justify-self-stretch flex flex-row justify-between ">
                    <b className="text-2xl">{name}</b>
                    <b className="text-2xl">{evaluation}</b>
                </div>
                {medicine.map(m => (
                    <div className={`justify-self-stretch flex flex-row justify-between gap-2 text-center ${size==1 ? "text-xs" : size==2 ? "text-sm" : size==3 ? "text-base" : size==4 && "text-lg"}`} key={m.name}>
                        <p className="max-w-[110px]">{m.name}</p>
                        <p className="flex-1 max-w-[354px]">{m.description}</p>
                        <p>{m.count}錠/日</p>
                        <p>{m.day}日間</p>
                    </div>
                ))}
                <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-row gap-1">
                        <Image src={"/Headset.svg"} alt="" width={24} height={24} />
                        <b className={`${size==1 ? "text-sm" : size==2 ? "text-base" : size==3 ? "text-lg" : size==4 && "text-xl"}`}>先生から</b>
                    </div>
                    <p className={`justify-self-stretch max-w-[550px] ${size==1 ? "text-sm" : size==2 ? "text-base" : size==3 ? "text-lg" : size==4 && "text-xl"}`}>食事に続けて、お菓子を食べ続けないでください。どうしても食べたいのであれば低血糖のお菓子をお食べください。</p>
                </div>
            </div >
        ) : (
            <div className={`flex flex-col gap-4 p-6 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] rounded-2xl ${shimmer}`}>
                <div className="justify-self-stretch flex flex-row justify-between">
                    <div className="text-2xl w-20 bg-gray-200 h-7 rounded-full" />
                    <div className="text-2xl w-5 bg-gray-200 h-7 rounded-full" />
                </div>
                {medicine.map(m => (
                    <div className="justify-self-stretch flex flex-row justify-between text-xs gap-2 text-center" key={m.name}>
                        <div className="min-w-[100px] max-w-[110px] bg-gray-200 h-4 rounded-full" />
                        <div className="flex-1 min-w-[100px] max-w-[354px] bg-gray-200 h-4 rounded-full" />
                        <div className="min-w-[20px] bg-gray-200 h-4 rounded-full" />
                        <div className="min-w-[20px] bg-gray-200 h-4 rounded-full" />
                    </div>
                ))}
                <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-row gap-1">
                        <Image src={"/Headset.svg"} alt="" width={24} height={24} />
                        <b className="text-sm">先生から</b>
                    </div>
                    <div className={`justify-self-stretch ${size==1 ? "text-sm" : size==2 ? "text-base" : size==3 ? "text-lg" : size==4 && "text-xl"} min-w-[550px] max-w-[550px] bg-gray-200 h-4 rounded-full`}></div>
                    <div className={`justify-self-stretch ${size==1 ? "text-sm" : size==2 ? "text-base" : size==3 ? "text-lg" : size==4 && "text-xl"} min-w-[550px] max-w-[550px] bg-gray-200 h-4 rounded-full`}></div>
                    <div className={`justify-self-stretch ${size==1 ? "text-sm" : size==2 ? "text-base" : size==3 ? "text-lg" : size==4 && "text-xl"} min-w-[550px] max-w-[550px] bg-gray-200 h-4 rounded-full`}></div>
                </div>
            </div >
        )
    )
}