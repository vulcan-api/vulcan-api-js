import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import qs from 'querystring';
import { signContent } from './signer';
import regeneratorRuntime from "regenerator-runtime"; // for babel
export const APP_NAME = "VULCAN-Android-ModulUcznia";
export const APP_VERSION = "18.10.1.433";
export const now = () => {return Math.floor(Date.now() / 1000)};
export const uuid = () => {return uuidv4()};
export const signature = async (cert: any, data: any) => {return await signContent("CE75EA598C7743AD9B0B7328DED85B06", cert, data)}
export const getComponents = async () => {
    let r = await axios.get('http://komponenty.vulcan.net.pl/UonetPlusMobile/RoutingRules.txt');
    const components: Array<string> = r.data.split('\r\n');
    let objToReturn: any = {};
    for (let i = 0; i < components.length; i++){
        objToReturn[components[i].split(',')[0]] = components[i].split(',')[1];
    }
    return objToReturn;
}
export const getFirebaseToken = async () => {
    const aid = "4609707972546570896:3626695765779152704";
    const device = aid.split(':')[0];
    const app = "pl.vulcan.uonetmobile";
    const data = {
        "sender": "987828170337",
        "X-scope": "*",
        "X-gmp_app_id": "1:987828170337:android:ac97431a0a4578c3",
        "app": app,
        "device": device,
    }

    const headers = {
        "Authorization": `AidLogin ${aid}`,
        "User-Agent": "Android-GCM/1.5",
        "app": app,
        "Content-Type": "application/x-www-form-urlencoded"
    }

    let r = await axios.post("https://android.clients.google.com/c2dm/register3", qs.stringify(data), {headers: headers});

    return r.data.split("=")[1];

}

export async function getBaseUrl(token: string) {
    let code = token.substr(0, 3);
    let components = await getComponents();
    if (components[code] !== undefined){
        return components[code];
    } else {
        throw "Niepoprawny token!";
    }
}