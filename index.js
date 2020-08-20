import {getCertificate} from './vulcan/certificate.js';
getCertificate("token", "symbol", "pin").then(result => {console.log(result)});