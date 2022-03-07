"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easySetDoc = void 0;
const initAdmin_1 = require("./initAdmin");
const firestore_1 = require("firebase-admin/firestore");
/**
 * set doc
 */
async function easySetDoc(path, data) {
    const collectionArray = path.split('/').filter(d => d);
    if (!collectionArray.length)
        throw new Error();
    let reference = null;
    for (let i = 0; i < collectionArray.length; i++) {
        if (i === 0) {
            reference = initAdmin_1.default.firestore().collection(collectionArray[i]);
        }
        else if (i % 2 === 1 && reference instanceof firestore_1.CollectionReference) {
            reference = reference.doc(collectionArray[i]);
        }
        else if (i % 2 === 0 && reference instanceof firestore_1.DocumentReference) {
            reference = reference.collection(collectionArray[i]);
        }
    }
    if (!(reference instanceof firestore_1.CollectionReference))
        throw new Error();
    // idがある場合
    if (data.id) {
        const getData = await reference.doc(data.id).get();
        if (getData.data()) {
            // 情報がある場合(updata)
            data.updated_at = new Date();
            await reference.doc(data.id).update(data);
        }
        else {
            // 情報がない場合(create)
            data.created_at = new Date();
            await reference.doc(data.id).set(data);
        }
        return data.id;
    }
    // idがない場合(create)
    data.created_at = new Date();
    const newDoc = await reference.add(data);
    await reference.doc(newDoc.id).update({ id: newDoc.id });
    return newDoc.id;
}
exports.easySetDoc = easySetDoc;
//# sourceMappingURL=easySetDoc.js.map