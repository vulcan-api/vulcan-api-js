import {Certificate} from './vulcan/certificate.js';
let cert = new Certificate;
cert.get("token", "symbol", "pin").then(result => {console.log(result)});