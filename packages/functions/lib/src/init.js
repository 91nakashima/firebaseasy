"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.auth = exports.firestore = exports.funGebucket = exports.funAdmin = void 0;
const firebase_functions_1 = require("firebase-functions");
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const auth_1 = require("firebase-admin/auth");
const storage_1 = require("firebase-admin/storage");
const setup_1 = require("./setup");
/**
 * init
 */
const funAdmin = () => {
    var _a;
    if (!(0, app_1.getApps)().length) {
        return (0, app_1.initializeApp)((0, firebase_functions_1.config)().firebase, 'easy-firebase-functions');
    }
    return (_a = setup_1.state.app) !== null && _a !== void 0 ? _a : (0, app_1.getApp)();
};
exports.funAdmin = funAdmin;
/**
 * プロジェクトIDを取得
 */
const funGebucket = () => {
    if (setup_1.state.bucket)
        return setup_1.state.bucket;
    if ((0, exports.funAdmin)().options.projectId) {
        return `${(0, exports.funAdmin)().options.projectId}.appspot.com`;
    }
    return '';
};
exports.funGebucket = funGebucket;
exports.firestore = (0, firestore_1.getFirestore)((0, exports.funAdmin)());
exports.auth = (0, auth_1.getAuth)((0, exports.funAdmin)());
exports.storage = (0, storage_1.getStorage)((0, exports.funAdmin)());
//# sourceMappingURL=init.js.map