import { getCertificate } from "./certificate.js";
import {Api} from './api.js';
import { getStudents } from './student.js';

export const register = (token, symbol, pin) => {
    return getCertificate(token, symbol, pin);
}

export class Vulcan{
    api = undefined;
    constructor(cert){
        this.api = new Api(cert);
    }
    getStudents(){
        return getStudents(this.api);
    }
}