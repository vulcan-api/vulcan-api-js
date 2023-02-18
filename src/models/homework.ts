import { bind, Serializable } from "../serialize";
import { Teacher } from "./teacher";
import { Subject } from "./subject";
import { Attachment } from "./attachment";
export class Homework extends Serializable {
  @bind('Id') id: number = 0;
  @bind('Key') key: string = '';
  @bind('IdHomework') homeworkId: number = 0;
  @bind('Content') content: string = '';
  @bind('DateCreated') dateCreated: Date = new Date();
  @bind('Creator') creator: Teacher = new Teacher();
  @bind('Subject') subject: Subject = new Subject();
  @bind('Attachments') attachments: Attachment[] = [];
  @bind('IsAnswerRequired') isAnswerRequired: Subject = new Subject();
  @bind('Deadline') deadline: Date = new Date();
  @bind('AnswerDeadline') answerDeadline: Date = new Date();
  @bind('AnswerDate') answerDate: Date = new Date();
}
