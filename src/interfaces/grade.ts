import { employee } from './employee';
import { subject } from './subject';
import { gradeCategory } from './gradeCategory';

export interface grade {
    "id": number,
    "content": string,
    "weight": number,
    "description": string,
    "date": string,
    "lastModificationDate": string,
    "value": number,
    "teacher": employee,
    "subject": subject,
    "category": gradeCategory
}