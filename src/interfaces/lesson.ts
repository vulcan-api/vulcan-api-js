import { DateTime } from "./dateTime";
import { LessonRoom } from "./lessonRoom";
import { Subject } from "./subject";
import { Teacher } from "./teacher";
import { TeamClass } from "./teamClass";
import { TeamVirtual } from "./teamVirtual";
import { TimeSlot } from "./timeSlot";

export interface Lesson {
    id?: number,
    date?: DateTime,
    timeSlot?: TimeSlot,
    room?: LessonRoom,
    teacherPrimary?: Teacher,
    teacherSecondary?: Teacher,
    subject?: Subject,
    event?: string,
    change?: string,
    class?: TeamClass,
    pupilAlias?: string,
    distribution?: TeamVirtual,
    visible?: boolean
}