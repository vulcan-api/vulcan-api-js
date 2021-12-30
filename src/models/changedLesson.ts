import { bind, Serializable } from "../serialize";
import { DateTime } from "./dateTime";
import { LessonChanges } from "./lessonChanges";
import { LessonRoom } from "./lessonRoom";
import { Subject } from "./subject";
import { Teacher } from "./teacher";
import { TeamClass } from "./teamClass";
import { TeamVirtual } from "./teamVirtual";
import { TimeSlot } from "./timeSlot";

export class ChangedLesson extends Serializable {
  @bind("Id") id?: number;
  @bind("UnitId") unitId?: number;
  @bind("ScheduleId") scheduleId?: number;
  @bind("LessonDate") lessonDate?: DateTime;
  @bind("Note") note?: string;
  @bind("Reason") reason?: string;
  @bind("TimeSlot") time?: TimeSlot;
  @bind("Room") room?: LessonRoom;
  @bind("TeacherPrimary") teacher?: Teacher;
  @bind("TeacherSecondary") secondTeacher?: Teacher;
  @bind("Subject") subject?: Subject;
  @bind("Event") event?: string;
  @bind("Change") change?: LessonChanges;
  @bind("ChangeDate") changeDate?: DateTime;
  @bind("Clazz") class?: TeamClass;
  @bind("Distribution") distribution?: TeamVirtual;
}
