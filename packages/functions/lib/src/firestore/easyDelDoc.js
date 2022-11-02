"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easyDelDoc = void 0;
// import { DocumentReference } from 'firebase-admin/firestore'
// import { CollectionReference } from 'firebase-admin/firestore'
/**
 * delete Doc
 * @params 'cities/LA'
 */
async function easyDelDoc(firestore, path) {
    return new Promise((resolve, reject) => {
        firestore
            .doc(path)
            .delete()
            .then(() => resolve(path))
            .catch(e => reject(e));
    });
}
exports.easyDelDoc = easyDelDoc;
//# sourceMappingURL=easyDelDoc.js.map