import { gradeCategory } from './interfaces/gradeCategory';
import { vulcanGradeCategory } from './vulcan_interfaces/vulcanGradeCategory';
import { vulcanSubject } from './vulcan_interfaces/vulcanSubject';
import { vulcanLessonTime } from './vulcan_interfaces/vulcanLessonTime';
import { vulcanDictionaries } from './vulcan_interfaces/vulcanDictionaries';
import { message } from './interfaces/message';
import { vulcanMessageRecipient } from './vulcan_interfaces/vulcanMessageRecipient';
import { vulcanHomework } from './vulcan_interfaces/vulcanHomework';
import { vulcanExam } from './vulcan_interfaces/vulcanExam';
import { vulcanLesson } from './vulcan_interfaces/vulcanLesson';
import { vulcanGrade } from './vulcan_interfaces/vulcanGrade';
import { grade } from './interfaces/grade';
import { vulcanStudent } from './vulcan_interfaces/vulcanStudent';
import { cert } from './vulcan_interfaces/cert';
import {
    APP_VERSION,
    APP_NAME,
    signature,
    now,
    uuid
} from './utils.js';
import axios from 'axios';
import { lesson } from './interfaces/lesson';
import { exam } from './interfaces/exam';
import { homework } from './interfaces/homework';
import { vulcanMessage } from './vulcan_interfaces/vulcanMessage';
import { lessonTime } from './interfaces/lessonTime';
import { vulcanEmployee } from './vulcan_interfaces/vulcanEmployee';
import { employee } from './interfaces/employee';
import { subject } from './interfaces/subject';

export class Api{
    private cert: cert;
    private baseUrl: string;
    private fullUrl: undefined | string;
    private student: undefined | vulcanStudent;
    private dictionaries: undefined | vulcanDictionaries; // Any should be replaced
    constructor(cert: cert){
        this.cert = cert;
        this.baseUrl = cert["AdresBazowyRestApi"] + "mobile-api/Uczen.v3.";
        this.fullUrl = undefined;
        this.student = undefined;
        this.dictionaries = undefined;
    }
    payload(json: any = undefined){
        let payload: any = {
            "RemoteMobileTimeKey": now() + 1,
            "TimeKey": now(),
            "RequestId": uuid(),
            "RemoteMobileAppVersion": APP_VERSION,
            "RemoteMobileAppName": APP_NAME,
        }

        if (this.student !== undefined){
            payload["IdOkresKlasyfikacyjny"] = this.student["IdOkresKlasyfikacyjny"];
            payload["IdUczen"] = this.student["Id"];
            payload["IdOddzial"] = this.student["IdOddzial"];
            payload["LoginId"] = this.student["UzytkownikLoginId"];
        }
        if (json !== undefined){
            return {...payload, ...json};
        } else {
            return payload;
        }

    }
    async headers(json: object){
        return {
            "User-Agent": "MobileUserAgent",
            RequestCertificateKey: this.cert["CertyfikatKlucz"],
            Connection: "close",
            RequestSignatureValue: await signature(this.cert["CertyfikatPfx"], JSON.stringify(json)),
            'Content-Type': 'application/json; charset=UTF-8',
        }
    }
    async request(method: "get" | "post", endpoint: string, json: any = undefined){
        let reqPayload = this.payload(json);
        let reqHeaders = await this.headers(reqPayload);
        const url = endpoint.startsWith("http") ? endpoint : this.fullUrl + endpoint;
        const r = await axios({
            method: method,
            url: url,
            data: reqPayload,
            headers: reqHeaders
        });
        return r.data;
    }
    get(endpoint: string, json: any = undefined){
        return this.request("get", endpoint, json);
    }
    post(endpoint: string, json: any = undefined){
        return this.request("post", endpoint, json);
    }

    // Student

    async getStudents() {
        try {
            const jsonData = await this.post(this.baseUrl + "UczenStart/ListaUczniow");
            let studentsArrayToReturn: Array<vulcanStudent> = [];
            jsonData.Data.forEach((student: vulcanStudent) => {
                studentsArrayToReturn.push(student);
            });
            return studentsArrayToReturn;
        } catch (e) {
            throw Error("Failed fetching students!");
        }
    }

    async setStudent(student: vulcanStudent){
        this.student = student;
        this.fullUrl = this.cert["AdresBazowyRestApi"] + student["JednostkaSprawozdawczaSymbol"] + "/mobile-api/Uczen.v3.";
        try {
            const jsonData = await this.post("Uczen/Slowniki");
            this.dictionaries = jsonData.Data;
        } catch (e) {
            this.student = undefined;
            this.fullUrl = undefined;
            throw "Failed setting student!";
        }
    }

