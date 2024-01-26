import Input from "./Input";
import Image from "next/image";
import { useEffect, useState } from "react"
import ChatSkelton from "./ChatSkelton";

interface ChatProps {
    msg: string;
    sender: number;
    type: number;
}

interface MessageProps {
    type: number;
    msg: string;
    sender: string;
}

export default function Chat({ messages, uid }: { messages: { type: number, msg: string, sender: string }[], uid: string }) {
    const [show, setShow] = useState<boolean>(false);
    const [enlargedFlag, setEnlargedFlag] = useState<boolean>(false);
    const changeEnlargedFlag = () => {
        setEnlargedFlag(!enlargedFlag);
    }
    setTimeout(() => {
        setShow(true);
    }, 2000);

    return (
        <>
            {show ? (
                <div className="min-w-[353px] self-stretch flex flex-col px-2 justify-between">
                    <div className="h-[600px] md:h-[500px] self-stretch justify-self-stretch flex-auto flex flex-col gap-2 overflow-y-scroll px-4 py-4">
                        {messages.map((message, i) => (
                            message.sender == uid ? (
                                <div className="self-stretch flex flex-row justify-end" key={message.msg}>
                                    {message.type ? (
                                        <div className="max-w-[400px] rounded-2xl shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                                            <Image src={message.msg} alt="" width={0} height={0} className="w-[200px] h-[200px]" onClick={changeEnlargedFlag} />
                                            {enlargedFlag && (
                                                <div className="w-screen h-screen bg-gray-200/60 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <Image src={messages[i].msg} alt="" width={0} height={0} className="w-[400px] h-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={changeEnlargedFlag} />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="max-w-[400px] rounded-2xl px-4 py-2 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] bg-[#FFAF00]">
                                            <p className="">{message.msg}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-row justify-start" key={i}>
                                    {message.type ? (
                                        <div className="max-w-[400px] rounded-2xl shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                                            <Image src={message.msg} alt="" width={0} height={0} className="w-[200px] h-[200px]" />
                                        </div>
                                    ) : (
                                        <div className="max-w-[400px] rounded-2xl px-4 py-2 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] bg-white">
                                            <p>{message.msg}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            ) : (
                <ChatSkelton messages={messages} uid={uid} />
            )}
            <Input uid={uid} />
        </>
    )
};
