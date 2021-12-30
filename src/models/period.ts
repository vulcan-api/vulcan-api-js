import { bind, Serializable } from "../serialize";

export class Period extends Serializable {
  @bind("Id") id!: number;
  @bind("Level") level!: number;
  @bind("Number") number!: number;
  @bind("Current") current!: boolean;
  @bind("Last") last!: boolean;
  @bind("Start") start!: any;
  @bind("End") end!: any;
}
