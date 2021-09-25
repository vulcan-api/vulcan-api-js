import { Api } from "./api";
import {
  DATA_GRADE,
  DATA_LUCKY_NUMBER,
  DATA_TIMETABLE,
  DATA_TIMETABLE_CHANGES,
  DEVICE_REGISTER,
  STUDENT_LIST,
} from "./endpoints";
import { HebeAccount } from "./hebe_interfaces/account";
import { Account } from "./interfaces/account";
import { Keystore } from "./keystore";
import { uuid, getBaseUrl, APP_OS } from "./utils";
import { HebeStudent } from "./hebe_interfaces/student";
import { Student } from "./interfaces/student";
import { HebePeriod } from "./hebe_interfaces/period";
import { Period } from "./interfaces/period";
import { FilterType } from "./apiHelper";
import { HebeLesson } from "./hebe_interfaces/lesson";
import { Lesson } from "./interfaces/lesson";
import dateFormat from "dateformat";
import { HebeLuckyNumber } from "./hebe_interfaces/luckyNumber";
import { LuckyNumber } from "./interfaces/luckyNumber";
import { HebeGrade } from "./hebe_interfaces/grade";
import { Grade } from "./interfaces/grade";
import { ChangedLesson } from "./interfaces/changedLesson";
import { HebeChangedLesson } from "./hebe_interfaces/changedLesson";

export * from "./keystore";

export const registerAccount = async (
  keystore: Keystore,
  token: string,
  symbol: string,
  pin: string
) => {
  token = token.toUpperCase();
  symbol = symbol.toLowerCase();

  const body = {
    OS: APP_OS,
    DeviceModel: keystore.deviceModel,
    Certificate: keystore.certificate,
    CertificateType: "X509",
    CertificateThumbprint: keystore.fingerprint,
    PIN: pin,
    SecurityToken: token,
    SelfIdentifier: uuid(keystore.fingerprint),
  };

  const baseUrl = await getBaseUrl(token);
  const fullUrl = [baseUrl, symbol, DEVICE_REGISTER].join("/");
  const api = new Api(keystore);
  const response: HebeAccount = await api.post(fullUrl, body);

  return {
    loginId: response.LoginId,
    userLogin: response.UserLogin,
    userName: response.UserName,
    restUrl: response.RestUrl || `${await getBaseUrl(token)}/${symbol}/`,
  };
};

export class VulcanHebe {
  private readonly account: Account;
  private readonly api: Api;
  private student?: Student;
  constructor(keystore: Keystore, account: Account) {
    this.account = account;
    this.api = new Api(keystore, this.account);
  }

  public async getStudents() {
    const data: HebeStudent[] = await this.api.get(STUDENT_LIST);
    const studentsToReturn: Student[] = data.map(
      (item: HebeStudent): Student => {
        return {
          symbol: item.TopLevelPartition,
          symbol_code: item.Partition,
          pupil: {
            id: item.Pupil.Id,
            loginId: item.Pupil.LoginId,
            loginValue: item.Pupil.LoginValue,
            firstName: item.Pupil.FirstName,
            surname: item.Pupil.Surname,
            sex: item.Pupil.Sex ? "male" : "female",
            secondName: item.Pupil.SecondName,
          },
          unit: {
            id: item.Unit.Id,
            symbol: item.Unit.Symbol,
            name: item.Unit.Name,
            short: item.Unit.Short,
            displayName: item.Unit.DisplayName,
            address: item.Unit.Address,
            restUrl: item.Unit.RestURL,
          },
          school: {
            id: item.ConstituentUnit.Id,
            name: item.ConstituentUnit.Name,
            short: item.ConstituentUnit.Short,
            address: item.ConstituentUnit.Address,
          },
          periods: item.Periods.map((item: HebePeriod): Period => {
            return {
              id: item.Id,
              level: item.Level,
              number: item.Number,
              current: item.Current,
              last: item.Last,
              start: item.Start,
              end: item.End,
            };
          }),
        };
      }
    );
    return studentsToReturn;
  }

  public async selectStudent(studentToSet?: Student) {
    if (studentToSet) {
      this.student = studentToSet;
      this.api.setStudent(studentToSet);
    } else {
      const students = await this.getStudents();
      if (students.length === 0) {
        throw new Error("Student not found!");
      } else {
        this.student = students[0];
        this.api.setStudent(students[0]);
      }
    }
  }

