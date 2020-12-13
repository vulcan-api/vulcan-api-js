export interface exam {
    "id": number,
    "type": "EXAM" | "SHORT_TEST" | "CLASS_TEST",
    "description": string,
    "date": string,
    "teacher": any,
    "subject": any
}