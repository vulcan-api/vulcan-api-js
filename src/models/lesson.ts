import { bind, Serializable } from "../serialize";
import { DateTime } from "./dateTime";
import { LessonChanges } from "./lessonChanges";
import { LessonRoom } from "./lessonRoom";
import { Subject } from "./subject";
import { Teacher } from "./teacher";
import { TeamClass } from "./teamClass";
import { TeamVirtual } from "./teamVirtual";
import { TimeSlot } from "./timeSlot";

export class Lesson extends Serializable {
  @bind("Id") id?: number;
  @bind("Date") date?: DateTime;
  @bind("TimeSlot") timeSlot?: TimeSlot;
  @bind("Room") room?: LessonRoom;
  @bind("TeacherPrimary") teacherPrimary?: Teacher;
  @bind("TeacherSecondary") teacherSecondary?: Teacher;
  @bind("Subject") subject?: Subject;
  @bind("Event") event?: string;
  @bind("Change") change?: LessonChanges;
  @bind("Clazz") class?: TeamClass;
  @bind("PupilAlias") pupilAlias?: string;
  @bind("Distribution") distribution?: TeamVirtual;
  @bind("Visible") visible?: boolean;
}
