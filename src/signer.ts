import forge from "node-forge";

function getDigest(body: any) {
  if (body == null) return "";
  return forge.util.encode64(
    forge.md.sha256.create().update(body).digest().bytes()
  ); // base64
}

function getSignatureValue(values: any, pkey: any) {
  const messageDigest = forge.md.sha256.create();
  messageDigest.update(values);
  const key = forge.pki
    .privateKeyFromPem(
      "-----BEGIN PRIVATE KEY-----\n" + pkey + "\n-----END PRIVATE KEY-----"
    )
    .sign(messageDigest);
  return Buffer.from(forge.util.binary.raw.decode(key)).toString("base64");
}

function getEncodedPath(path: any) {
  const url = path.match("(api/mobile/.+)");
  if (url == null)
    throw new Error(
      "The URL does not seem correct (does not match `(api/mobile/.+)` regex)"
    );

  return encodeURIComponent(url[0]).toLowerCase();
}

function getHeadersList(
  body: any,
  digest: any,
  canonicalUrl: any,
  timestamp: any
) {
  const signData = [
    ["vCanonicalUrl", canonicalUrl],
    body == null ? null : ["Digest", digest],
    ["vDate", new Date(timestamp + 1000).toUTCString()],
  ].filter((item) => !!item);

  return {
    headers: signData.map((item) => item![0]).join(" "),
    values: signData.map((item) => item![1]).join(""),
  };
}

export interface SignatureValues {
  digest: string;
  canonicalUrl: string;
  signature: string;
}

function getSignatureValues(
  fingerprint: string,
  privateKey: string,
  body: string,
  requestPath: string,
  timestamp: number | string
): SignatureValues {
  const canonicalUrl = getEncodedPath(requestPath);
  const digest = getDigest(body);
  const { headers, values } = getHeadersList(
    body,
    digest,
    canonicalUrl,
    timestamp
  );
  const signatureValue = getSignatureValue(values, privateKey);

  return {
    digest: `SHA-256=${digest}`,
    canonicalUrl: canonicalUrl,
    signature: `keyId="${fingerprint}",headers="${headers}",algorithm="sha256withrsa",signature=Base64(SHA256withRSA(${signatureValue}))`,
  };
}

export { getSignatureValues };
