import {bind, Serializable} from "../serialize";
import {DateTime} from "./dateTime";
import {Teacher} from "./teacher";
import {Subject} from "./subject";

export class Exam extends Serializable {
    @bind("Id") id: number = 0;
    @bind("Key") key: string = '';
    @bind("Type") type: string = '';
    @bind("Content") topic: string = '';
    @bind("DateCreated") dateCreated: DateTime = new DateTime();
    @bind("DateModify") dateModified: DateTime = new DateTime();
    @bind("Deadline") deadline: DateTime = new DateTime();
    @bind("Creator") creator: Teacher = new Teacher();
    @bind("Subject") subject: Subject = new Subject();
    @bind("PupilId") pupilId: number = 0;
}