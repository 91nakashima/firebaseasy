"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRef = void 0;
const init_1 = require("./init");
const checkType_1 = require("./helpers/checkType");
const firestore_1 = require("firebase-admin/firestore");
/**
 * Create Reference
 */
const createRef = (path, option) => {
    const collectionArray = path.split('/').filter(d => d);
    if (!collectionArray.length)
        throw new Error();
    let reference = null;
    for (let i = 0; i < collectionArray.length; i++) {
        if (i === 0) {
            reference = init_1.firestore.collection(collectionArray[i]);
        }
        else if (i % 2 === 1 && reference instanceof firestore_1.CollectionReference) {
            reference = reference.doc(collectionArray[i]);
        }
        else if (i % 2 === 0 && reference instanceof firestore_1.DocumentReference) {
            reference = reference.collection(collectionArray[i]);
        }
    }
    if (!reference)
        throw new Error();
    if (reference instanceof firestore_1.DocumentReference)
        return reference;
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/queries?hl=ja#simple_queries
     */
    if (option === null || option === void 0 ? void 0 : option.where) {
        option.where.map((w) => {
            if (!(0, checkType_1.isTypeCollectionOrQuery)(reference))
                return w;
            reference = reference.where(w[0], w[1], w[2]);
            return w;
        });
    }
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
     */
    if (option === null || option === void 0 ? void 0 : option.orderBy) {
        option.orderBy.map((w) => {
            if (!(0, checkType_1.isTypeCollectionOrQuery)(reference) || !w)
                return w;
            reference = reference.orderBy(w);
            return w;
        });
    }
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
     */
    if (option === null || option === void 0 ? void 0 : option.limit) {
        if (!(0, checkType_1.isTypeCollectionOrQuery)(reference))
            throw new Error();
        reference = reference.limit(option.limit);
    }
    return reference;
};
exports.createRef = createRef;
//# sourceMappingURL=createReference.js.map