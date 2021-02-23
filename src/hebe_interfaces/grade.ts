import { HebeDateTime } from "./dateTime";
import { HebeGradeColumn } from "./gradeColumn";
import { HebeTeacher } from "./teacher";

export interface HebeGrade {
    Id: number,
    Key: string,
    PupilId: number,
    ContentRaw: string,
    Content: string,
    DateCreated: HebeDateTime,
    DateModify: HebeDateTime,
    Creator: HebeTeacher,
    Modifier: HebeTeacher,
    Column: HebeGradeColumn,
    Value?: number,
    Comment?: string,
    Numerator? : number,
    Denominator?: number
}