    // Dictionaries

    getLessonTimeFromDict(lessonTimeId: number) {
        if (!this.dictionaries) {throw Error("You must set the student first!")}
        let objToReturn: lessonTime | null = null;
        this.dictionaries["PoryLekcji"].map((item: vulcanLessonTime) => {
            if (item.Id === lessonTimeId){
                objToReturn = {
                    "id": item["Id"],
                    "number": item["Numer"],
                    "from": item["PoczatekTekst"],
                    "to": item["KoniecTekst"]
                }
            }
        });
        return objToReturn;
    }

    getTeacherFromDict(teacherId: number) {
        if (!this.dictionaries) {throw Error("You must set the student first!")}
        let objToReturn: employee | null = null;
        this.dictionaries["Pracownicy"].map((item: vulcanEmployee) => {
            if (item.Id === teacherId){
                objToReturn = {
                    "id": item["Id"],
                    "firstName": item["Imie"],
                    "lastName": item["Nazwisko"],
                    "short": item["Kod"],
                    "loginId": item["LoginId"]
                }
            }
        });
        return objToReturn;
    }

    getTeacherByLoginIdFromDict(teacherLoginId: number) {
        if (!this.dictionaries) {throw Error("You must set the student first!")}
        let objToReturn: employee | null = null;
        this.dictionaries["Pracownicy"].map((item: vulcanEmployee)=> {
            if (item.LoginId === teacherLoginId){
                objToReturn = {
                    "id": item["Id"],
                    "firstName": item["Imie"],
                    "lastName": item["Nazwisko"],
                    "short": item["Kod"],
                    "loginId": item["LoginId"]
                }
            }
        });
        return objToReturn;
    }

    getSubjectFromDict(subjectId: number) {
        if (!this.dictionaries) {throw Error("You must set the student first!")}
        let objToReturn: subject | null = null;
        this.dictionaries["Przedmioty"].map((item: vulcanSubject) => {
            if (item.Id === subjectId){
                objToReturn = {
                    "id": item["Id"],
                    "name": item["Nazwa"],
                    "short": item["Kod"],
                    "postion": item["Pozycja"]
                }
            }
        });
        return objToReturn;
    }

    getGradeCategoryFromDict(gradeCategoryId: number) {
        if (!this.dictionaries) {throw Error("You must set the student first!")}
        let objToReturn: gradeCategory | null = null;
        this.dictionaries["KategorieOcen"].map((item: vulcanGradeCategory) => {
            if (item.Id === gradeCategoryId){
                objToReturn = {
                    "id": item["Id"],
                    "name": item["Nazwa"],
                    "short": item["Kod"]
                }
            }
        });
        return objToReturn;
    }

    // Grades
    async getGrades(){
        try {
            const jsonData = await this.post("Uczen/Oceny");
            let gradesToReturn: Array<grade> = jsonData.Data.map((item: vulcanGrade) => {
                return{
                    "id": item["Id"],
                    "content": item["Wpis"],
                    "weight": item["WagaOceny"],
                    "description": item["Opis"],
                    "date": item["DataUtworzeniaTekst"],
                    "lastModificationDate": item["DataModyfikacjiTekst"],
                    "value": item["Wartosc"],
                    "teacher": this.getTeacherFromDict(item["IdPracownikD"]),
                    "subject": this.getSubjectFromDict(item["IdPrzedmiot"]),
                    "category": this.getGradeCategoryFromDict(item["IdKategoria"])
                };
            });
            return gradesToReturn;
        } catch (e) {
            throw "Failed fetching grades!";
        }
    }

    // Lessons

    async getLessons(date: undefined | Date = undefined){
        if(date === undefined){
            date = new Date();
        }
        let dateStr = date.getUTCFullYear().toString() + "-" + (date.getUTCMonth()+1).toString() + "-" + date.getUTCDate().toString();
        let data = {"DataPoczatkowa": dateStr, "DataKoncowa": dateStr};
        try {
            const jsonData = await this.post("Uczen/PlanLekcjiZeZmianami", data);

            let lessons = jsonData.Data.sort((a: vulcanLesson, b: vulcanLesson) => {
                if (a["NumerLekcji"] < b["NumerLekcji"]){
                    return -1;
                }
                if (a["NumerLekcji"] > b["NumerLekcji"]){
                    return 1;
                }
                return 0;
            });

            let lessonsToReturn: Array<lesson> = lessons.map((item: vulcanLesson) => {
                return {
                    "number": item["NumerLekcji"],
                    "room": item["Sala"],
                    "group": item["PodzialSkrot"],
                    "date": item["DzienTekst"],
                    "time": this.getLessonTimeFromDict(item["IdPoraLekcji"]),
                    "teacher": this.getTeacherFromDict(item["IdPracownik"]),
                    "subject": this.getSubjectFromDict(item["IdPrzedmiot"])
                };
            });

            return lessonsToReturn;
        } catch (e) {
            throw "Failed fetching lessons!";
        }
    }

