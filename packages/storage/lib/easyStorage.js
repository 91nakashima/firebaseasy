import { getStorage } from 'firebase/storage';
import { getEasyApp } from '@firebaseasy/app';
export function getEasyStorage() {
    var app = getEasyApp();
    if (!app)
        return getStorage();
    return getStorage(app);
}
//# sourceMappingURL=easyStorage.js.map