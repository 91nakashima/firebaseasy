"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
if (!admin.apps.length) {
    admin.initializeApp(functions.config().firebase, 'easy-firebase-functions');
}
exports.default = admin;
//# sourceMappingURL=initAdmin.js.map