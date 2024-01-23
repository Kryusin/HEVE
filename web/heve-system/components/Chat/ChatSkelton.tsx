import Image from 'next/image';

export default function ChatSkelton({ messages, uid }: { messages: { type: number, msg: string, sender: string }[], uid: string }) {
    return (
        <div className="min-w-[353px] self-stretch flex flex-col px-2 justify-between" >
            <div className="h-[500px] self-stretch justify-self-stretch flex-auto flex flex-col gap-2 overflow-y-scroll px-4 py-4">
                {messages.map((messages, i) => (
                    messages.sender != uid ? (
                        <div className="self-stretch flex flex-row justify-end" key={i}>
                            {messages.type ? (
                                <div className="max-w-[400px] rounded-2xl px-4 py-2">
                                    <div className='bg-gray-200 w-[150px] h-[150px]'></div>
                                </div>
                            ) : (
                                <div className="max-w-[400px] px-4 py-2">
                                    <p className="rounded-full bg-gray-200 h-4 w-48"></p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-row justify-start" key={i}>
                            {messages.type ? (
                                <div className="max-w-[400px] rounded-2xl px-4 py-2">
                                    <div className='bg-gray-200 w-[150px] h-[150px]'></div>
                                </div>
                            ) : (
                                <div className="max-w-[400px] px-4 py-2">
                                    <p className='bg-gray-200 h-4 w-48 rounded-full'></p>
                                </div>
                            )}
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}