import { bind, Serializable } from "../serialize";

export class TeamClass extends Serializable {
  @bind("Id") id!: number;
  @bind("Key") key!: string;
  @bind("DisplayName") displayName!: string;
  @bind("Symbol") symbol!: string;
}
