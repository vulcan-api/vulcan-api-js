import { bind, Serializable } from "../serialize";

export class Unit extends Serializable {
  @bind("Id") id!: number;
  @bind("Symbol") symbol!: string;
  @bind("Name") name!: string;
  @bind("Short") short!: string;
  @bind("DisplayName") displayName!: string;
  @bind("Address") address!: string;
  @bind("RestURL") restUrl!: string;
}
