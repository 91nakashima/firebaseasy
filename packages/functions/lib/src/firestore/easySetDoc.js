"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easySetDoc = exports.isHaveId = void 0;
const common_1 = require("../common");
const firestore_1 = require("firebase-admin/firestore");
const firestore_2 = require("firebase-admin/firestore");
/**
 * idを持っているかを判断する
 */
const isHaveId = (d) => {
    return !!(d === null || d === void 0 ? void 0 : d.id);
};
exports.isHaveId = isHaveId;
/**
 * set doc
 */
const easySetDoc = async (firestore, path, data) => {
    const collectionArray = path.split('/').filter(d => d);
    if (!collectionArray.length)
        throw new Error();
    let reference = null;
    for (let i = 0; i < collectionArray.length; i++) {
        if (i === 0) {
            // CollectionReference
            reference = firestore.collection(collectionArray[i]);
        }
        else if (i % 2 === 1 && reference instanceof firestore_2.CollectionReference) {
            // 最後
            if (i === collectionArray.length - 1) {
                if (!(0, exports.isHaveId)(data)) {
                    data = Object.assign(Object.assign({}, data), { id: collectionArray[i] }); // 代入
                }
                else if (collectionArray[i] !== data.id) {
                    throw new Error(); // エラー
                }
            }
            // DocumentReference
            reference = reference.doc(collectionArray[i]);
        }
        else if (i % 2 === 0 && reference instanceof firestore_1.DocumentReference) {
            // 最後
            if (i === collectionArray.length - 1) {
                // DocumentReference
                if ((0, exports.isHaveId)(data) && collectionArray[i] !== data.id)
                    throw new Error();
                if ((0, exports.isHaveId)(data) && reference instanceof firestore_2.CollectionReference) {
                    reference = reference.doc(data.id);
                }
            }
            // CollectionReference
            reference = reference.collection(collectionArray[i]);
        }
    }
    // idがない場合(create)
    const createId = (0, common_1.randamString)();
    data = Object.assign(Object.assign({}, data), { id: createId });
    if (!(reference instanceof firestore_2.CollectionReference))
        throw new Error();
    await reference.doc(createId).set(data);
    return createId;
};
exports.easySetDoc = easySetDoc;
//# sourceMappingURL=easySetDoc.js.map