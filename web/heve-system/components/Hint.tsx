import Image from "next/image"

export default function Hint() {
    return (
        <>
            <div className="flex flex-col gap-10 justify-start items-center bg-white opacity-100 p-6 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] rounded-2xl min-w-[333px] max-w-[900px] z-[999999] h-[600px] overflow-y-scroll card">
                <h2 className="pb-3 border-b-2 border-solid border-gray-300">使用方法</h2>
                <h2 className="font-bold tracking-widest">メニューについて</h2>
                <div className="flex flex-col gap-[30px]">
                    <p><p className="font-bold">ホーム</p>現在治療中のカードと治療履歴のカードが確認できます。</p>
                    <p><p className="font-bold">チャット</p>医者の方と診断や質問が行うことができます。診断をする際は、患部の写真をお送りください。</p>
                    <p><p className="font-bold">カレンダー</p>通院についてのスケジュール調整を行うことができます。</p>
                    <p><p className="font-bold">文字サイズ</p>数字の箇所を押して頂くと文字サイズを変更できます。</p>
                </div>
                <h2 className="font-bold tracking-widest">ホームについて</h2>
                <div className="flex flex-col gap-[30px]">
                    <div className="flex flex-col lg:flex-row gap-10 items-center">
                        <div className="flex flex-col gap-4">
                            <p className="flex-1">このカードは現在治療中のカードとなっております。<br />記載内容といたしましては、以下の通りです。</p>
                            <ul className="font-bold">
                                <li>病名</li>
                                <li>治療度合</li>
                                <li>使用薬剤(薬剤名・効果・一日の摂取量・総合摂取量)</li>
                                <li>医者の方からのアドバイス</li>
                            </ul>
                        </div>
                        <Image src="/help/help1.svg" alt="" width={300} height={300}  className="object-contain"></Image>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-10 items-center">
                        <div className="flex flex-col gap-4">
                            <p className="flex-1">このボタンは、開くと次の内容が記載されています</p>
                            <ul className="font-bold">
                                <li>感染日数</li>
                                <li>使用薬剤(薬剤名・効果・一日の摂取量・総合摂取量)</li>
                            </ul>
                            <p className="text-red-500">※症状開始日の年度で分類しています。</p>
                        </div>
                        <Image src="/help/help2.svg" alt="" width={300} height={300}  className="object-contain"></Image>
                    </div>
                </div>
                <h2 className="font-bold tracking-widest">チャットについて</h2>
                <div className="flex flex-col gap-[30px]">
                    <div className="flex flex-col lg:flex-row gap-10 items-center">
                        <div className="flex flex-col gap-4">
                            <p className="flex-1">画像を選択した際に、入力欄の上に画像の名前のラベルが出るようになっています。<br />そして、ラベルの上にカーソルを乗せるとプレビューが閲覧できます。<p className="text-red-500">※スマホではクリックした際にみれます</p></p>
                            <p>画像をキャンセルする際は、✕ボタンを押すとキャンセルできます。</p>
                        </div>
                        <Image src="/help/help3.svg" alt="" width={300} height={300}  className="object-contain"></Image>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-10 items-center">
                        <div className="flex flex-col gap-4">
                            <p className="flex-1">送信済みの画像を押していただくと、拡大して確認することができます。</p>
                        </div>
                        <Image src="/help/help4.svg" alt="" width={300} height={300}  className="object-contain"></Image>
                    </div>
                </div>
                <h2 className="font-bold tracking-widest">カレンダーについて</h2>
                <div className="flex flex-col gap-[30px]">
                    <div className="flex flex-col lg:flex-row gap-10 items-center">
                        <div className="flex flex-col gap-4">
                            <p className="flex-1">×や〇が日程に記載されている個所は医師の方からの少なくとも来て頂きたいという日程になっています。</p>
                            <p>それ以外の日程に関しては、豆知識を記載しるので良ければ見てください^_^</p>
                        </div>
                        <Image src="/help/help5.svg" alt="" width={300} height={300}  className="object-contain"></Image>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-10 items-center">
                        <div className="flex flex-col gap-4">
                            <p className="flex-1">左図に関しては、ボタンを押していただくと通院ができるかできないか医師の方への合図になっています。</p>
                            <p className="flex-1">記載している日程に対応するカレンダーの枠を見ていただき〇になっていれば通院する。×になっていれば通院不可となっています。</p>
                            <p className="flex-1 text-red-500">※左図の場合：通院不可</p>

                        </div>
                        <Image src="/help/help6.svg" alt="" width={300} height={300}  className="object-contain"></Image>
                    </div>
                </div>
            </div>
            <div className="fixed w-full h-full z-[999] bg-gray-400 opacity-40 flex flex-col p-5"></div>
        </>
    )
}