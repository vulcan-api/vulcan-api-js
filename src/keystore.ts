import { defaultDeviceModel, getFirebaseToken, generateKeyPair } from "./utils";

export class Keystore {
    public certificate: string | undefined;
    public fingerprint: string | undefined;
    public privateKey: string | undefined;
    public firebaseToken: string | undefined;
    public deviceModel: string | undefined;

    public async init (deviceModel: string = defaultDeviceModel(), firebaseToken?: string){
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

    public load(certificate: string,
        fingerprint: string,
        privateKey: string,
        firebaseToken: string,
        deviceModel: string) {
            this.certificate = certificate;
            this.fingerprint = fingerprint;
            this.privateKey = privateKey;
            this.firebaseToken = firebaseToken;
            this.deviceModel = deviceModel;
    }

    public dump(){
        return {
            certificate: this.certificate,
            fingerprint: this.fingerprint,
            privateKey: this.privateKey,
            firebaseToken: this.firebaseToken,
            deviceModel: this.deviceModel
        }
    }
}