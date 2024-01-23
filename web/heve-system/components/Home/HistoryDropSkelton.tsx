export default function HistoryDropSkelton() {
    const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
    return (
        <div className={`mx-3 relative rounded-lg min-w-[329px] min-h-[40px] ${shimmer}`}>
            <div className={`w-full absolute top-0 left-0 flex flex-row justify-between items-center px-3 py-2 rounded-lg bg-gray-200`} />
        </div>
    )
}