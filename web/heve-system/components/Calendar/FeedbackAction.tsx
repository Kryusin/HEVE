import Image from "next/image";

export default function FeedbackAction({ evaluation }: { evaluation: string }) {
    return (
        <div className="self-stretch flex flex-row gap-16 items-center justify-center">
            <Image
                src={img}
                alt=""
                width={90}
                height={90}
            />
            <b className="text-3xl">{evaluation}</b>
        </div>
    );
};
