import { defaultDeviceModel } from "./utils";

export class Keystore {
    public certificate: string;
    public fingerprint: string;
    public privateKey: string;
    public firebaseToken: string;
    public deviceModel: string;

    constructor(firebaseToken: string | undefined = undefined,
        deviceModel: string = defaultDeviceModel()
    ) {
        // TODO: implement this    
    }
}