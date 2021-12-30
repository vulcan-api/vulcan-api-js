import { bind, Serializable } from "../serialize";

export class Subject extends Serializable {
  @bind("Id") id!: number;
  @bind("Key") key!: string;
  @bind("Name") name!: string;
  @bind("Kod") code!: string;
  @bind("Position") position!: number;
}
