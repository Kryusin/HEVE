import InTreatment from "./InTreatment";
import HistoryDrop from "./HistoryDrop";

export default function Home({ detailData, underTreatment, size }: {detailData: any, underTreatment: any, size:number }) {
    // console.log(detailData);
    return (
        <div className="w-screen relative left-0 flex flex-col gap-4 justify-start items-start">
            <InTreatment underTreatment={underTreatment} size={size} />
            <HistoryDrop historyMedicine={detailData} size={size} />
        </div>
    );
};
