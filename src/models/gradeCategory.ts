import { bind, Serializable } from "../serialize";

export class GradeCategory extends Serializable {
  @bind("Id") id!: string;
  @bind("Name") name!: string;
  @bind("Code") code!: string;
}
