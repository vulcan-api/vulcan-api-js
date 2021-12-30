import { bind, customBind, Serializable } from "../serialize";
import { Period } from "./period";
import { Pupil } from "./pupil";
import { School } from "./school";
import { Unit } from "./unit";

const bindPeriods = (data: any[]) => {
  return data.map((period: any) => new Period().serialize(period));
};

export class Student extends Serializable {
  @bind("TopLevelPartition") symbol!: string;
  @bind("Partition") symbol_code!: string;
  @bind("Pupil") pupil!: Pupil;
  @bind("Unit") unit!: Unit;
  @bind("ConstituentUnit") school!: School;
  @customBind("Periods", bindPeriods) periods!: Period[];
}
