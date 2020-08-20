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

        // TODO implement student

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
        console.log(url);
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
}