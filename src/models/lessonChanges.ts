import { bind, Serializable } from "../serialize";

export class LessonChanges extends Serializable {
  @bind("Id") id!: number;
  @bind("Type") type!: number;
  @bind("Separation") separation!: boolean;
}
