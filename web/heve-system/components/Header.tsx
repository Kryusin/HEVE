'use client'
import { useState } from "react";

export default function Header({ handleClick, information, logout, changeSize }: { handleClick: (type: 'Home' | 'Calendar' | 'Chat') => void, information: { firstName: string, lastName: string, age: number }, logout:() => void, changeSize: (i:number) => void }) {
    const [show, setShow] = useState<boolean>(false);

    const clickHandler = () => {
        const selector = document.getElementById("hamburger");
        if (!show) {
            // selector?.children[0].classList.remove("rotate-45");
            // selector?.children[2].classList.remove("rotate-45");
            selector?.children[1].classList.add("transition", "-translate-x-8");
            selector?.children[0].classList.add("-left-[1px]", "top-2", "rotate-45");
            selector?.children[2].classList.add("-top-1", "-rotate-45");
            setShow(true);
        } else {
            selector?.children[1].classList.remove("transition", "-translate-x-8");
            selector?.children[0].classList.remove("-left-[1px]", "top-2", "rotate-45");
            selector?.children[2].classList.remove("-top-1", "-rotate-45");
            setShow(false);
        }
    }

    const ChangeShow = (type:'Home' | 'Calendar' | 'Chat') => {
        handleClick(type);
        const selector = document.getElementById("hamburger");
        selector?.children[1].classList.remove("transition", "-translate-x-8");
        selector?.children[0].classList.remove("-left-[1px]", "top-2", "rotate-45");
        selector?.children[2].classList.remove("-top-1", "-rotate-45");
        setShow(false);
    }
    return (
        <header className="flex flex-row justify-between items-center px-4 h-10 md:pr-7">
            <div className="flex flex-row gap-2 items-end">
                <b className="text-2xl">加納総合病院</b>
                <p className="hidden md:block">{information.firstName + information.lastName}</p>
                <p className="hidden md:block">{information.age}歳</p>
            </div>
            <div className="md:hidden flex flex-row gap-2 items-center justify-center">
                <select name="size" id="" onChange={(e) => changeSize(Number(e.target.value))} className="w-12 focus:outline-none">
                    <option disabled>文字サイズ</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <div id="hamburger" className="w-5 h-5 overflow-hidden flex flex-col gap-1 items-center" onClick={clickHandler}>
                    <p className="w-5 h-0.5 bg-black rounded-lg relative duration-700 delay-300"></p>
                    <p className="w-5 h-0.5 bg-black rounded-lg relative duration-700"></p>
                    <p className="w-5 h-0.5 bg-black rounded-lg relative duration-700 delay-300"></p>
                </div>
                {show &&
                    <div className="z-50 absolute bg-white rounded-lg shadow-xl top-7 right-4 px-4 py-4 flex flex-col gap-2">
                        <div className="flex flex-col px-2 py-1 border-b-2 border-[#EEEDED]">
                            <p className="text-sm">高本龍信</p>
                            <p className="text-sm">22歳</p>
                        </div>
                        <p className="font-bold hover:bg-[#E8E8E8] px-2 py-1 rounded-lg cursor-pointer" onClick={() => ChangeShow('Home')}>ホーム</p>
                        <p className="font-bold hover:bg-[#E8E8E8] px-2 py-1 rounded-lg cursor-pointer" onClick={() => ChangeShow('Chat')}>チャット</p>
                        <p className="font-bold hover:bg-[#E8E8E8] px-2 py-1 rounded-lg cursor-pointer" onClick={() => ChangeShow('Calendar')}>カレンダー</p>
                        <p className="font-bold hover:bg-[#E8E8E8] px-2 py-1 rounded-lg cursor-pointer" onClick={logout}>ログアウト</p>
                    </div>
                }
            </div>
            <div className="hidden md:flex flex-row gap-5 lg:gap-8">
                <b id="Home" className="rounded-full px-3 py-1 hover:bg-[#E8E8E8] text-center cursor-pointer" onClick={() => ChangeShow('Home')}>ホーム</b>
                <b id="Chat" className="rounded-full px-3 py-1 hover:bg-[#E8E8E8] text-center cursor-pointer" onClick={() => ChangeShow('Chat')}>チャット</b>
                <b id="Calendar" className="rounded-full px-3 py-1 hover:bg-[#E8E8E8] text-center cursor-pointer" onClick={() => ChangeShow('Calendar')}>カレンダー</b>
                <b id="Calendar" className="rounded-full px-3 py-1 hover:bg-[#E8E8E8] text-center cursor-pointer" onClick={logout}>ログアウト</b>
                <select name="size" id="" onChange={(e) => changeSize(Number(e.target.value))} className="w-12 focus:outline-none">
                    <option disabled>文字サイズ</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
        </header>
    );
};
