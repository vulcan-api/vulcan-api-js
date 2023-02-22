import { bind, Serializable } from "../serialize";
import { Subject } from "./subject";
import { Teacher } from "./teacher";
import { TeamClass } from "./teamClass";
import { DateTime } from "./dateTime";
import { TimeSlot } from "./timeSlot";
import { PresenceType } from "./presenceType";
import { TeamVirtual } from "./teamVirtual";

export class Attendance extends Serializable {
  @bind('LessonId') lessonId: number = 0;
  @bind('Id') id: number = 0;
  @bind('LessonNumber') lessonNumber: number = 0;
  @bind('GlobalKey') globalKey: string = '';
  @bind('LessonClassId') lessonClassId: number = 0;
  @bind('LessonClassGlobalKey') lessonClassGlobalKey: string = '';
  @bind('CalculatePresence') calculcatePresence: boolean = false;
  @bind('Replacement') replacement: boolean = false;
  @bind('Subject') subject: Subject = new Subject();
  @bind('Topic') topic: string = '';
  @bind('TeacherPrimary') teacher: Teacher = new Teacher();
  @bind('TeacherSecondary') secondTeacher?: Teacher = new Teacher();
  @bind('TeacherMod') mainTeacher?: Teacher = new Teacher();
  @bind('Clazz') teamClass?: TeamClass = new TeamClass();
  @bind('GroupDefinition') classAlias?: string = '';
  @bind('Day') date: DateTime = new DateTime();
  @bind('TimeSlot') time?: TimeSlot = new TimeSlot();
  @bind('DateModify') dateModified?: DateTime = new DateTime();
  @bind('AuxPresenceId') auxPresenceId?: number = 0;
  @bind('JustificationStatus') justificationStatus?: string = '';
  @bind('PresenceType') presenceType?: PresenceType;
  @bind('Note') note?: string;
  @bind('PublicResources') publicResources?: string;
  @bind('RemoteResources') remoteResources?: string;
  @bind('Distribution') group?: TeamVirtual;
  @bind('Visible') visible?: boolean;
}