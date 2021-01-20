// This is imported here
// so that you can import
// just a single file instead of two.
// I'm aware how ridiculous the block below looks ;)

import { uuid,
    getFirebaseToken,
    getBaseUrl
} from '../utils';
export {uuid,
    getFirebaseToken,
    getBaseUrl
};

import dateFormat from "dateformat";

import forge from 'node-forge';
import crypto from 'crypto';

export const APP_NAME = "DzienniczekPlus 2.0";
export const APP_VERSION = "1.4.2";
export const APP_OS = "Android";
export const APP_USER_AGENT = "Dart/2.10 (dart:io)";

export const defaultDeviceModel = () => `Vulcan API (Node ${process.version})`;

export const millis = () => Date.now();

export const generateKeyPair = () => {
    const getCertificateFingerprint = (certString: string) => {
        const baseString = certString.match(/-----BEGIN CERTIFICATE-----\s*([\s\S]+?)\s*-----END CERTIFICATE-----/i);
        if (baseString === null) {throw Error()}
        const rawCert = Buffer.from(baseString[1], "base64");
        const sha256sum = crypto.createHash("sha256").update(rawCert).digest("hex");
        return sha256sum.toUpperCase().replace(/(.{2})(?!$)/g, "$1:");
    }


    const pki = forge.pki;

    const keys = pki.rsa.generateKeyPair(2048);
    const cert = pki.createCertificate();
    cert.publicKey = keys.publicKey;
    cert.serialNumber = "1";
    cert.validity.notBefore = new Date(0);
    cert.validity.notAfter = new Date(20 * 365 * 24 * 60 * 60 * 1000);
    const attrs = [{
    name: 'commonName',
    value: 'APP_CERTIFICATE CA Certificate'
    }, {
    name: 'countryName',
    value: 'PL'
    }, {
    name: 'organizationName',
    value: 'Open Source'
    }];
    cert.setSubject(attrs);
    cert.setIssuer(attrs);
    cert.sign(keys.privateKey);
    const certificate = pki.certificateToPem(cert);;
    const fingerprint = getCertificateFingerprint(certificate);
    const privateKey = keys.privateKey;
    return { certificate, fingerprint, privateKey };
}

export const nowIso = () => {
    const date = new Date();
    return dateFormat(date, "yyyy-mm-dd HH:MM:ss");
}

export const nowGmt = (timestampt?: number) => {
    if (timestampt) {
        const date = new Date(timestampt * 1000);
        return dateFormat(date, "ddd, dd mmm yyyy HH:MM:ss GMT");
    } else {
        const date = new Date();
        return dateFormat(date, "ddd, dd mmm yyyy HH:MM:ss GMT");
    }
}