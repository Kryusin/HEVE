import { RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailAndPassword, PhoneAuthProvider, signInWithCredential, UserCredential } from 'firebase/auth';
import { auth, firestore, initializeFirebaseApp } from '../firebase/setup';
import { db } from '../firebase/setup';
import { doc, getDoc, updateDoc, query, Timestamp } from "firebase/firestore";
import { push, ref } from '@firebase/database'

initializeFirebaseApp();

export const login = async(email: string, password: string, setError:(msg:string) => void) => {

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("ログイン成功");
            if (userCredential) {
                var user = userCredential.user;
            } else {
                return null;
            }
        }).catch((error) => {
            if(error.code == "auth/invalid-email" || error.code == "auth/invalid-credential") {
                setError("メールアドレスまたはパスワードが間違っています。")
            }
        });
}

export const phoneCheck = async(phoneNumber: string, changeVerificationId: (verificationId: string) => void, setPhoneCheckError:(msg:string) => void) => {
    try {
        const recaptcha = new RecaptchaVerifier(auth, 'send-code-button', {
            'size': 'invisible',
        });
        await signInWithPhoneNumber(auth, phoneNumber, recaptcha)
            .then((verificationId) => {
                changeVerificationId(String(verificationId))
            })
            .catch((err) => {
                switch(err.code) {
                    case "auth/app-deleted":
                        setPhoneCheckError("アプリが削除されています。");
                        break;
                    case "auth/app-not-authorized":
                        setPhoneCheckError("アプリが認証されていません。");
                        break;
                    case "auth/argument-error":
                        setPhoneCheckError("認証コードが間違っています。");
                        break;
                    case "auth/invalid-api-key":
                        setPhoneCheckError("APIキーが無効です。");
                        break;
                    case "auth/invalid-user-token":
                        setPhoneCheckError("ユーザートークンが無効です。");
                        break;
                    case "auth/invalid-tenant-id":
                        setPhoneCheckError("テナントIDが無効です。");
                        break;
                    case "auth/network-request-failed":
                        setPhoneCheckError("ネットワークエラーです。");
                        break;
                    case "auth/operation-not-allowed":
                        setPhoneCheckError("この操作は許可されていません。");
                        break;
                    case "auth/requires-recent-login":
                        setPhoneCheckError("再度ログインしてください。");
                        break;
                    case "auth/too-many-requests":
                        setPhoneCheckError("認証コードの送信回数が上限に達しました。時間をおいて再度お試しください。");
                        break;
                    case "auth/unauthorized-domain":
                        setPhoneCheckError("ドメインが許可されていません。");
                        break;
                    case "auth/user-disabled":
                        setPhoneCheckError("ユーザーが無効です。");
                        break;
                    case "auth/user-token-expired":
                        setPhoneCheckError("ユーザートークンが期限切れです。");
                        break;
                    case "auth/web-storage-unsupported":
                        setPhoneCheckError("Webストレージがサポートされていません。");
                        break;
                }
            })
    } catch (err) {
        console.log(err);
    }
}

export const verifyCode = async (verificationId: string, verificationCode: string, setUser: (userCredential: any) => void, setCredentialError: (err: string) => void) => {
    console.log("id:" ,verificationId, "code: ", verificationCode);
    const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
    await signInWithCredential(auth, credential)
        .then((userCredential) => {
            console.log("success");
            setUser(userCredential);
        })
        .catch((err) => {
            console.log("error");
            setCredentialError("認証コードが間違っています。");
        })
}

