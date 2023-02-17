import { bind, Serializable } from "../serialize";
export class MessageBox extends Serializable {
  constructor() {
    super();
  }
  @bind("Id") id?: number;
  @bind('GlobalKey') globalKey: string = '';
  @bind('Name') name: string = '';
}
