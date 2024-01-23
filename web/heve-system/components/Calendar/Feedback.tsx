import Image from "next/image"
import FeedbackAction from "./FeedbackAction";
import FeedbackCard from "./FeedbackCard";
interface Today {
    prevYear: number,
    prevMonth: number,
    year: number,
    month: number,
    nextYear: number,
    nextMonth: number,
}

export default function Feedback({ todays, today, diagnosis }: { todays: Today, today: string, diagnosis: any }) {
    const diseaseFacts: Array<string> = [
        "世界で最も身近な病気は風邪です。",
        "風邪の原因は、ウイルスです。",
        "インフルエンザの原因も、ウイルスです。",
        "インフルエンザは、風邪よりも重症化しやすい病気です。",
        "新型コロナウイルス感染症の原因も、ウイルスです。",
        "新型コロナウイルス感染症は、重症化すると肺炎や呼吸不全を引き起こす可能性があります。",
        "がんは、細胞の異常増殖によって引き起こされる病気です。",
        "がんは、様々な種類があります。",
        "心臓病は、心臓の病気です。",
        "心臓病は、日本死因順位の第1位です。",
        "脳卒中は、脳の病気です。",
        "脳卒中は、日本死因順位の第2位です。",
        "糖尿病は、血糖値の高い病気です。",
        "糖尿病は、生活習慣病の一種です。",
        "高血圧は、血圧の高い病気です。",
        "高血圧は、生活習慣病の一種です。",
        "アレルギーは、特定の物質に過剰に反応する体質です。",
        "アレルギーは、花粉症や食物アレルギーなどがあります。",
        "湿疹は、皮膚の炎症です。",
        "湿疹は、アトピー性皮膚炎や接触性皮膚炎などがあります。",
        "うつ病は、気分が落ち込み、意欲が低下する病気です。",
        "うつ病は、精神疾患の一種です。",
        "統合失調症は、幻覚や妄想などの症状が出る病気です。",
        "統合失調症は、精神疾患の一種です。",
        "アルコール依存症は、アルコールに依存する病気です。",
        "アルコール依存症は、精神疾患の一種です。",
        "薬物依存症は、薬物に依存する病気です。",
        "薬物依存症は、精神疾患の一種です。",
    ];
    const fb = diagnosis.map((s:any, i:number) => (
        s.date == `${todays.year}-${todays.month}-${today}` ? (
            <FeedbackCard name={s.name} evaluation={s.evaluation} message={s.message} />
        ) : (
            <div className="flex flex-row gap-5 justify-center items-center">
                <Image src={"/denkyu.svg"} alt="" width={50} height={50} />
                <b>{diseaseFacts[Number(today) - 1]}</b>
            </div>
        )
    ))
    return (
        <div className="max-w-[350px] flex flex-col items-start gap-4">
            <div className="flex flex-row">
                <p className="font-bold text-xl">{todays.year}/{todays.month}/{today}</p>
            </div>
            <div className="self-stretch flex flex-col gap-5">
                {fb[0].props.hasOwnProperty("children") ? (
                    fb[1]
                ) : (
                    fb[0]
                )}
            </div>
        </div>
    )
};