export const getDocument = async (document: string) => {
    const allData: any = [];
    let UserData: any = [];
    const UserRef = doc(firestore, "Users", document);
    const UserSnap = await getDoc(UserRef);
    if (UserSnap.exists()) {
        UserData = UserSnap.data();
        allData[0] = UserData;
    }
    const TreatRef = doc(firestore, "TretmentHistory", document);
    const TreatSnap = await getDoc(TreatRef)
    if (TreatSnap.exists()) {
        allData[1] = TreatSnap.data().list;

        TreatSnap.data().list.map(async (item:any, index:number) => {
            let diseaseData: any = [];
            const disease = doc(firestore, "Disease", String(item.id));
            const diseaseSnap = await getDoc(disease);
            if (diseaseSnap.exists()) {

                diseaseData = diseaseSnap.data();
                diseaseSnap.data().medicine.map(async (med:any, index:number) => {
                    const medicine = doc(firestore, "Medicine", String(med.number));
                    const medicineSnap = await getDoc(medicine);
                    if (medicineSnap.exists()) {
                        delete diseaseData.medicine[index].number;
                        diseaseData.medicine[index].name = medicineSnap.data().name;
                        diseaseData.medicine[index].description = medicineSnap.data().description;
                    }
                })
            }
            delete allData[1][index].id;
            allData[1][index].name = diseaseData.name;
            allData[1][index].medicine = diseaseData.medicine;
            const startDate = new Date(allData[1][index].start.seconds * 1000);
            const endDate = new Date(allData[1][index].end.seconds * 1000);
            allData[1][index].start = startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate();
            allData[1][index].end = endDate.getFullYear() + "/" + (endDate.getMonth() + 1) + "/" + endDate.getDate();
        })
    }

    const UnderRef = doc(firestore, "UnderTreatment", document);
    const UnderSnap = await getDoc(UnderRef);

    if (UnderSnap.exists()) {

        allData[2] = UnderSnap.data().list;
        UnderSnap.data().list.map(async (item:any, i:number) => {
            item.medicine.map(async (med:any, y:number) => {
                const medicine = doc(firestore, "Medicine", String(med.number));
                const medicineSnap = await getDoc(medicine);
                if (medicineSnap.exists()) {
                    delete allData[2][i].medicine[y].number;
                    allData[2][i].medicine[y].name = medicineSnap.data().name;
                    allData[2][i].medicine[y].description = medicineSnap.data().description;
                }
            })
        })
    }

    const ChatRef = doc(firestore, "Chat", document);
    const ChatSnap = await getDoc(ChatRef);
    if (ChatSnap.exists()) {
        allData[3] = ChatSnap.data().list;
    }

    const DiagRef = doc(firestore, "Diagnosis", document);
    const DiagSnap = await getDoc(DiagRef);
    if (DiagSnap.exists()) {
        allData[4] = DiagSnap.data().list;
        DiagSnap.data().list.map(async (item:any, i:number) => {
            const date = new Date(item.date.seconds * 1000);
            allData[4][i].date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        })
    }

    return allData;
}

export const submitMessage = async (message: string, uid: string, list:any) => {
    const info = {
        list: [
            ...list,
            {
                msg: message,
                sender: 1,
                type: 0
            }
        ]
    }
    const ChatRef = doc(firestore, "Chat", uid);
    await updateDoc(ChatRef, info);
}

export const sendMessage = async (e:any, message: { message: string, imgArray: string }, uid: string) => {
    e.preventDefault();
    try {
        const dbRef = ref(db, 'chat');
        if (message.imgArray.length != 0) {
            await push(dbRef, {
                type: 1,
                sender: uid,
                msg: message.imgArray
            })
        }
        if (message.message.length != 0) {
            await push(dbRef, {
                type: 0,
                sender: uid,
                msg: message.message
            })
        }
    } catch (e) {
        console.log(e);
    }
}

export const getNextDay = (nowDay:Date, diagnosis:any) => {
    var nextdate = 0;
    var flag = false;
    diagnosis.map((dia:any) => {
        const next = new Date(dia.date);
        if (!flag) {

            if (nowDay < next) {
                nextdate = Math.floor((next.getTime() - nowDay.getTime()) / (1000 * 60 * 60 * 24));
                flag = true;
            }
        }
    })
    return nextdate + 1;
}

export const updateGo = async(go:boolean, uid:string, date:Date) => {
    const ref = doc(firestore, "Diagnosis", uid);
    const DiagSnap = await getDoc(ref);
    if (DiagSnap.exists()) {
        const comp = DiagSnap.data().list.map(async (item:any) => {
            // console.log(`${item.date.seconds} == ${Math.floor(date.getTime() / 1000)} : ${item.date.seconds === Math.floor(date.getTime() / 1000)}`);
            if(item.date.seconds === Math.floor(date.getTime() / 1000)) {
                return {
                    ...item,
                    go: go
                }
            } else {
                return item;
            }
        })
        var data:Array<any> = [];
        await comp.forEach((c:any) => {
            c.then((res:any) => {
                if(res != undefined) {
                    data.push(res);
                }
            })
        })

        if(data.length > 0) {
            await updateDoc(ref, {list: data})
        }
    }
}