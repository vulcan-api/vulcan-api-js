import {
    APP_VERSION,
    APP_NAME,
    signature,
    now,
    uuid
} from './utils.js';
import axios from 'axios';

export class Api{
    cert = undefined;
    fullUrl = undefined;
    baseUrl = undefined;
    student = undefined;
    dictionaries = undefined;
    constructor(cert){
        this.cert = cert;
        this.baseUrl = cert["AdresBazowyRestApi"] + "mobile-api/Uczen.v3.";
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

    async setStudent(student){
        this.student = student;
        this.fullUrl = this.cert["AdresBazowyRestApi"] + student["JednostkaSprawozdawczaSymbol"] + "/mobile-api/Uczen.v3.";
        const jsonData = await this.post("Uczen/Slowniki");
        this.dictionaries = jsonData.Data;
    }

    // Lessons

    async getLessons(date=undefined){
        if(date === undefined){
            date = new Date();
        }
        let dateStr = date.getUTCFullYear().toString() + "-" + date.getUTCMonth().toString() + "-" + date.getUTCDate().toString();
        let data = {"DataPoczatkowa": dateStr, "DataKoncowa": dateStr};
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
            let lesson = {
                "number": item["NumerLekcji"],
                "room": item["Sala"],
                "group": item["PodzialSkrot"],
                "date": item["DzienTekst"]
            };
            this.dictionaries["PoryLekcji"].map(innerItem => {
                if (innerItem.Id === item["IdPoraLekcji"]){
                    lesson["time"] = {
                        "id": innerItem.Id,
                        "number": innerItem["Numer"],
                        "from": innerItem["PoczatekTekst"],
                        "to": innerItem["KoniecTekst"]
                    }
                }
            });
            if (lesson.time === undefined){
                lessons["time"] = null;
            }
            this.dictionaries["Pracownicy"].map(innerItem => {
                if (innerItem.Id === item["IdPracownik"]){
                    lesson["teacher"] = {
                        "id": innerItem.Id,
                        "firstName": innerItem["Imie"],
                        "lastName": innerItem["Nazwisko"],
                        "short": innerItem["Kod"],
                        "loginId": innerItem["LoginId"]
                    }
                }
            });
            if (lesson.teacher === undefined){
                lessons["teacher"] = null;
            }

            this.dictionaries["Przedmioty"].map(innerItem => {
                if (innerItem.Id === item["IdPrzedmiot"]){
                    lesson["subject"] = {
                        "id": innerItem.Id,
                        "name": innerItem["Nazwa"],
                        "short": innerItem["Kod"],
                        "postion": innerItem["Pozycja"]
                    }
                }
            })
            if (lesson.subject === undefined){
                lessons["subject"] = null;
            }

            lessonsToReturn.push(lesson);
        });

        return lessonsToReturn;
    }
}