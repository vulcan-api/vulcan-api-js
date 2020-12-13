import { subject } from './subject';
import { employee } from './employee';
import { lessonTime } from './lessonTime';

export interface lesson {
    "number": number,
    "room": string,
    "group": string | null,
    "date": string,
    "time": lessonTime,
    "changeAnnotation": string,
    "lineThrough": boolean,
    "bold": boolean,
    "teacher": employee,
    "subject": subject
}