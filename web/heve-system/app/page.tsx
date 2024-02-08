'use client'
import Header from "@/components/Header";
import DaysCount from "@/components/Calendar/DaysCount";
import Home from "@/components/Home/Home";
import Calendar from "@/components/Calendar/Calendar";
import Chat from "@/components/Chat/Chat";
import Hint from "@/components/Hint";

import { useState, useEffect } from "react";
import Image from 'next/image'
import { push, ref, onChildAdded, onValue } from '@firebase/database'
// import { Button, TextField } from '@mui/material';
// import 'react-phone-input-2/lib/style.css';

import { db, initializeFirebaseApp, auth, firestore } from "@/app/firebase/setup";
import { login, getDocument, getNextDay, phoneCheck, verifyCode, updateGo } from "./lib/form-actions";
import { UserDataProps } from "./interface/interface";
import { signOut } from "firebase/auth";
import { doc, onSnapshot, getDoc, collection } from "firebase/firestore";

initializeFirebaseApp();

export default function Page() {
  const [show, setShow] = useState<'Home' | 'Calendar' | 'Chat'>('Home');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState<any>();
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [uid, setUid] = useState('');
  const [userData, setUserData] = useState<UserDataProps>({ firstName: "guest", lastName: "", age: 0 });
  const [detailData, setDetailData] = useState([]);
  const [underTreatment, setUnderTreatment] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [messages, setMessages] = useState<Array<{ msg: string, sender: string, type: number }>>([])
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [credentialError, setCredentialError] = useState('');
  const [phoneCheckError, setPhoneCheckError] = useState('');
  const [enlargedPhoto, setEnlargedPhoto] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hidden, setHidden] = useState<boolean>(false);
  const [deleteDisp, setDeleteDisp] = useState<boolean>(false);
  const [size, setSize] = useState<number>(1);
  const [go, setGo] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [hintShow, setHintShow] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(authUser) => {
      if (authUser) {
        setUser(authUser);
        setUid(authUser.uid);
        const Data = await getDocument(authUser.uid);
        setUserData(Data[0]);
        setDetailData(Data[1]);
        setUnderTreatment(Data[2]);
        setDiagnosis(Data[4]);
      } else {
        // ログアウトしている場合
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    try {
      const ref = collection(firestore, "Diagnosis", uid);
      return onSnapshot(ref, (doc) => {
        const diagnosis = doc.docs.map((d) => d.data().list);
        const data = diagnosis[0].map((d:any) => {
          const date = new Date(d.date.seconds * 1000);
          return {...d, date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
        })
        setDiagnosis(data);
      })
    } catch (e) {
      console.log(e);
    }
  }, [])

  useEffect(() => {
    try {
      const dbRef = ref(db, 'chat')
      return onChildAdded(dbRef, (snapshot) => {
        const value = snapshot.val()
        setMessages((prev) => [...prev, { type: value.type, msg: value.msg, sender: value.sender }])
      })
    } catch (e) {
      return;
    }
  }, [])

  // useEffect(() => {
  //   const logo = document.getElementsByClassName('logo_fadein');
  //   setTimeout(function() {
  //     logo.fadeIn(1000);
  //   }, 500)
  // }, [])
  // useEffect(() => {
  //   // ログイン状態をウォッチ
  //   let unsubscribe = auth.onAuthStateChanged((user: any) => {
  //     if (user) {
  //       // ログインしている
  //       console.log(user);
  //       // どっか遷移
  //     }
  //     unsubscribe()
  //   })
  // }, [auth])

  // const changeVerificationId = (verificationId) => {
  //   setVerificationId(verificationId);
  // }

  // const clearUser = (userCredential: any) => {
  //   setUser(userCredential)
  // }

  // const clickCredentialError = (error: string) => {
  //   setCredentialError(error);
  // }

  // const SendOtp = async () => {
  //   phoneCheck(phone, changeVerificationId)
  // }

  // const verifyOtp = async () => {
  //   try {
  //     const data = await user?.confirm(otp)
  //     const Data = await getDocument(uid);
  //     setUserData(Data[0]);
  //     setDetailData(Data[1]);
  //     setUnderTreatment(Data[2]);
  //     setDiagnosis(Data[4]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const doLogin = async (e: any) => {
    e.preventDefault();
    await login(email, password, (msg:string) => setError(msg)).then((r:any) => {
      setUid(r.uid);
      setIsLogin(true);
    }).catch((e) => {
      if(e.code == "auth/invalid-email" || e.code == "auth/invalid-credential") {
        setError("メールアドレスまたはパスワードが間違っています。");
      }
    });

    if(!isLogin) return;
    const Data = await getDocument(uid);
    setUserData(Data[0]);
    setDetailData(Data[1]);
    setUnderTreatment(Data[2]);
    setDiagnosis(Data[4]);
  }

  function handleClick(type: 'Home' | 'Calendar' | 'Chat') {
    setShow(type);
  }
  const logout = () => {
    signOut(auth)
    .then(() => {
      setUser(null);
    })
  }

  setTimeout(() => {
    setHidden(true);
    setTimeout(() => {
      setDeleteDisp(true);
    }, 2000);
  }, 3000);

  // const valueChange = (d:Date) => {
  //   setGo(!go);
  //   setDate(d);
  // }

  // useEffect(() => {
  //   updateGo(go,uid,date);
  // }, [date])

  useEffect(() => {
    console.log(detailData);
  }, [detailData])

  return (
      <div className="h-full">
      <div className={`bg-white fixed top-0 left-0 h-full z-[99999] w-full ${hidden ? 'animate-[zoomOut_1.5s_cubic-bezier(0.25,1,0.5,1)_forwards]' : 'animate-[zoomIn_1.5s_cubic-bezier(0.25,1,0.5,1)_forwards]'} ${deleteDisp && 'hidden'}`}>
        <p className="fixed left-[33%] md:left-[43%] top-[45%] w-[280px]"><Image src="/logo.svg" alt="" width={150} height={150} /></p>
      </div>
      {hintShow && <div className="fixed w-full h-full flex justify-center items-center z-[9999999]" onClick={() => setHintShow(!hintShow)}><Hint /></div>}
      {!user ? (
        // isLogin ? (
        //   <div className="h-screen w-screen flex flex-col gap-10 justify-center items-center">
        //     {credentialError && <p className="text-red-500">{credentialError}</p>}
        //     {phoneCheckError && <p className="text-red-500">{phoneCheckError}</p>}
        //     <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="border-2 border-solid border-black rounded-lg px-2 py-3" />
        //     <button id="send-code-button" onClick={() => phoneCheck(phone, changeVerificationId, (msg) => setPhoneCheckError(msg))} className="h-14 bg-black text-white rounded-xl">コードを送信</button>
        //     <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} className="border-2 border-solid border-black rounded-lg px-2 py-3" />
        //     <button onClick={() => verifyCode(verificationId, verificationCode, clearUser, clickCredentialError)} className="h-14 bg-[#FFAF00] rounded-xl">認証する</button>
        //   </div>
        // ) : (
          <form className={`flex justify-center items-center ${hidden && 'z-10'}`}>
            <div className="h-screen w-screen flex flex-col gap-10 justify-center itemscenter px-5 max-w-[450px]">
              {error && <p className="text-red-500">{error}</p>}
              <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder="email" className="border-2 border-solid border-black rounded-lg px-2 py-3" />
              <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} autoComplete="off" placeholder="password" className="border-2 border-solid border-black rounded-lg px-2 py-3" />
              <button className="h-14 bg-[#FFAF00] hover:bg-[#FF9F00] hover:font-bold rounded-xl" onClick={doLogin}>
                Login
              </button>
            </div>
          </form>
        // )
      ) : (
        <div className="overflow-x-hidden h-full">
          <Header handleClick={handleClick} information={userData} logout={logout} changeSize={(i:number) => setSize(i)} />
          <main className={`w-screen flex flex-col gap-9 items-center pt-2 ${size == 1 ? "text-base" : size==2 ? "text-lg" : size==3 ? "text-xl" : size==4 && "text-[22px]"}`}>
            <DaysCount diagnosis={diagnosis} />
            <div className="absolute right-0 top-14 bg-white pr-4 pl-2 py-2 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)] rounded-l-3xl duration-300 hover:bg-[#FFAF00]" onClick={() => setHintShow(!hintShow)}>
              <Image src="/hint.svg" alt="" width={30} height={30} />
            </div>
            {show == 'Home' ? (
              <Home detailData={detailData} underTreatment={underTreatment} size={size} />
            ) : (show == 'Calendar' ? (
              <Calendar diagnosis={diagnosis} size={size} uid={uid} />
            ) : (
              <Chat messages={messages} uid={uid} />
            ))
            }
          </main>
        </div>
      )}
    </div>
  )
}