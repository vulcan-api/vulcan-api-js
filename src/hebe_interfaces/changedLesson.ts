import { HebeDateTime } from "./dateTime";
import { HebeLessonChanges } from "./lessonChanges";
import { HebeLessonRoom } from "./lessonRoom";
import { HebeSubject } from "./subject";
import { HebeTeacher } from "./teacher";
import { HebeTeamClass } from "./teamClass";
import { HebeTeamVirtual } from "./teamVirtual";
import { HebeTimeSlot } from "./timeSlot";

export interface HebeChangedLesson {
  Id?: number;
  UnitId?: number;
  ScheduleId?: number;
  LessonDate?: HebeDateTime;
  Note?: string;
  Reason?: string;
  TimeSlot?: HebeTimeSlot;
  Room?: HebeLessonRoom;
  TeacherPrimary?: HebeTeacher;
  TeacherSecondary?: HebeTeacher;
  Subject?: HebeSubject;
  Event?: string;
  Change?: HebeLessonChanges;
  ChangeDate?: HebeDateTime;
  Clazz?: HebeTeamClass;
  Distribution?: HebeTeamVirtual;
}
