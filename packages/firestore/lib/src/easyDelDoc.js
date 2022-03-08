import { __awaiter, __generator } from "tslib";
import { deleteDoc } from 'firebase/firestore';
import { DocumentReference } from 'firebase/firestore';
import { createRef } from './createReference';
/**
 * delete Doc
 * @params 'cities/LA'
 */
export function easyDelDoc(path) {
    return __awaiter(this, void 0, void 0, function () {
        var reference;
        return __generator(this, function (_a) {
            reference = createRef(path);
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