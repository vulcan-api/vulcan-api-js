export interface Pupil {
    id: number,
    loginId: number,
    loginValue: string,
    firstName: string,
    surname: string,
    sex: "male" | "female",
    secondName?: string
}