import { subject } from './subject';
import { employee } from './employee';

export interface homework {
    "id": number,
    "description": string,
    "date": string,
    "teacher": employee,
    "subject": subject
}