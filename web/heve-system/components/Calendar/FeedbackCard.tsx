import Image from "next/image"

export default function FeedbackCard({ name, evaluation, message, size }: { name: string, evaluation: string, message: string, size:number }) {
    return (
        <div className="flex flex-col gap-[30px] px-10 py-10 rounded-[20px] bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)]">
            <div className="justify-self-stretch flex flex-row justify-between">
                <p className="text-2xl font-bold">{name}</p>
                <p className="text-2xl font-bold">{evaluation}</p>
            </div>
            <div className="self-stretch flex flex-col items-center gap-[10px]">
                <div className="flex flex-row gap2">
                    <Image
                        src="/Headset.svg"
                        alt=""
                        width={24}
                        height={24}
                    />
                    <p className="font-bold">先生からの一言</p>
                </div>
                <div className="self-stretch flex">
                    <p className={`${size==1 ? "text-xs" : size==2 ? "text-sm" : size==3 ? "text-base" : size==4 && "text-lg"} leading-5`}>{message}</p>
                </div>
            </div>
        </div>
    )
}