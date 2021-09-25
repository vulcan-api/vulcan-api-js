import { DateTime } from "./dateTime";
import { LessonChanges } from "./lessonChanges";
import { LessonRoom } from "./lessonRoom";
import { Subject } from "./subject";
import { Teacher } from "./teacher";
import { TeamClass } from "./teamClass";
import { TeamVirtual } from "./teamVirtual";
import { TimeSlot } from "./timeSlot";

export interface ChangedLesson {
  id?: number;
  unitId?: number;
  scheduleId?: number;
  lessonDate?: DateTime;
  note?: string;
  reason?: string;
  time?: TimeSlot;
  room?: LessonRoom;
  teacher?: Teacher;
  secondTeacher?: Teacher;
  subject?: Subject;
  event?: string;
  change?: LessonChanges;
  changeDate?: DateTime;
  class?: TeamClass;
  distribution?: TeamVirtual;
}
