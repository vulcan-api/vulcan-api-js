import { bind, Serializable } from "../serialize";

export class Attachment extends Serializable {
  @bind("Name") name!: string;
  @bind("Link") link!: string;
}
