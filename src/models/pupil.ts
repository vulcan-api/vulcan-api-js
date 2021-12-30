import { bind, Serializable } from "../serialize";

export class Pupil extends Serializable {
  @bind("Id") id!: number;
  @bind("LoginId") loginId!: number;
  @bind("LoginValue") loginValue!: string;
  @bind("FirstName") firstName!: string;
  @bind("Surname") surname!: string;
  @bind("Sex") sex!: boolean;
  @bind("SecondName") secondName?: string;
}
