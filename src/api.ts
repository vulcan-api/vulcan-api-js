import { Keystore } from "./keystore";
import fetch from "node-fetch";
import { getSignatureValues } from "./signer";
import { ApiHelper } from "./apiHelper";
import {
  APP_NAME,
  APP_OS,
  APP_USER_AGENT,
  APP_VERSION,
  millis,
  nowIso,
  uuid,
} from "./utils";
import { Student, Account } from "./models";

export class Api {
  private keystore: Keystore;
  public account?: any;
  private restUrl?: any;
  public student?: any;
  public period?: any;
  public helper: ApiHelper;

  constructor(keystore: Keystore, account?: Account) {
    this.keystore = keystore;
    if (account) {
      this.account = account;
      this.restUrl = account.restUrl;
    }
    this.helper = new ApiHelper(this);
  }

  private buildPayload = (envelope: any) => ({
    AppName: APP_NAME,
    AppVersion: APP_VERSION,
    CertificateId: this.keystore.fingerprint,
    Envelope: envelope,
    FirebaseToken: this.keystore.firebaseToken,
    API: 1,
    RequestId: uuid(),
    Timestamp: millis(),
    TimestampFormatted: nowIso(),
  });

  private buildHeaders = (fullUrl: string, payload: string) => {
    if (!this.keystore.fingerprint || !this.keystore.privateKey) {
      throw Error("Keystore is not initialized!");
    }
    const dt = new Date();
    const { digest, canonicalUrl, signature } = getSignatureValues(
      this.keystore.fingerprint,
      this.keystore.privateKey,
      payload,
      fullUrl,
      dt.toUTCString()
    );

    const headers: any = {
      "User-Agent": APP_USER_AGENT,
      vOS: APP_OS,
      vDeviceModel: this.keystore.deviceModel,
      vAPI: "1",
      vDate: dt.toUTCString(),
      vCanonicalUrl: canonicalUrl,
      Signature: signature,
    };

    if (digest) {
      headers["Digest"] = digest;
      headers["Content-Type"] = "application/json";
    }

    return headers;
  };

  private request = async (method: "GET" | "POST", url: string, body?: any) => {
    const fullUrl = url.startsWith("http")
      ? url
      : this.restUrl
      ? this.restUrl + url
      : undefined;
    if (!fullUrl) {
      throw Error("Relative URL specified but no account loaded!");
    }
    const payload =
      body && method === "POST"
        ? JSON.stringify(this.buildPayload(body))
        : null;
    const headers = this.buildHeaders(fullUrl, payload === null ? "" : payload);
    const options: any = {
      headers: headers,
      method: method,
    };
    if (payload !== null) {
      options["body"] = payload;
    }
    try {
      const rawRes = await fetch(fullUrl, options);
      const jsonRes: any = await rawRes.json();
      const status = jsonRes["Status"];
      const envelope = jsonRes["Envelope"];
      if (status.Code !== 0) {
        throw Error(status["Message"]);
      }
      return envelope;
    } catch (e) {
      throw e;
    }
  };

  public get = async (url: string, inQuery?: any) => {
    const query = inQuery
      ? `${(() => {
          let queryToReturn = "";
          for (let item in inQuery) {
            queryToReturn += `&${item}=${encodeURIComponent(inQuery[item])}`;
          }
          return queryToReturn.substr(1);
        })()}`
      : undefined;

    if (query) {
      url += `?${query}`;
    }

    return await this.request("GET", url);
  };

  public post = async (url: string, body: any) =>
    await this.request("POST", url, body);

  public setStudent(student: Student) {
    this.student = student;
    this.restUrl = `${this.restUrl}${student.unit.symbol}/`;
    this.period = student.periods.filter((item) => item.current)[0];
  }
}
