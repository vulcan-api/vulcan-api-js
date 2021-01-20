import { defaultDeviceModel, getFirebaseToken, generateKeyPair } from "./utils";
import forge from 'node-forge';

export class Keystore {
    public certificate: string | undefined;
    public fingerprint: string | undefined;
    public privateKey: string | undefined;
    public firebaseToken: string | undefined;
    public deviceModel: string | undefined;

    public init = async (deviceModel: string = defaultDeviceModel(),
        firebaseToken?: string
    ) => {
        if (!firebaseToken) {
            firebaseToken = await getFirebaseToken();
        }
        const { privateKey, certificate, fingerprint } = generateKeyPair();
        this.certificate = certificate;
        this.fingerprint = fingerprint;
        this.privateKey = (() => {
            const rsaPrivateKey = forge.pki.privateKeyToAsn1(privateKey);
            const privateKeyInfo = forge.pki.wrapRsaPrivateKey(rsaPrivateKey);
            const privateKeyInfoDer = forge.asn1.toDer(privateKeyInfo).getBytes();
            return privateKeyInfoDer;
        })();
        this.firebaseToken = firebaseToken;
        this.deviceModel = deviceModel;
    }
}