import { bind, Serializable } from "../serialize";
import { Address } from "./address";
import { Attachment } from "./attachment";

export class Message extends Serializable {
  constructor() {
    super();
  }
  @bind('Id') id: string = '';
  @bind('GlobalKey') globalKey: string = '';
  @bind('ThreadKey') threadKey: string = '';
  @bind('Subject') subject: string = '';
  @bind('Content') content: string = '';
  @bind('DateSent') sentDate: Date = new Date();
  @bind('Status') status: number = 0;
  @bind('Sender') sender: string = '';
  @bind('Receiver') receivers: Address[] = [];
  @bind('Attachments') attachments: Attachment[] = [];
  @bind('DateRead') readDate?: Date = new Date();
}