"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.firestore = void 0;
const firebase_functions_1 = require("firebase-functions");
// import { getApps } from 'firebase-admin/app'
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const auth_1 = require("firebase-admin/auth");
// if (!getApps().length) {
//  initializeApp(config().firebase, 'easy-firebase-functions')
// }
const admin = (0, app_1.initializeApp)((0, firebase_functions_1.config)().firebase, 'easy-firebase-functions');
exports.firestore = (0, firestore_1.getFirestore)(admin);
exports.auth = (0, auth_1.getAuth)(admin);
//# sourceMappingURL=init.js.map