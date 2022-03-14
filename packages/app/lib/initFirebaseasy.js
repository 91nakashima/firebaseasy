import { initializeApp } from 'firebase/app';
var easyApp = undefined;
export function initFirebaseasy(options, name) {
    easyApp = initializeApp(options, name);
    return easyApp;
}
export function getEasyApp() {
    return easyApp;
}
//# sourceMappingURL=initFirebaseasy.js.map