import { getCertificate } from "./certificate.js";
import {Api} from './api.js';
import {isAValidCertObj, isAValidDate, isAValidStudentObj} from './typeValidator.js';

export const register = (token, symbol, pin) => {
    return getCertificate(token, symbol, pin);
}

export class Vulcan{
    api = undefined;
    constructor(cert){
        if (isAValidCertObj(cert)){
            this.api = new Api(cert);
        } else {
            throw "Invalid certificate!";
        }
    }
    getStudents(){
        return this.api.getStudents();
    }
    setStudent(student){
        if (!isAValidStudentObj(student)){
            throw "Invalid student obj!";
        }
        return this.api.setStudent(student);
    }
    getGrades(){
        return this.api.getGrades();
    }
    getLessons(date=undefined){
        if (date !== undefined){
            if (!isAValidDate(date)){
                throw "ERROR: \"date\" param should be an object of Date!";
            }
        }
        return this.api.getLessons(date);
    }
    getExams(date=undefined){
        if (date !== undefined){
            if (!isAValidDate(date)){
                throw "ERROR: \"date\" param should be an object of Date!";
            }
        }
        return this.api.getExams(date);
    }
    getHomework(date=undefined){     // WARNING! I don't have a way to test this!
        if (date !== undefined){
            if (!isAValidDate(date)){
                throw "ERROR: \"date\" param should be an object of Date!";
            }
        }
        return this.api.getHomework(date);
    }
    getMessages(dateFrom=undefined, dateTo=undefined){
        if ((dateFrom !== undefined) && (dateTo !== undefined)){
            if ((!isAValidDate(dateFrom)) || (!isAValidDate(dateTo))){
                throw "ERROR: \"dateFrom\" and \"dateTo\" params should be objects of Date!";
            }
        }
        return this.api.getMessages(dateFrom, dateTo);
    }
}