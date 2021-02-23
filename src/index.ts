import {Api} from './api';
import {DATA_LUCKY_NUMBER, DATA_TIMETABLE, DEVICE_REGISTER, STUDENT_LIST} from './endpoints';
import { HebeAccount } from './hebe_interfaces/account';
import { Account } from './interfaces/account';
import {Keystore} from './keystore';
import {uuid,
getBaseUrl,
APP_OS
} from './utils';
import { HebeStudent } from './hebe_interfaces/student';
import { Student } from './interfaces/student';
import { HebePeriod } from './hebe_interfaces/period';
import { Period } from './interfaces/period';
import { FilterType } from './apiHelper';
import { HebeLesson } from './hebe_interfaces/lesson';
import { Lesson } from './interfaces/lesson';
import dateFormat from 'dateformat';
import { HebeLuckyNumber } from './hebe_interfaces/luckyNumber';
import { LuckyNumber } from './interfaces/luckyNumber';

export * from './keystore';

export const registerAccount = async (keystore: Keystore, token: string,
    symbol: string, pin: string
    ) => {
        token = token.toUpperCase();
        symbol = symbol.toLowerCase();

        const body = {
            "OS": APP_OS,
            "DeviceModel": keystore.deviceModel,
            "Certificate": keystore.certificate,
            "CertificateType": "X509",
            "CertificateThumbprint": keystore.fingerprint,
            "PIN": pin,
            "SecurityToken": token,
            "SelfIdentifier": uuid(keystore.fingerprint),
        }

        const baseUrl = await getBaseUrl(token);
        const fullUrl = [baseUrl, symbol, DEVICE_REGISTER].join('/');
        const api = new Api(keystore);
        const response: HebeAccount = await api.post(fullUrl, body);

        return {
            loginId: response.LoginId,
            userLogin: response.UserLogin,
            userName: response.UserName,
            restUrl: response.RestUrl || `${await getBaseUrl(token)}/${symbol}/`
        }
}

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
        const studentsToReturn: Student[] = data.map((item: HebeStudent): Student => {
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
                    secondName: item.Pupil.SecondName
                },
                unit: {
                    id: item.Unit.Id,
                    symbol: item.Unit.Symbol,
                    name: item.Unit.Name,
                    short: item.Unit.Short,
                    displayName: item.Unit.DisplayName,
                    address: item.Unit.Address,
                    restUrl: item.Unit.RestURL
                },
                school: {
                    id: item.ConstituentUnit.Id,
                    name: item.ConstituentUnit.Name,
                    short: item.ConstituentUnit.Short,
                    address: item.ConstituentUnit.Address
                },
                periods: item.Periods.map((item: HebePeriod): Period => {
                    return {
                        id: item.Id,
                        level: item.Level,
                        number: item.Number,
                        current: item.Current,
                        last: item.Last,
                        start: item.Start,
                        end: item.End
                    }
                })
            }
        });
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
        const data: HebeLesson[] = await this.api.helper.getList(DATA_TIMETABLE,
            false,
            undefined,
            dFrom,
            dTo,
            FilterType.BY_PUPIL
        );
        const lessonsToReturn: Lesson[] = data.map((item: HebeLesson): Lesson => {
            return {
                id: item.Id,
                date: item.Date ? {
                    timestamp: item.Date.Timestamp,
                    time: item.Date.Time,
                    date: item.Date.Date
                } : undefined,
                timeSlot: item.TimeSlot ? {
                    id: item.TimeSlot.Id,
                    start: item.TimeSlot.Start,
                    end: item.TimeSlot.End,
                    display: item.TimeSlot.Display,
                    position: item.TimeSlot.Position
                } : undefined,
                room: item.Room ? {
                    id: item.Room.Id,
                    code: item.Room.Code
                } : undefined,
                teacherPrimary: item.TeacherPrimary ? {
                    id: item.TeacherPrimary.Id,
                    displayName: item.TeacherPrimary.DisplayName,
                    name: item.TeacherPrimary.Name,
                    surname: item.TeacherPrimary.Surname
                } : undefined,
                teacherSecondary: item.TeacherSecondary ? {
                    id: item.TeacherSecondary.Id,
                    displayName: item.TeacherSecondary.DisplayName,
                    name: item.TeacherSecondary.Name,
                    surname: item.TeacherSecondary.Surname
                } : undefined,
                subject: item.Subject ? {
                    id: item.Subject.Id,
                    key: item.Subject.Key,
                    code: item.Subject.Kod,
                    name: item.Subject.Name,
                    position: item.Subject.Position
                } : undefined,
                event: item.Event,
                change: item.Change,
                class: item.Clazz ? {
                    id: item.Clazz.Id,
                    displayName: item.Clazz.DisplayName,
                    key: item.Clazz.Key,
                    symbol: item.Clazz.Symbol
                } : undefined,
                pupilAlias: item.PupilAlias,
                distribution: item.Distribution ? {
                    id: item.Distribution.Id,
                    key: item.Distribution.Key,
                    name: item.Distribution.Name,
                    partType: item.Distribution.PartType,
                    shortcut: item.Distribution.Shortcut
                } : undefined,
                visible: item.Visible
            }
        });
        return lessonsToReturn
    }
    public async getLuckyNumber() {
        const data: HebeLuckyNumber = await this.api.helper.getData(DATA_LUCKY_NUMBER, {
            "constituentId": this.api.student.school.id,
            "day": dateFormat(new Date(), "yyyy-mm-dd"),
        })
        const dataToReturn: LuckyNumber = {
            day: data.Day,
            number: data.Number
        }
        return dataToReturn;
    }
}