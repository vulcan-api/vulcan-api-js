import { subject } from './subject';
import { employee } from './employee';
import { lessonTime } from './lessonTime';

export interface lesson {
    "number": number,
    "room": string,
    "group": string | null,
    "date": string,
    "time": lessonTime,
    "teacher": employee,
    "subject": subject
}