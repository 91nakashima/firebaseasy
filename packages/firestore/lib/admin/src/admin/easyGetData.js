"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easyGetDocs = exports.easyGetDoc = exports.easyGetData = void 0;
const init_1 = require("./init");
const firestore_1 = require("firebase-admin/firestore");
/**
 * check type
 */
const isUseType = (r) => {
    if (r instanceof firestore_1.CollectionReference)
        return true;
    if (r instanceof firestore_1.Query)
        return true;
    return false;
};
/**
 * get Doc or Collection Data
 */
async function easyGetData(data, option = {}) {
    const collectionArray = data.split('/').filter(d => d);
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
    if (option.where) {
        option.where.map((w) => {
            if (!isUseType(reference))
                return w;
            reference = reference.where(w[0], w[1], w[2]);
            return w;
        });
    }
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
     */
    if (option.orderBy) {
        option.orderBy.map((w) => {
            if (!isUseType(reference) || !w)
                return w;
            reference = reference.orderBy(w);
            return w;
        });
    }
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
     */
    if (option.limit) {
        if (!isUseType(reference))
            throw new Error();
        reference = reference.limit(option.limit);
    }
    if (!isUseType(reference))
        throw new Error();
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
/**
 * get Doc Data
 */
async function easyGetDoc(data, option = {}) {
    const collectionArray = data.split('/').filter(d => d);
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
    /**
     * DocumentReferenceの場合
     */
    if (!(reference instanceof firestore_1.DocumentReference))
        throw new Error();
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
exports.easyGetDoc = easyGetDoc;
/**
 * get Collection Data
 */
async function easyGetDocs(data, option = {}) {
    const collectionArray = data.split('/').filter(d => d);
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
    /**
     * CollectionReference以外はエラー
     */
    if (!(reference instanceof firestore_1.CollectionReference))
        throw new Error();
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/queries?hl=ja#simple_queries
     */
    if (option.where) {
        option.where.map((w) => {
            if (!isUseType(reference))
                return w;
            reference = reference.where(w[0], w[1], w[2]);
            return w;
        });
    }
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
     */
    if (option.orderBy) {
        option.orderBy.map((w) => {
            if (!isUseType(reference) || !w)
                return w;
            reference = reference.orderBy(w);
            return w;
        });
    }
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
     */
    if (option.limit) {
        if (!isUseType(reference))
            throw new Error();
        reference = reference.limit(option.limit);
    }
    if (!isUseType(reference))
        throw new Error();
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
exports.easyGetDocs = easyGetDocs;
//# sourceMappingURL=easyGetData.js.map