  public async getLessons(dateFrom?: Date, dateTo?: Date) {
    const dFrom = dateFrom ? dateFrom : new Date();
    const dTo = dateTo ? dateTo : new Date();
    const data: HebeLesson[] = await this.api.helper.getList(
      DATA_TIMETABLE,
      false,
      undefined,
      dFrom,
      dTo,
      FilterType.BY_PUPIL
    );
    const lessonsToReturn: Lesson[] = data.map((item: HebeLesson): Lesson => {
      return {
        id: item.Id,
        date: item.Date
          ? {
              timestamp: item.Date.Timestamp,
              time: item.Date.Time,
              date: item.Date.Date,
            }
          : undefined,
        timeSlot: item.TimeSlot
          ? {
              id: item.TimeSlot.Id,
              start: item.TimeSlot.Start,
              end: item.TimeSlot.End,
              display: item.TimeSlot.Display,
              position: item.TimeSlot.Position,
            }
          : undefined,
        room: item.Room
          ? {
              id: item.Room.Id,
              code: item.Room.Code,
            }
          : undefined,
        teacherPrimary: item.TeacherPrimary
          ? {
              id: item.TeacherPrimary.Id,
              displayName: item.TeacherPrimary.DisplayName,
              name: item.TeacherPrimary.Name,
              surname: item.TeacherPrimary.Surname,
            }
          : undefined,
        teacherSecondary: item.TeacherSecondary
          ? {
              id: item.TeacherSecondary.Id,
              displayName: item.TeacherSecondary.DisplayName,
              name: item.TeacherSecondary.Name,
              surname: item.TeacherSecondary.Surname,
            }
          : undefined,
        subject: item.Subject
          ? {
              id: item.Subject.Id,
              key: item.Subject.Key,
              code: item.Subject.Kod,
              name: item.Subject.Name,
              position: item.Subject.Position,
            }
          : undefined,
        event: item.Event,
        change: item.Change
          ? {
              id: item.Change?.Id,
              type: item.Change?.Type,
              separation: item.Change?.Separation,
            }
          : undefined,
        class: item.Clazz
          ? {
              id: item.Clazz.Id,
              displayName: item.Clazz.DisplayName,
              key: item.Clazz.Key,
              symbol: item.Clazz.Symbol,
            }
          : undefined,
        pupilAlias: item.PupilAlias,
        distribution: item.Distribution
          ? {
              id: item.Distribution.Id,
              key: item.Distribution.Key,
              name: item.Distribution.Name,
              partType: item.Distribution.PartType,
              shortcut: item.Distribution.Shortcut,
            }
          : undefined,
        visible: item.Visible,
      };
    });
    return lessonsToReturn;
  }

  public async getChangedLessons(dateFrom?: Date, dateTo?: Date) {
    const dFrom = dateFrom ? dateFrom : new Date();
    const dTo = dateTo ? dateTo : new Date();
    const data: HebeLesson[] = await this.api.helper.getList(
      DATA_TIMETABLE_CHANGES,
      false,
      undefined,
      dFrom,
      dTo,
      FilterType.BY_PUPIL
    );
    const lessonsToReturn: ChangedLesson[] = data.map(
      (item: HebeChangedLesson): ChangedLesson => {
        return {
          id: item.Id,
          unitId: item.UnitId,
          scheduleId: item.ScheduleId,
          lessonDate: item.LessonDate
            ? {
                timestamp: item.LessonDate.Timestamp,
                time: item.LessonDate.Time,
                date: item.LessonDate.Date,
              }
            : undefined,
          note: item.Note,
          reason: item.Reason,
          time: item.TimeSlot
            ? {
                id: item.TimeSlot.Id,
                start: item.TimeSlot.Start,
                end: item.TimeSlot.End,
                display: item.TimeSlot.Display,
                position: item.TimeSlot.Position,
              }
            : undefined,
          room: item.Room
            ? {
                id: item.Room.Id,
                code: item.Room.Code,
              }
            : undefined,
          teacher: item.TeacherPrimary
            ? {
                id: item.TeacherPrimary.Id,
                name: item.TeacherPrimary.Name,
                surname: item.TeacherPrimary.Surname,
                displayName: item.TeacherPrimary.DisplayName,
              }
            : undefined,
          secondTeacher: item.TeacherSecondary
            ? {
                id: item.TeacherSecondary.Id,
                name: item.TeacherSecondary.Name,
                surname: item.TeacherSecondary.Surname,
                displayName: item.TeacherSecondary.DisplayName,
              }
            : undefined,
          subject: item.Subject
            ? {
                id: item.Subject.Id,
                key: item.Subject.Key,
                name: item.Subject.Name,
                position: item.Subject.Position,
                code: item.Subject.Kod,
              }
            : undefined,
          event: item.Event,
          change: item.Change
            ? {
                id: item.Change.Id,
                separation: item.Change.Separation,
                type: item.Change.Type,
              }
            : undefined,
          changeDate: item.ChangeDate
            ? {
                timestamp: item.ChangeDate.Timestamp,
                date: item.ChangeDate.Date,
                time: item.ChangeDate.Time,
              }
            : undefined,
          class: item.Clazz
            ? {
                id: item.Clazz.Id,
                key: item.Clazz.Key,
                displayName: item.Clazz.DisplayName,
                symbol: item.Clazz.Symbol,
              }
            : undefined,
          distribution: item.Distribution
            ? {
                id: item.Distribution.Id,
                key: item.Distribution.Key,
                name: item.Distribution.Name,
                partType: item.Distribution.PartType,
                shortcut: item.Distribution.Shortcut,
              }
            : undefined,
        };
      }
    );
    return lessonsToReturn;
  }

