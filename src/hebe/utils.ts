export * from '../utils';

import dateFormat from "dateformat";

import forge from 'node-forge';
import crypto from 'crypto';

export const APP_NAME = "DzienniczekPlus 2.0";
export const APP_VERSION = "1.4.2";
export const APP_OS = "Android";
export const APP_USER_AGENT = "Dart/2.10 (dart:io)";

export const defaultDeviceModel = () => `Vulcan API (Node ${process.version})`;

export const millis = () => Date.now();

export const generateKeyPair = async () => {
    const addYears = (dt: Date, n: number) => new Date(dt.setFullYear(dt.getFullYear() + n));

    const pki = forge.pki;

    const keys: any = await new Promise((resolve, reject) => {
        crypto.generateKeyPair('rsa', { modulusLength: 2048 }, (err, publicKey, privateKey) => {
            if (err) { reject(err) }
            else {
                resolve({publicKey, privateKey});
            }
        })
    });
    const publicKey = keys.publicKey.export({ format: 'pem', type: 'spki' }).toString();
    const privateKey = keys.privateKey.export({ format: 'pem', type: 'pkcs8' }).toString();
    const cert = pki.createCertificate();
    cert.publicKey = forge.pki.publicKeyFromPem(publicKey);
    cert.privateKey = forge.pki.privateKeyFromPem(privateKey);
    cert.serialNumber = '1';
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = addYears(new Date(), 20);
    const attrs = [{
        shortName: 'CN',
        value: 'APP_CERTIFICATE CA Certificate'
    },
    ];
    cert.setSubject(attrs);
    cert.setIssuer(attrs);
    cert.sign(cert.privateKey, forge.md.sha256.create());
    const fingerprint = crypto.createHash('sha1')
        .update(forge.asn1.toDer(pki.certificateToAsn1(cert)).getBytes().toString(), 'latin1')
        .digest().toString('hex');
    const certificate = pki.certificateToPem(cert)
      .replace('-----BEGIN CERTIFICATE-----', '')
      .replace('-----END CERTIFICATE-----', '')
      .replace(/\r?\n|\r/g, '')
      .trim();
    const privateKeyToReturn = privateKey
      .replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '')
      .replace(/\r?\n|\r/g, '')
      .trim();
    return { certificate, fingerprint, privateKey: privateKeyToReturn };
}

export const nowIso = () => {
    const date = new Date();
    return dateFormat(date, "yyyy-mm-dd HH:MM:ss");
}