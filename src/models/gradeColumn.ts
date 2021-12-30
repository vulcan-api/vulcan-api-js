import { bind, customBind, Serializable } from "../serialize";
import { GradeCategory } from "./gradeCategory";
import { Period } from "./period";
import { Subject } from "./subject";

export class GradeColumn extends Serializable {
  readonly periodBinder: (data: any) => Period;
  constructor(getPeriodById: (periodId: number) => Period) {
    super();
    this.periodBinder = getPeriodById;
  }

  @bind("Id") id!: number;
  @bind("Key") key!: string;
  @bind("PeriodId") periodId!: number;
  @bind("Name") name!: string;
  @bind("Code") code!: string;
  @bind("Group") group!: string;
  @bind("Number") number!: number;
  @bind("Weight") weight!: number;
  @bind("Subject") subject!: Subject;
  @bind("Category") category?: GradeCategory;
  @customBind("PeriodId", (data: any, thisPass: any) => {
    return thisPass.periodBinder(data);
  })
  period?: Period;
}
