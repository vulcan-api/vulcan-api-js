import { bind, customBind, Serializable } from "../serialize";
import { DateTime } from "./dateTime";
import { GradeColumn } from "./gradeColumn";
import { Period } from "./period";
import { Teacher } from "./teacher";

export class Grade extends Serializable {
  readonly periodBinder: (data: any) => Period;
  constructor(getPeriodById: (periodId: number) => Period) {
    super();
    this.periodBinder = getPeriodById;
  }

  @bind("Id") id!: number;
  @bind("Key") key!: string;
  @bind("PupilId") pupilId!: number;
  @bind("ContentRaw") contentRaw!: string;
  @bind("Content") content!: string;
  @bind("DateCreated") dateCreated!: DateTime;
  @bind("DateModify") dateModify!: DateTime;
  @bind("Creator") creator!: Teacher;
  @bind("Modifier") modifier!: Teacher;
  @customBind("Column", (data: any, thisPass: any) =>
    new GradeColumn(thisPass.periodBinder).serialize(data)
  )
  column!: GradeColumn;
  @bind("Value") value?: number;
  @bind("Comment") comment?: string;
  @bind("Numerator") numerator?: number;
  @bind("Denominator") denominator?: number;
}
