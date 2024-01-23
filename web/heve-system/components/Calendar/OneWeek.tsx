import OneDay from "./OneDay"

export default function OneWeek({ week, onclickHandler, today, daylist, nowYear, nowMonth }: { week: Array<string>, onclickHandler: (element:string) => void, today: string, daylist: any, nowYear: number, nowMonth: number}) {
    return (
        <div className="self-stretch flex flex-row h-12">
            {week.map((d, i) => (
                <OneDay day={d} index={i} onclickHandler={onclickHandler} today={today} daylist={daylist} nowYear={nowYear} nowMonth={nowMonth} key={i} />
            ))}
        </div>
    )
};
