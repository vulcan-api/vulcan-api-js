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

export const APP_NAME = "DzienniczekPlus 2.0";
export const APP_VERSION = "1.4.2";
export const APP_OS = "Android";
export const APP_USER_AGENT = "Dart/2.10 (dart:io)";

export const defaultDeviceModel = () => `Vulcan API (Node ${process.version})`;

export const millis = () => Date.now();