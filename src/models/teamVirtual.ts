import { bind, Serializable } from "../serialize";

export class TeamVirtual extends Serializable {
  @bind("Id") id!: number;
  @bind("Key") key!: string;
  @bind("Shortcut") shortcut!: string;
  @bind("Name") name!: string;
  @bind("PartType") partType!: string;
}
