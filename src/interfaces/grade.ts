import { DateTime } from "./dateTime";
import { GradeColumn } from "./gradeColumn";
import { Teacher } from "./teacher";

export interface Grade {
  id: number;
  key: string;
  pupilId: number;
  contentRaw: string;
  content: string;
  dateCreated: DateTime;
  dateModify: DateTime;
  creator: Teacher;
  modifier: Teacher;
  column: GradeColumn;
  value?: number;
  comment?: string;
  numerator?: number;
  denominator?: number;
}
