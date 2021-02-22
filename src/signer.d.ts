declare module '@wulkanowy/uonet-request-signer-node-hebe' {
  export function getSignatureValues(
    fingerprint: string,
    privateKey: string,
    body: string,
    requestPath: string,
    timestamp: number | string,
  ): SignatureValues;

  export interface SignatureValues {
    'digest': string;
    'canonicalUrl': string;
    'signature': string;
  }
}