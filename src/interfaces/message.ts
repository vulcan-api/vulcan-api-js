import { vulcanMessageRecipient } from "../vulcan_interfaces/vulcanMessageRecipient";

export interface message {
    "id": number,
    "senderId": number,
    "recipients": Array<vulcanMessageRecipient>,
    "title": string,
    "content": string,
    "sentDate": string,
    "sentTime": string,
    "readDate": string,
    "readTime": string,
    "sender": any
}