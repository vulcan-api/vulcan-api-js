import { GradeCategory } from "./gradeCategory";
import { Period } from "./period";
import { Subject } from "./subject";

export interface GradeColumn {
    id: number,
    key: string,
    periodId: number,
    name: string,
    code: string,
    group: string,
    number: number,
    weight: number,
    subject: Subject,
    category?: GradeCategory,
    period?: Period
}