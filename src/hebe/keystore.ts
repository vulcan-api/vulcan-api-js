import { defaultDeviceModel, getFirebaseToken, generateKeyPair } from "./utils";
import forge from 'node-forge';

export class Keystore {
    public certificate: string | undefined;
    public fingerprint: string | undefined;
    public privateKey: forge.pki.PrivateKey | undefined;
    public firebaseToken: string | undefined;
    public deviceModel: string | undefined;

    public init = async (firebaseToken: string | undefined = undefined,
        deviceModel: string = defaultDeviceModel()
    ) => {
        if (!firebaseToken) {
            firebaseToken = await getFirebaseToken();
        }
        const { privateKey, certificate, fingerprint } = generateKeyPair();
        this.certificate = certificate;
        this.fingerprint = fingerprint;
        this.privateKey = privateKey;
        this.firebaseToken = firebaseToken;
        this.deviceModel = deviceModel;
    }
}