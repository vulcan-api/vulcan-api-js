import { bind, Serializable } from "../serialize";

export class LessonRoom extends Serializable {
  @bind("Id") id!: number;
  @bind("Code") code!: string;
}
