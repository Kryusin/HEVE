import InTreatment from "./InTreatment";
import HistoryDrop from "./HistoryDrop";

export default function Home({ detailData, underTreatment }) {

    return (
        <div className="flex flex-col gap-4">
            <InTreatment underTreatment={underTreatment} />
            <HistoryDrop historyMedicine={detailData} />
        </div>
    );
};
