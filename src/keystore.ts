import { defaultDeviceModel, getFirebaseToken, generateKeyPair } from "./utils";
export class Keystore {
  public certificate: string | undefined;
  public fingerprint: string | undefined;
  public privateKey: string | undefined;
  public firebaseToken: string | undefined;
  public deviceModel: string | undefined;

  public async init(
    deviceModel: string = defaultDeviceModel(),
    firebaseToken?: string
  ) {
    if (!firebaseToken) {
      firebaseToken = await getFirebaseToken();
    }
    const { privateKey, certificate, fingerprint } = await generateKeyPair();
    this.certificate = certificate;
    this.fingerprint = fingerprint;
    this.privateKey = privateKey;
    this.firebaseToken = firebaseToken;
    this.deviceModel = deviceModel;
  }

  /**
   * @deprecated since version 3.0
   */
  public load(
    certificate: string,
    fingerprint: string,
    privateKey: string,
    firebaseToken: string,
    deviceModel: string
  ) {
    this.certificate = certificate;
    this.fingerprint = fingerprint;
    this.privateKey = privateKey;
    this.firebaseToken = firebaseToken;
    this.deviceModel = deviceModel;
  }

  public loadFromObject({
    certificate,
    fingerprint,
    privateKey,
    firebaseToken,
    deviceModel,
  }: {
    certificate: string;
    fingerprint: string;
    privateKey: string;
    firebaseToken: string;
    deviceModel: string;
  }) {
    this.certificate = certificate;
    this.fingerprint = fingerprint;
    this.privateKey = privateKey;
    this.firebaseToken = firebaseToken;
    this.deviceModel = deviceModel;
  }

  public loadFromJsonString(jsonString: string) {
    this.loadFromObject(JSON.parse(jsonString));
  }

  /**
   * @deprecated since version 3.2 - use `loadFromJsonString()` instead
   */
  public async loadFromJsonFile(path: string) {
    throw new Error("Deprecated method. Use loadFromJsonString instead.");
  }

  public dumpToObject() {
    return {
      certificate: this.certificate,
      fingerprint: this.fingerprint,
      privateKey: this.privateKey,
      firebaseToken: this.firebaseToken,
      deviceModel: this.deviceModel,
    };
  }

  public dumpToJsonString() {
    return JSON.stringify(this.dumpToObject());
  }

  /**
   * @deprecated since version 3.2 - use `dumpToJsonString()` instead
   */
  public async dumpToJsonFile(path: string) {
    throw new Error("Deprecated method. Use dumpToJsonString instead.");
  }

  /**
   * @deprecated since version 3.0 - use `dumpToObject()` instead
   */
  public dump() {
    return this.dumpToObject();
  }
}
