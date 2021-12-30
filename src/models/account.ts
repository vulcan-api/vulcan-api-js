import { bind, Serializable } from "../serialize";

export class Account extends Serializable {
  @bind("LoginId") loginId!: number;
  @bind("UserLogin") userLogin!: string;
  @bind("UserName") userName!: string;
  @bind("RestUrl") restUrl!: string;
}
