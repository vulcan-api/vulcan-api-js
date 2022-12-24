import dateFormat from "dateformat";

import forge from "node-forge";

import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import axios from "axios";
import qs from "querystring";
import { Account } from "./models";

export const now = () => {
  return Math.floor(Date.now() / 1000);
};
export const uuid = (seed?: string) => {
  if (seed) {
    return uuidv5(seed, "6ba7b814-9dad-11d1-80b4-00c04fd430c8");
  }
  return uuidv4();
};
export const getComponents = async () => {
  let r = await axios.get(
    "http://komponenty.vulcan.net.pl/UonetPlusMobile/RoutingRules.txt"
  );
  const components: Array<string> = r.data.split("\r\n");
  let objToReturn: any = {};
  for (let i = 0; i < components.length; i++) {
    objToReturn[components[i].split(",")[0]] = components[i].split(",")[1];
  }
  return objToReturn;
};
export const getFirebaseToken = async () => {
  const aid = "4609707972546570896:3626695765779152704";
  const device = aid.split(":")[0];
  const app = "pl.vulcan.uonetmobile";
  const data = {
    sender: "987828170337",
    "X-scope": "*",
    "X-gmp_app_id": "1:987828170337:android:ac97431a0a4578c3",
    app: app,
    device: device,
  };

  const headers = {
    Authorization: `AidLogin ${aid}`,
    "User-Agent": "Android-GCM/1.5",
    app: app,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let r = await axios.post(
    "https://android.clients.google.com/c2dm/register3",
    qs.stringify(data),
    { headers: headers }
  );

  return r.data.split("=")[1];
};

export async function getBaseUrl(token: string) {
  let code = token.substr(0, 3);
  let components = await getComponents();
  if (components[code] !== undefined) {
    return components[code];
  } else {
    throw "Niepoprawny token!";
  }
}
export const APP_NAME = "DzienniczekPlus 2.0";
export const APP_VERSION = "1.4.2";
export const APP_OS = "Android";
export const APP_USER_AGENT = "Dart/2.10 (dart:io)";

export const defaultDeviceModel = () => `Vulcan API (Node ${process.version})`;

export const millis = () => Date.now();

export const generateKeyPair = async () => {
  const addYears = (dt: Date, n: number) =>
    new Date(dt.setFullYear(dt.getFullYear() + n));

  const pki = forge.pki;

  const keys: any = await new Promise((resolve, reject) => {
    forge.pki.rsa.generateKeyPair(
      { bits: 2048, workers: 2 },
      (err, keypair) => {
        if (err) {
          reject(err);
        } else {
          resolve(keypair);
        }
      }
    );
  });
  const cert = pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.privateKey = keys.privateKey;
  cert.serialNumber = "1";
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = addYears(new Date(), 20);
  const attrs = [
    {
      shortName: "CN",
      value: "APP_CERTIFICATE CA Certificate",
    },
  ];
  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.sign(cert.privateKey, forge.md.sha256.create());

  const fHash = forge.md.sha1.create();
  fHash.update(forge.asn1.toDer(pki.certificateToAsn1(cert)).getBytes());
  const fingerprint = fHash.digest().toHex();

  const privateKey = pki.privateKeyToAsn1(keys.privateKey);
  const privateKeyInfo = pki.wrapRsaPrivateKey(privateKey);
  const privateKeyPem = pki.privateKeyInfoToPem(privateKeyInfo);
  const certificate = pki
    .certificateToPem(cert)
    .replace("-----BEGIN CERTIFICATE-----", "")
    .replace("-----END CERTIFICATE-----", "")
    .replace(/\r?\n|\r/g, "")
    .trim();
  const privateKeyToReturn = privateKeyPem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\r?\n|\r/g, "")
    .trim();
  return { certificate, fingerprint, privateKey: privateKeyToReturn };
};

export const nowIso = () => {
  const date = new Date();
  return dateFormat(date, "yyyy-mm-dd HH:MM:ss");
};

export class AccountTools {
  public static loadFromObject(account: {
    loginId: number;
    userLogin: string;
    userName: string;
    restUrl: string;
  }): Account {
    const accountToReturn = new Account();
    accountToReturn.loginId = account.loginId;
    accountToReturn.userLogin = account.userLogin;
    accountToReturn.userName = account.userName;
    accountToReturn.restUrl = account.restUrl;
    return accountToReturn;
  }

  public static loadFromJsonString(jsonString: string) {
    return this.loadFromObject(JSON.parse(jsonString));
  }

  /**
   * @deprecated since version 3.2
   */
  public static async loadFromJsonFile(path: string) {
    throw new Error("Deprecated method. Use loadFromJsonString instead.");
  }

  public static dumpToObject(account: Account) {
    return {
      loginId: account.loginId,
      userLogin: account.userLogin,
      userName: account.userName,
      restUrl: account.restUrl,
    };
  }

  public static dumpToJsonString(account: Account) {
    return JSON.stringify(this.dumpToObject(account));
  }

  /**
   * @deprecated since version 3.2
   */
  public static async dumpToJsonFile(account: Account, path: string) {
    throw new Error("Deprecated method. Use dumpToJsonString instead.");
  }
}
