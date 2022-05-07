import { __awaiter, __generator } from "tslib";
import { doc, getDoc, setDoc, addDoc, updateDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { CollectionReference, DocumentReference } from 'firebase/firestore';
import { createPath } from '../common';
/**
 * コンソール表示用
 */
export var createShowPath = function (path, id) {
    var arr = path.split('/').filter(function (d) { return d; });
    path = "".concat(arr[0], "/").concat(id);
    return path;
};
/**
 * set doc
 */
export function easySetDoc(db, collectionPath, data) {
    return __awaiter(this, void 0, void 0, function () {
        var willSetData, collectionArray, reference, dataNum, getData, newDoc, getPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    willSetData = data;
                    collectionArray = collectionPath.split('/').filter(function (d) { return d; });
                    if (!collectionArray.length)
                        throw new Error();
                    reference = null;
                    dataNum = collectionArray.length;
                    if (dataNum === 1 || dataNum % 2 === 1) {
                        // collection
                        reference = collection(db, collectionPath);
                        // document
                        if (willSetData.id) {
                            reference = doc(db, createPath(collectionPath, willSetData.id));
                        }
                    }
                    else if (dataNum % 2 === 0) {
                        // document
                        if (willSetData.id && collectionArray[dataNum - 1] !== willSetData.id) {
                            throw new Error();
                        }
                        if (!willSetData.id) {
                            willSetData.id = collectionArray[dataNum - 1];
                        }
                        reference = doc(db, collectionPath);
                    }
                    if (!willSetData.id) return [3 /*break*/, 6];
                    if (!(reference instanceof DocumentReference))
                        throw new Error();
                    return [4 /*yield*/, getDoc(reference)];
                case 1:
                    getData = _a.sent();
                    if (!getData.data()) return [3 /*break*/, 3];
                    /**
                     * 情報がある場合(updata)
                     * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja#update-data
                     */
                    willSetData.updated_at = new Date();
                    return [4 /*yield*/, updateDoc(reference, willSetData)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    /**
                     * 情報がない場合(create)
                     * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja#set_a_document
                     */
                    willSetData.created_at = new Date();
                    return [4 /*yield*/, setDoc(reference, willSetData)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    console.log('\u001b[32measySetDoc-> ' + createShowPath(collectionPath, willSetData.id));
                    console.log(JSON.parse(JSON.stringify(willSetData)));
                    return [2 /*return*/, willSetData.id];
                case 6:
                    // idがない場合(create)
                    if (!(reference instanceof CollectionReference))
                        throw new Error();
                    willSetData.created_at = new Date();
                    return [4 /*yield*/, addDoc(reference, willSetData)];
                case 7:
                    newDoc = _a.sent();
                    getPath = createPath(collectionPath, newDoc.id);
                    return [4 /*yield*/, updateDoc(doc(db, getPath), { id: newDoc.id })];
                case 8:
                    _a.sent();
                    if (!willSetData.id)
                        willSetData.id = newDoc.id;
                    console.log('\u001b[32measySetDoc-> ' + getPath);
                    console.log(JSON.parse(JSON.stringify(willSetData)));
                    return [2 /*return*/, newDoc.id];
            }
        });
    });
}
//# sourceMappingURL=easySetDoc.js.map