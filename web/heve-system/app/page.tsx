'use client'
import Header from "@/components/Header";
import DaysCount from "@/components/Calendar/DaysCount";
import Home from "@/components/Home/Home";
import Calendar from "@/components/Calendar/Calendar";
import Chat from "@/components/Chat/Chat";

import { useState, useEffect } from "react";
import { push, ref, onChildAdded, onValue } from '@firebase/database'
import { Button, TextField } from '@mui/material';
import 'react-phone-input-2/lib/style.css';

import { db } from "@/app/firebase/setup";
import { auth } from "./firebase/setup";
import { login, getDocument, getNextDay, phoneCheck, verifyCode } from "./lib/form-actions";
import { UserDataProps } from "./interface/interface";
import { signOut } from "firebase/auth";

export default function Page() {
  const [show, setShow] = useState<'Home' | 'Calendar' | 'Chat'>('Home');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState<ConfirmationResult>();
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

  const changeVerificationId = (verificationId) => {
    setVerificationId(verificationId);
  }

  const clearUser = (userCredential: any) => {
    setUser(userCredential)
  }

  const clickCredentialError = (error: string) => {
    setCredentialError(error);
  }

  const SendOtp = async () => {
    phoneCheck(phone, changeVerificationId)
  }

  const verifyOtp = async () => {
    try {
      const data = await user?.confirm(otp)
      const Data = await getDocument(uid);
      setUserData(Data[0]);
      setDetailData(Data[1]);
      setUnderTreatment(Data[2]);
      setDiagnosis(Data[4]);
    } catch (err) {
      console.log(err);
    }
  }

  const doLogin = async (e: any) => {
    e.preventDefault();
    await login(email, password, (msg:string) => setError(msg)).then((r) => {
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

  return (
    <div>
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
          <form className="flex justify-center items-center">
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
        <div className="overflow-x-hidden">
          <Header handleClick={handleClick} information={userData} logout={logout} />
          <main className="w-screen flex flex-col gap-9 items-center pt-2">
            <DaysCount diagnosis={diagnosis} />
            {show == 'Home' ? (
              <Home detailData={detailData} underTreatment={underTreatment} />
            ) : (show == 'Calendar' ? (
              <Calendar diagnosis={diagnosis} />
            ) : (
              <Chat messages={messages} uid={uid} enlargedFlag={enlargedPhoto} changeEnlargedFlag={() => setEnlargedPhoto(!enlargedPhoto)} />
            ))
            }
          </main>
        </div>
      )}
    </div>
  )
}