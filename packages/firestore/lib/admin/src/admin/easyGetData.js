"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easyGetDocs = exports.easyGetDoc = exports.easyGetData = void 0;
const createReference_1 = require("./createReference");
const checkType_1 = require("./helpers/checkType");
const firestore_1 = require("firebase-admin/firestore");
/**
 * get Doc or Collection Data
 */
async function easyGetData(path, option) {
    const reference = (0, createReference_1.createRef)(path, option);
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
    if (!(0, checkType_1.isTypeCollectionOrQuery)(reference))
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
async function easyGetDoc(path) {
    const reference = (0, createReference_1.createRef)(path);
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
async function easyGetDocs(path, option) {
    const reference = (0, createReference_1.createRef)(path, option);
    if (!(0, checkType_1.isTypeCollectionOrQuery)(reference))
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