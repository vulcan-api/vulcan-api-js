import { bind, Serializable } from "../serialize";

export class Teacher extends Serializable {
  @bind("Id") id!: number;
  @bind("Name") name!: string;
  @bind("Surname") surname!: string;
  @bind("DisplayName") displayName!: string;
}
