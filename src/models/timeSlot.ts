import { bind, Serializable } from "../serialize";

export class TimeSlot extends Serializable {
  @bind("Id") id!: number;
  @bind("Start") start!: string;
  @bind("End") end!: string;
  @bind("Display") display!: string;
  @bind("Position") position!: number;
}
