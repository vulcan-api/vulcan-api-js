import { HebeGradeCategory } from "./gradeCategory";
import { HebePeriod } from "./period";
import { HebeSubject } from "./subject";

export interface HebeGradeColumn {
  Id: number;
  Key: string;
  PeriodId: number;
  Name: string;
  Code: string;
  Group: string;
  Number: number;
  Weight: number;
  Subject: HebeSubject;
  Category?: HebeGradeCategory;
  Period?: HebePeriod;
}
