import InTreatment from "./InTreatment";
import HistoryDrop from "./HistoryDrop";

export default function Home({ detailData, underTreatment, size }: {detailData: any, underTreatment: any, size:number }) {

    return (
        <div className="flex flex-col gap-4">
            <InTreatment underTreatment={underTreatment} size={size} />
            <HistoryDrop historyMedicine={detailData} size={size} />
        </div>
    );
};
