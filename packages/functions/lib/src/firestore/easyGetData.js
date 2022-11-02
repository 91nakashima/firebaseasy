"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easyGetData = void 0;
const firestore_1 = require("firebase-admin/firestore");
/**
 * get Doc or Collection Data
 * @returns Array | Object | undefind
 */
async function easyGetData(firestore, path, option) {
    const collectionArray = path.split('/').filter(d => d);
    if (!collectionArray.length)
        throw new Error();
    let reference = collectionArray.length % 2 === 0
        ? firestore.doc(path)
        : firestore.collection(path);
    /**
     * DocumentReferenceの場合
     */
    if (reference instanceof firestore_1.DocumentReference) {
        return new Promise((resolve, rejects) => {
            if (!(reference instanceof firestore_1.DocumentReference))
                return rejects();
            reference
                .get()
                .then(doc => {
                if (!doc.exists)
                    return resolve(undefined);
                resolve(doc.data());
            })
                .catch(() => rejects());
        });
    }
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/queries?hl=ja#simple_queries
     */
    if (option === null || option === void 0 ? void 0 : option.where) {
        option.where.map((w) => {
            reference = reference.where(w[0], w[1], w[2]);
            return w;
        });
    }
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
     */
    if (option === null || option === void 0 ? void 0 : option.orderBy) {
        option.orderBy.map(w => {
            if (!w)
                return w;
            if (typeof w === 'string') {
                reference = reference.orderBy(w);
            }
            else {
                reference = reference.orderBy(w[0], w[1]);
            }
            return w;
        });
    }
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
     */
    if (option === null || option === void 0 ? void 0 : option.limit) {
        reference = reference.limit(option.limit);
    }
    const res = await reference.get();
    /**
     * document data in Array
     */
    const arr = [];
    res.forEach(el => {
        if (!el.exists)
            return;
        arr.push(el.data());
    });
    return arr;
}
exports.easyGetData = easyGetData;
//# sourceMappingURL=easyGetData.js.map