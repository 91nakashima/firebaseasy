import { __awaiter, __generator } from "tslib";
import { getFirestore } from 'firebase/firestore';
import { doc, deleteDoc, collection } from 'firebase/firestore';
import { DocumentReference } from 'firebase/firestore';
/**
 * delete Doc
 * @params 'cities/LA'
 */
export function easyDelDoc(path) {
    return __awaiter(this, void 0, void 0, function () {
        var collectionArray, reference, db, dataNum;
        return __generator(this, function (_a) {
            collectionArray = path.split('/').filter(function (d) { return d; });
            if (!collectionArray.length)
                throw new Error();
            reference = null;
            db = getFirestore();
            dataNum = collectionArray.length;
            if (dataNum === 1 || dataNum % 2 === 1) {
                // collection
                reference = collection(db, path);
            }
            else if (dataNum % 2 === 0) {
                // document
                reference = doc(db, path);
            }
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    /**
                     * ドキュメントを削除
                     * https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ja
                     */
                    if (!reference)
                        return reject();
                    if (!(reference instanceof DocumentReference))
                        return reject();
                    deleteDoc(reference)
                        .then(function () { return resolve('ok'); })
                        .catch(function () { return reject(); });
                })];
        });
    });
}
//# sourceMappingURL=easyDelDoc.js.map