  public async getLuckyNumber() {
    const data: HebeLuckyNumber = await this.api.helper.getData(
      DATA_LUCKY_NUMBER,
      {
        constituentId: this.api.student.school.id,
        day: dateFormat(new Date(), "yyyy-mm-dd"),
      }
    );
    const dataToReturn: LuckyNumber = {
      day: data.Day,
      number: data.Number,
    };
    return dataToReturn;
  }

  private async getPeriodById(periodId: number) {
    if (!this.student) {
      throw Error("Student was undefined!");
    }
    const arr = this.student.periods.filter((period) => {
      return period.id === periodId;
    });
    return arr?.length === 0 ? undefined : arr[0];
  }

  public async getGrades(lastSync: Date) {
    const data: HebeGrade[] = await this.api.helper.getList(
      DATA_GRADE,
      false,
      lastSync,
      undefined,
      undefined,
      FilterType.BY_PUPIL
    );
    const dataToReturn: Grade[] = await Promise.all(
      data.map(async (grade) => {
        return {
          id: grade.Id,
          key: grade.Key,
          pupilId: grade.PupilId,
          contentRaw: grade.ContentRaw,
          content: grade.Content,
          dateCreated: {
            timestamp: grade.DateCreated.Timestamp,
            date: grade.DateCreated.Date,
            time: grade.DateCreated.Time,
          },
          dateModify: {
            timestamp: grade.DateModify.Timestamp,
            date: grade.DateModify.Date,
            time: grade.DateModify.Time,
          },
          creator: {
            id: grade.Creator.Id,
            name: grade.Creator.Name,
            surname: grade.Creator.Surname,
            displayName: grade.Creator.DisplayName,
          },
          modifier: {
            id: grade.Modifier.Id,
            name: grade.Modifier.Name,
            surname: grade.Modifier.Surname,
            displayName: grade.Modifier.DisplayName,
          },
          column: {
            id: grade.Column.Id,
            key: grade.Column.Key,
            periodId: grade.Column.PeriodId,
            name: grade.Column.Name,
            code: grade.Column.Code,
            group: grade.Column.Group,
            number: grade.Column.Number,
            weight: grade.Column.Weight,
            subject: {
              id: grade.Column.Subject.Id,
              key: grade.Column.Subject.Key,
              code: grade.Column.Subject.Kod,
              position: grade.Column.Subject.Position,
              name: grade.Column.Subject.Name,
            },
            category: grade.Column.Category
              ? {
                  id: grade.Column.Category.Id,
                  name: grade.Column.Category.Name,
                  code: grade.Column.Category.Code,
                }
              : undefined,
            period: await this.getPeriodById(grade.Column.PeriodId),
          },
          value: grade.Value,
          comment: grade.Comment,
          numerator: grade.Numerator,
          denominator: grade.Denominator,
        };
      })
    );
    return dataToReturn;
  }
}
