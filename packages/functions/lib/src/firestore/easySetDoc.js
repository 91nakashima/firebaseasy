"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easySetDoc = void 0;
const init_1 = require("../init");
const common_1 = require("../common");
const firestore_1 = require("firebase-admin/firestore");
/**
 * set doc
 */
const easySetDoc = async (path, data) => {
    const collectionArray = path.split('/').filter(d => d);
    if (!collectionArray.length)
        throw new Error();
    let reference = null;
    for (let i = 0; i < collectionArray.length; i++) {
        if (i === 0) {
            // CollectionReference
            reference = init_1.firestore.collection(collectionArray[i]);
        }
        else if (i % 2 === 1 && reference instanceof firestore_1.CollectionReference) {
            // 最後
            if (i === collectionArray.length - 1) {
                if (!data.id)
                    data.id = collectionArray[i]; // 代入
                if (collectionArray[i] !== data.id)
                    throw new Error(); // エラー
            }
            // DocumentReference
            reference = reference.doc(collectionArray[i]);
        }
        else if (i % 2 === 0 && reference instanceof firestore_1.DocumentReference) {
            // 最後
            if (i === collectionArray.length - 1) {
                // DocumentReference
                if (collectionArray[i] !== data.id)
                    throw new Error();
                if (data.id && reference instanceof firestore_1.CollectionReference) {
                    reference = reference.doc(data.id);
                }
            }
            // CollectionReference
            reference = reference.collection(collectionArray[i]);
        }
    }
    // idがある場合
    if (data.id && reference instanceof firestore_1.DocumentReference) {
        const getData = await reference.get();
        if (getData.data()) {
            // 情報がある場合(updata)
            data.updated_at = new Date();
            await reference.update(data);
        }
        else {
            // 情報がない場合(create)
            data.created_at = new Date();
            await reference.set(data);
        }
        return data.id;
    }
    // idがない場合(create)
    const createId = (0, common_1.randamString)();
    data.created_at = new Date();
    data.id = createId;
    if (!(reference instanceof firestore_1.CollectionReference))
        throw new Error();
    await reference.doc(createId).set(data);
    return createId;
};
exports.easySetDoc = easySetDoc;
//# sourceMappingURL=easySetDoc.js.map