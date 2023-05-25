export interface DiaryEntry {
    id: number;
    date: string;
    weather: string;
    visibility: string;
    comment: string;
}

export interface NewDiaryEntry {
    date: string;
    weather: string;
    visibility: string;
    comment: string;
}
