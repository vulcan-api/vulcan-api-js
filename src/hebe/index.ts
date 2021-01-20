import {Api} from './api';
import "regenerator-runtime/runtime"; // for babel
import {DEVICE_REGISTER} from './endpoints';
import { HebeAccount } from './hebe_interfaces/account';
import { Account } from './interfaces/account';
import {Keystore} from './keystore';
import {uuid,
getBaseUrl,
APP_OS
} from './utils';

export class VulcanHebe {
    private account?: Account;
    private api?: Api;

    public register = async (keystore: Keystore, token: string,
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
        this.api = new Api(keystore);
        const response: HebeAccount = await this.api.post(fullUrl, body);

        this.account = {
            loginId: response.LoginId,
            userLogin: response.UserLogin,
            userName: response.UserName,
            restUrl: response.RestUrl
        }
    } 
}