export interface ChatProps {
    msg: string;
    sender: number;
    type: number;
}

export interface UserDataProps {
    firstName: string,
    lastName: string,
    age: number
}

export interface Medicine {
    name: string;
    description: string;
    count: number;
    day: number;
    type?:number;
}

export interface historyMedicineProps {
    name: string;
    start: string;
    end: string;
    medicine: {
        name: string;
        description: string;
        count: number;
        day: number;
        type: number;
    }[];
}

export interface Today {
    prevYear: number,
    prevMonth: number,
    year: number,
    month: number,
    nextYear: number,
    nextMonth: number,
}

export interface Trivia {
    title: string;
    description: string;
}

export interface ChatProps {
    msg: string;
    sender: number;
    type: number;
}

export interface MessageProps {
    type: number;
    msg: string;
    sender: string;
}

export interface PreviewProps {
    imageData: string;
}

export interface MsgObj {
    message: string,
    imgArray: string
    chooseImg: string
}