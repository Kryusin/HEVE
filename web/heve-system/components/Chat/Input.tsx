import Image from "next/image"
import { useEffect, useState } from "react";
import { sendMessage } from "@/app/lib/form-actions"

interface PreviewProps {
    imageData: string;
}

interface MsgObj {
    message: string,
    imgArray: string
    chooseImg: string
}

export default function Input({ uid }: { uid: string }) {
    const [msg, setMsg] = useState<MsgObj>({ message: "", imgArray: "", chooseImg: "" });
    const [preview, setPreview] = useState<boolean>(false);
    const choosePic = (en:any) => {
        const files = en.target.files;
        if (files.length > 0) {
            var file = files[0];
            var reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setMsg({ ...msg, imgArray: String(e.target.result), chooseImg: String(en.target.value.slice(12)) })
                } else {
                }
            }
            reader.readAsDataURL(file);
        } else {
            setMsg({ ...msg, imgArray: "", chooseImg:"" })
        }
        setPreview(false);
    }

    return (
        <div className="fixed bottom-3 left-11 md:left-[500px] flex flex-col gap-3 items-center ">
            {msg.chooseImg.length != 0 && (
                <>
                    {preview && <Image src={msg.imgArray} alt="" width={150} height={150} className="rounded-3xl" />}
                    <div className="bg-[#e0e0e0] px-4 py-2 rounded-3xl flex flex-row gap-2" onMouseEnter={() => setPreview(true)} onMouseLeave={() => setPreview(false)}>
                        <p>{msg.chooseImg}</p>
                        <Image src="/cross.svg" alt="" width={15} height={15} className="rotate-45 cursor-pointer" onClick={() => setMsg({ ...msg, imgArray: "", chooseImg: "" })} />
                    </div>
                </>
            )}
            <div className="flex flex-row rounded-full items-center px-8 py-4 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] gap-3">
                <input type="file" accept="image/*" className="hidden" id="fileSelect" onChange={choosePic} />
                <label htmlFor="fileSelect" className="cursor-pointer"><Image src="/gallery.svg" alt="choose photo" width={24} height={24} /></label>
                <input type="text" className="w-[150px] md:w-[400px] focus:outline-none" placeholder="message" onChange={(e) => setMsg({ ...msg, message: e.target.value })} />
                {msg.message.length > 0 || msg.imgArray.length != 0 ? (
                    <button onClick={(e) => { sendMessage(e, msg, uid); setMsg({ message: "", imgArray: "", chooseImg: "" }) }}><Image src={"/activeSubmit.svg"} alt="" width={24} height={24} /></button>
                ) : (
                    <Image src={"/submit.svg"} alt="" width={24} height={24} className="cursor-not-allowed" />
                )}
            </div>
        </div>
    )
};
