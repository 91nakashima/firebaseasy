import { __awaiter, __generator } from "tslib";
import { getDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { DocumentReference } from 'firebase/firestore';
import { createRef } from './createReference';
import { isTypeCollectionOrQuery } from './helpers/checkType';
/**
 * get Doc or collection Data
 */
export function easyGetData(path, option) {
    return __awaiter(this, void 0, void 0, function () {
        var reference, res, arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reference = createRef(path, option);
                    /**
                     * DocumentReferenceの場合
                     */
                    if (reference instanceof DocumentReference) {
                        return [2 /*return*/, new Promise(function (resolve, rejects) {
                                if (!(reference instanceof DocumentReference))
                                    return rejects();
                                getDoc(reference)
                                    .then(function (doc) {
                                    if (!doc.exists)
                                        return resolve(undefined);
                                    resolve(doc.data());
                                })
                                    .catch(function () { return rejects(); });
                            })];
                    }
                    return [4 /*yield*/, getDocs(reference)
                        /**
                         * document data in Array
                         */
                    ];
                case 1:
                    res = _a.sent();
                    arr = [];
                    res.forEach(function (el) {
                        if (!el.exists)
                            return;
                        arr.push(el.data());
                    });
                    return [2 /*return*/, arr];
            }
        });
    });
}
/**
 * get Doc Data
 */
export function easyGetDoc(path) {
    return __awaiter(this, void 0, void 0, function () {
        var reference;
        return __generator(this, function (_a) {
            reference = createRef(path);
            /**
             * DocumentReference以外の場合はエラー
             */
            if (!(reference instanceof DocumentReference))
                throw new Error();
            return [2 /*return*/, new Promise(function (resolve, rejects) {
                    if (!(reference instanceof DocumentReference))
                        return rejects();
                    getDoc(reference)
                        .then(function (doc) {
                        if (!doc.exists)
                            return resolve(undefined);
                        resolve(doc.data());
                    })
                        .catch(function () { return rejects(); });
                })];
        });
    });
}
/**
 * get Collection Data
 */
export function easyGetDocs(path, option) {
    return __awaiter(this, void 0, void 0, function () {
        var reference, res, arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reference = createRef(path, option);
                    if (!isTypeCollectionOrQuery(reference))
                        throw new Error();
                    return [4 /*yield*/, getDocs(reference)
                        /**
                         * document data in Array
                         */
                    ];
                case 1:
                    res = _a.sent();
                    arr = [];
                    res.forEach(function (el) {
                        if (!el.exists)
                            return;
                        arr.push(el.data());
                    });
                    return [2 /*return*/, arr];
            }
        });
    });
}
//# sourceMappingURL=easyGetData.js.map