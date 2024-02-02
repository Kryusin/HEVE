import { updateGo } from "@/app/lib/form-actions";
import {useEffect, useState} from "react";
import {useDebouncedCallback} from 'use-debounce';

export default function InputField({uid, date, initGo}: {uid:string, date:Date, initGo:boolean}) {
    const [go, setGo] = useState<boolean>(initGo);
    const changeGo = useDebouncedCallback(() => {
        setGo(!go);
        console.log(go);
    }, 500)

    useEffect(() => {
        updateGo(go, uid, date)
    }, [go])
    return (
        go ? (
            <div className="relative rounded-2xl bg-white w-[60px] h-[30px] shadow-[0px_0px_8px_0px_rgba(255,174,0,.75)_inset]" onClick={changeGo}>
                <input type="checkbox" className="absolute w-0 h-0" />
                <div className={`relative top-[5px] left-1 w-5 h-5 rounded-full duration-700 bg-[#ffae00] ${go ? "translate-x-[150%]": "translate-x-0"}`}></div>
            </div>
        ):(
            <div className="relative rounded-2xl flex bg-white w-[60px] h-[30px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)_inset]" onClick={changeGo}>
                <input type="checkbox" className="absolute w-0 h-0" />
                <div className={`relative top-[5px] left-1 w-5 h-5 rounded-full duration-700 bg-[#D9D9D9] ${go ? "translate-x-[150%]": "translate-x-0"}`}></div>
            </div>
        )
    )
}