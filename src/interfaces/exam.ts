import { subject } from './subject';
import { employee } from './employee';

export interface exam {
    "id": number,
    "type": "EXAM" | "SHORT_TEST" | "CLASS_TEST",
    "description": string,
    "date": string,
    "teacher": employee,
    "subject": subject
}