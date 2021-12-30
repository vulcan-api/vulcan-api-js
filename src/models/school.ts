import { bind, Serializable } from "../serialize";

export class School extends Serializable {
  @bind("Id") id!: number;
  @bind("Name") name!: string;
  @bind("Short") short!: string;
  @bind("Address") address!: string;
}
