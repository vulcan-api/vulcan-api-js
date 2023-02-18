import { bind, Serializable } from "../serialize";

export class Address extends Serializable {
  @bind('GlobalKey') globalKey: string = '';
  @bind('Name') name: string = '';
  @bind('HasRead') hasRead?: string;
}