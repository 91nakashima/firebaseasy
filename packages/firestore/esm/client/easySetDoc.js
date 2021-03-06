import { __assign, __awaiter, __generator } from "tslib";
import { doc, setDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { createPath, randamString } from '../common';
import { CollectionReference, DocumentReference } from 'firebase/firestore';
/**
 * コンソール表示用
 */
export var createShowPath = function (path, id) {
    var arr = path.split('/').filter(function (d) { return d; });
    path = "".concat(arr[0], "/").concat(id);
    return path;
};
/**
 * idを持っているかを判断する
 */
export var isHaveId = function (d) {
    return !!(d === null || d === void 0 ? void 0 : d.id);
};
/**
 * set doc
 */
export function easySetDoc(db, collectionPath, data, setOptions) {
    if (setOptions === void 0) { setOptions = { merge: true }; }
    return __awaiter(this, void 0, void 0, function () {
        var collectionArray, reference, dataNum, docPath, docref;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    collectionArray = collectionPath.split('/').filter(function (d) { return d; });
                    if (!collectionArray.length)
                        throw new Error();
                    reference = null;
                    dataNum = collectionArray.length;
                    if (dataNum === 1 || dataNum % 2 === 1) {
                        // collection
                        reference = collection(db, collectionPath);
                        // document
                        if (isHaveId(data)) {
                            reference = doc(db, createPath(collectionPath, data.id));
                        }
                    }
                    else if (dataNum % 2 === 0) {
                        // document
                        if (isHaveId(data) && collectionArray[dataNum - 1] !== data.id) {
                            throw new Error();
                        }
                        if (!isHaveId(data)) {
                            data = __assign(__assign({}, data), { id: collectionArray[dataNum - 1] });
                        }
                        reference = doc(db, collectionPath);
                    }
                    if (!isHaveId(data)) return [3 /*break*/, 2];
                    if (!(reference instanceof DocumentReference))
                        throw new Error();
                    return [4 /*yield*/, setDoc(reference, data, setOptions)];
                case 1:
                    _a.sent();
                    console.log('\u001b[32measySetDoc -> ' + createShowPath(collectionPath, data.id));
                    return [2 /*return*/, data.id];
                case 2:
                    // idがない場合(create)
                    if (!(reference instanceof CollectionReference))
                        throw new Error();
                    if (!isHaveId(data))
                        data = __assign(__assign({}, data), { id: randamString() });
                    if (!isHaveId(data))
                        throw new Error();
                    docPath = createPath(collectionPath, data.id);
                    docref = doc(db, docPath);
                    return [4 /*yield*/, setDoc(docref, data, setOptions)];
                case 3:
                    _a.sent();
                    console.log('\u001b[32measySetDoc -> ' + docPath);
                    return [2 /*return*/, data.id];
            }
        });
    });
}
//# sourceMappingURL=easySetDoc.js.map