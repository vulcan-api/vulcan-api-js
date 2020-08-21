import { getCertificate } from "./certificate.js";
import {Api} from './api.js';

export const register = (token, symbol, pin) => {
    return getCertificate(token, symbol, pin);
}

export class Vulcan{
    api = undefined;
    constructor(cert){
        this.api = new Api(cert);
    }
    getStudents(){
        return this.api.getStudents();
    }
    setStudent(student){
        return this.api.setStudent(student);
    }
    getGrades(){
        return this.api.getGrades();
    }
    getLessons(date=undefined){
        return this.api.getLessons(date);
    }
    getExams(date=undefined){
        return this.api.getExams(date);
    }
    getHomework(date=undefined){     // WARNING! I don't have a way to test this!
        return this.api.getHomework(date);
    }
    getMessages(dateFrom=undefined, dateTo=undefined){
        return this.api.getMessages(dateFrom, dateTo);
    }
}