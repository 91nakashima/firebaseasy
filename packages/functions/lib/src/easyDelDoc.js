"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easyDelDoc = void 0;
const init_1 = require("./init");
const firestore_1 = require("firebase-admin/firestore");
/**
 * delete Doc
 * @params 'cities/LA'
 */
async function easyDelDoc(data) {
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
    return new Promise((resolve, reject) => {
        if (!reference)
            return reject();
        if (!(reference instanceof firestore_1.DocumentReference))
            return reject();
        reference
            .delete()
            .then(() => resolve('ok'))
            .catch(() => reject());
    });
}
exports.easyDelDoc = easyDelDoc;
//# sourceMappingURL=easyDelDoc.js.map