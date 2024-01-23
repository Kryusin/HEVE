'use server'

export default async function getMonth({ year, month }: { year: number, month: number }) {
    // はじめの曜日取得
    var dayOfWeek = new Date(year, month, 1).getDay();

    // 月の日数を取得
    const daysOfMonth = new Date(year, month + 1, 0).getDate();
    var week = Math.floor(daysOfMonth / 7);
    const remainder = daysOfMonth % 7;

    if (remainder != 0) {
        if (6 - dayOfWeek < remainder) {
            week += 2;
        } else {
            week += 1;
        }
    }

    // 二次元配列を作成
    const Arr: Array<string> = [];
    // startflagを設定
    var numFlag = 0;
    // 配列の整頓
    for (let i = 1; i <= daysOfMonth; i++) {
        // numFlagとdayOfWeekが等しくなるまで""を代入
        while (numFlag != dayOfWeek) {
            Arr.push("");
            numFlag++;
        }
        // 日にちを代入
        Arr.push(`${i}`);
    }

    // 7の倍数になるように末尾に""を追加
    if (Arr.length % 7) {
        const rem = Arr.length % 7;
        for (var i = rem; i < 7; i++) {
            Arr.push("");
        }
    }

    // 7日間ごとにsliceする
    var start = 0;
    const result: Array<string>[] = [];
    for (var i = 0; i < week; i++) {
        result.push(Arr.slice(start, start + 7))
        start += 7;
    }

    return result;
}