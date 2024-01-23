export default function TableColum({ name, description, count, days, type }: { name: string, description: string, count: number, days?: number, type?: number }) {
    return (
        <div className="flex flex-row justify-between px-2">
            <small className="flex-auto font-bold max-w-[70px]">{name}</small>
            <small className="flex-auto font-bold max-w-[120px]">{description}</small>
            {!type ? (
                <>
                    <small className="flex-1 font-bold max-w-[40px]">{count}回/日</small>
                    <small className="flex-1 font-bold max-w-[40px]">{days}日間</small>
                </>
            ) : (
                <>
                    <small className="flex-1 font-bold max-w-[40px]">点滴</small>
                    <small className="flex-1 font-bold max-w-[40px]">{count}回</small>
                </>
            )}
        </div>
    )
};