    // Exams

    async getExams(date: undefined | Date = undefined){
        if(date === undefined){
            date = new Date();
        }
        let dateStr = date.getUTCFullYear().toString() + "-" + (date.getUTCMonth()+1).toString() + "-" + date.getUTCDate().toString();
        let data = {"DataPoczatkowa": dateStr, "DataKoncowa": dateStr};
        try {
            const jsonData = await this.post("Uczen/Sprawdziany", data);
            
            const examType = [
                "EXAM",
                "SHORT_TEST",
                "CLASS_TEST"
            ];
            
            let examsToReturn: Array<exam> = jsonData.Data.map((item: vulcanExam) => {
                return {
                    "id": item["Id"],
                    "type": examType[item["RodzajNumer"] - 1],
                    "description": item["Opis"],
                    "date": item["DataTekst"],
                    "teacher": this.getTeacherFromDict(item["IdPracownik"]),
                    "subject": this.getSubjectFromDict(item["IdPrzedmiot"])
                };
            });

            return examsToReturn;
        } catch (e) {
            throw "Failed fetching exams!";
        }
    }

    // Homework

    async getHomework(date: undefined | Date = undefined){   // WARNING! I don't have a way to test this!
        if(date === undefined){
            date = new Date();
        }
        let dateStr = date.getUTCFullYear().toString() + "-" + (date.getUTCMonth()+1).toString() + "-" + date.getUTCDate().toString();
        let data = {"DataPoczatkowa": dateStr, "DataKoncowa": dateStr};
        try {
            const jsonData = await this.post("Uczen/ZadaniaDomowe", data);

            let homeworkToReturn: Array<homework> = jsonData.Data.map((item: vulcanHomework) => {
                return {
                    "id": item["Id"],
                    "description": item["Opis"],
                    "date": item["DataTekst"],
                    "teacher": this.getTeacherFromDict(item["IdPracownik"]),
                    "subject": this.getSubjectFromDict(item["IdPrzedmiot"])
                };
            });

            return homeworkToReturn;
        } catch (e) {
            throw "Failed fetching the homework!";
        }
    }

    // Messages

    async getMessages(dateFrom: undefined | Date = undefined, dateTo: undefined | Date = undefined) {
        if (!this.student) { throw Error("You must set the student first!") }
        if(dateFrom === undefined){
            dateFrom = new Date(this.student["OkresDataOdTekst"]);
        }
        if(dateTo === undefined){
            dateTo = new Date(this.student["OkresDataDoTekst"]);
        }
        let dateFromStr = dateFrom.getUTCFullYear().toString() + "-" + (dateFrom.getUTCMonth()+1).toString() + "-" + dateFrom.getUTCDate().toString();
        let dateToStr = dateTo.getUTCFullYear().toString() + "-" + (dateTo.getUTCMonth()+1).toString() + "-" + dateTo.getUTCDate().toString();
        let data = {"DataPoczatkowa": dateFromStr, "DataKoncowa": dateToStr};
        try {
            const jsonData = await this.post("Uczen/WiadomosciOdebrane", data);

            let messagesToReturn: Array<message> = jsonData.Data.map((item: vulcanMessage) => {
                let messageRecipients = item["Adresaci"] !== null ? item["Adresaci"].map((innerItem: vulcanMessageRecipient) => {
                    return {
                        "loginId": innerItem["LoginId"],
                        "name": innerItem["Nazwa"]
                    };
                }) : null;
                return {
                    "id": item["WiadomoscId"],
                    "senderId": item["NadawcaId"],
                    "recipients": messageRecipients,
                    "title": item["Tytul"],
                    "content": item["Tresc"],
                    "sentDate": item["DataWyslania"],
                    "sentTime": item["GodzinaWyslania"],
                    "readDate": item["DataPrzeczytania"],
                    "readTime": item["GodzinaPrzeczytania"],
                    "sender": this.getTeacherByLoginIdFromDict(item["NadawcaId"])
                };
            });

            return messagesToReturn;
        } catch (e) {
            throw "Failed fetching messages!";
        }
    }
}