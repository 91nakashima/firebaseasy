"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTypeCollectionOrQuery = void 0;
const firestore_1 = require("firebase-admin/firestore");
/**
 * check type(CollectionReference | Query)
 */
const isTypeCollectionOrQuery = (r) => {
    if (r instanceof firestore_1.CollectionReference)
        return true;
    if (r instanceof firestore_1.Query)
        return true;
    return false;
};
exports.isTypeCollectionOrQuery = isTypeCollectionOrQuery;
//# sourceMappingURL=checkType.js.map