import {
    uuid,
    now,
    getFirebaseToken,
    getBaseUrl,
    APP_VERSION,
    APP_NAME
} from './utils.js';
import axios from 'axios';
export class Certificate{
    async get(inputToken, inputSymbol, inputPin){
        const token = inputToken.toString().toUpperCase();
        const symbol = inputSymbol.toString().toLowerCase();
        const pin = inputPin.toString();
        const firebaseToken = await getFirebaseToken();
        const data = {
            "PIN": pin,
            "TokenKey": token,
            "AppVersion": APP_VERSION,
            "DeviceId": uuid(),
            "DeviceName": "Vulcan API JS",
            "DeviceNameUser": "",
            "DeviceDescription": "",
            "DeviceSystemType": "JavaScript",
            "DeviceSystemVersion": "ES7",
            "RemoteMobileTimeKey": now() + 1,
            "TimeKey": now(),
            "RequestId": uuid(),
            "RemoteMobileAppVersion": APP_VERSION,
            "RemoteMobileAppName": APP_NAME,
            "FirebaseTokenKey": firebaseToken,
        }
        const headers = {
            "RequestMobileType": "RegisterDevice",
            "User-Agent": "MobileUserAgent",
        }
        const baseUrl = await getBaseUrl(token);
        const url = `${baseUrl}/${symbol}/mobile-api/Uczen.v3.UczenStart/Certyfikat`;

        const r = await axios.post(url, data, {headers: headers});
        const jsonData = r.data;
        const cert = jsonData.TokenCert;
        return {
            "CertyfikatPfx": cert["CertyfikatPfx"],
            "CertyfikatKlucz": cert["CertyfikatKlucz"],
            "CertyfikatKluczSformatowanyTekst": cert["CertyfikatKluczSformatowanyTekst"],
            "AdresBazowyRestApi": cert["AdresBazowyRestApi"]
        }
    }

}