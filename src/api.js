import {
    APP_VERSION,
    APP_NAME,
    signature,
    now,
    uuid
} from './utils.js';
import axios from 'axios';

export class Api{
    constructor(cert){
        this.cert = cert;
        this.baseUrl = cert["AdresBazowyRestApi"] + "mobile-api/Uczen.v3.";
        this.fullUrl = undefined;
        this.student = undefined;
        this.dictionaries = undefined;
    }
    payload(json = undefined){
        let payload = {
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
    async headers(json){
        return {
            "User-Agent": "MobileUserAgent",
            RequestCertificateKey: this.cert["CertyfikatKlucz"],
            Connection: "close",
            RequestSignatureValue: await signature(this.cert["CertyfikatPfx"], JSON.stringify(json)),
            'Content-Type': 'application/json; charset=UTF-8',
        }
    }
    async request(method, endpoint, json = undefined){
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
    get(endpoint, json = undefined){
        return this.request("get", endpoint, json);
    }
    post(endpoint, json = undefined){
        return this.request("post", endpoint, json);
    }

    // Student

    async getStudents() {
        try {
            const jsonData = await this.post(this.baseUrl + "UczenStart/ListaUczniow");
            let studentsArrayToReturn = [];
            jsonData.Data.forEach(student => {
                studentsArrayToReturn.push(student);
            });
            return studentsArrayToReturn;
        } catch (e) {
            throw "Failed fetching students!";
        }
    }

    async setStudent(student){
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

    getLessonTimeFromDict(lessonTimeId){
        let objToReturn = null;
        this.dictionaries["PoryLekcji"].map(item => {
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

    getTeacherFromDict(teacherId){
        let objToReturn = null;
        this.dictionaries["Pracownicy"].map(item => {
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

    getTeacherByLoginIdFromDict(teacherLoginId){
        let objToReturn = null;
        this.dictionaries["Pracownicy"].map(item => {
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

    getSubjectFromDict(subjectId){
        let objToReturn = null;
        this.dictionaries["Przedmioty"].map(item => {
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

    getGradeCategoryFromDict(gradeCategoryId){
        let objToReturn = null;
        this.dictionaries["KategorieOcen"].map(item => {
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
            let gradesToReturn = [];
            jsonData.Data.map(item => {
                gradesToReturn.push({
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
                });
            });
            return gradesToReturn;
        } catch (e) {
            throw "Failed fetching grades!";
        }
    }

    // Lessons

    async getLessons(date=undefined){
        if(date === undefined){
            date = new Date();
        }
        let dateStr = date.getUTCFullYear().toString() + "-" + date.getUTCMonth().toString() + "-" + date.getUTCDate().toString();
        let data = {"DataPoczatkowa": dateStr, "DataKoncowa": dateStr};
        try {
            const jsonData = await this.post("Uczen/PlanLekcjiZeZmianami", data);

            let lessons = jsonData.Data.sort((a, b) => {
                if (a["NumerLekcji"] < b["NumerLekcji"]){
                    return -1;
                }
                if (a["NumerLekcji"] > b["NumerLekcji"]){
                    return 1;
                }
                return 0;
            });

            let lessonsToReturn = [];

            lessons.map(item => {
                lessonsToReturn.push({
                    "number": item["NumerLekcji"],
                    "room": item["Sala"],
                    "group": item["PodzialSkrot"],
                    "date": item["DzienTekst"],
                    "time": this.getLessonTimeFromDict(item["IdPoraLekcji"]),
                    "teacher": this.getTeacherFromDict(item["IdPracownik"]),
                    "subject": this.getSubjectFromDict(item["IdPrzedmiot"])
                });
            });

            return lessonsToReturn;
        } catch (e) {
            throw "Failed fetching lessons!";
        }
    }

    // Exams

    async getExams(date=undefined){
        if(date === undefined){
            date = new Date();
        }
        let dateStr = date.getUTCFullYear().toString() + "-" + date.getUTCMonth().toString() + "-" + date.getUTCDate().toString();
        let data = {"DataPoczatkowa": dateStr, "DataKoncowa": dateStr};
        try {
            const jsonData = await this.post("Uczen/Sprawdziany", data);

            // TODO implement sort / understand why is it even needed in the first place ;D

            let examsToReturn = [];

            const examType = { // This could be replaced with enum in TS
                1: "EXAM",
                2: "SHORT_TEST",
                3: "CLASS_TEST"
            }

            jsonData.Data.map(item => {
                examsToReturn.push({
                    "id": item["Id"],
                    "type": examType[item["RodzajNumer"]],
                    "description": item["Opis"],
                    "date": item["DataTekst"],
                    "teacher": this.getTeacherFromDict(item["IdPracownik"]),
                    "subject": this.getSubjectFromDict(item["IdPrzedmiot"])
                });
            });

            return examsToReturn;
        } catch (e) {
            throw "Failed fetching exams!";
        }
    }

    // Homework

    async getHomework(date=undefined){   // WARNING! I don't have a way to test this!
        if(date === undefined){
            date = new Date();
        }
        let dateStr = date.getUTCFullYear().toString() + "-" + date.getUTCMonth().toString() + "-" + date.getUTCDate().toString();
        let data = {"DataPoczatkowa": dateStr, "DataKoncowa": dateStr};
        try {
            const jsonData = await this.post("Uczen/ZadaniaDomowe", data);

            // TODO implement sort / understand why is it even needed in the first place ;D

            let homeworkToReturn = [];

            jsonData.Data.map(item => {
                homeworkToReturn.push({
                    "id": item["Id"],
                    "description": item["Opis"],
                    "date": item["DataTekst"],
                    "teacher": this.getTeacherFromDict(item["IdPracownik"]),
                    "subject": this.getSubjectFromDict(item["IdPrzedmiot"])
                });
            });

            return homeworkToReturn;
        } catch (e) {
            throw "Failed fetching the homework!";
        }
    }

    // Messages

    async getMessages(dateFrom=undefined, dateTo=undefined){
        if(dateFrom === undefined){
            dateFrom = new Date(this.student["OkresDataOdTekst"]);
        }
        if(dateTo === undefined){
            dateTo = new Date(this.student["OkresDataDoTekst"]);
        }
        let dateFromStr = dateFrom.getUTCFullYear().toString() + "-" + dateFrom.getUTCMonth().toString() + "-" + dateFrom.getUTCDate().toString();
        let dateToStr = dateTo.getUTCFullYear().toString() + "-" + dateTo.getUTCMonth().toString() + "-" + dateTo.getUTCDate().toString();
        let data = {"DataPoczatkowa": dateFromStr, "DataKoncowa": dateToStr};
        try {
            const jsonData = await this.post("Uczen/WiadomosciOdebrane", data);

            let messagesToReturn = [];

            jsonData.Data.map(item => {
                let messageRecipients = [];
                item["Adresaci"].map(innerItem => {
                    messageRecipients.push({
                        "loginId": innerItem["LoginId"],
                        "name": innerItem["Nazwa"]
                    });
                });
                messagesToReturn.push({
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
                });
            });

            return messagesToReturn;
        } catch (e) {
            throw "Failed fetching messages!";
        }
    }
}