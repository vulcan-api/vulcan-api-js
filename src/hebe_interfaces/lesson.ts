import { HebeDateTime } from "./dateTime";
import { HebeLessonRoom } from "./lessonRoom";
import { HebeSubject } from "./subject";
import { HebeTeacher } from "./teacher";
import { HebeTeamClass } from "./teamClass";
import { HebeTeamVirtual } from "./teamVirtual";
import { HebeTimeSlot } from "./timeSlot";

export interface HebeLesson {
  Id?: number;
  Date?: HebeDateTime;
  TimeSlot?: HebeTimeSlot;
  Room?: HebeLessonRoom;
  TeacherPrimary?: HebeTeacher;
  TeacherSecondary?: HebeTeacher;
  Subject?: HebeSubject;
  Event?: string;
  Change?: string;
  Clazz?: HebeTeamClass;
  PupilAlias?: string;
  Distribution?: HebeTeamVirtual;
  Visible?: boolean;
}
