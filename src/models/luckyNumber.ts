import { bind, Serializable } from "../serialize";

export class LuckyNumber extends Serializable {
  @bind("Day") day!: string;
  @bind("Number") number!: string;
}
