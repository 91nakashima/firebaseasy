"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easyDelObject = void 0;
const init_1 = require("../init");
/**
 * Delete File from URL or Bath
 */
const easyDelObject = async (path) => {
    var _a;
    /** urlの場合にbucketを取得 */
    let buketURL = '';
    if (path.includes('https://')) {
        const urlArr = path.split('/');
        const getPath = urlArr[urlArr.length - 1].split('?')[0];
        path = decodeURIComponent(getPath);
        buketURL = (_a = urlArr.find(u => u.includes('appspot.com'))) !== null && _a !== void 0 ? _a : '';
    }
    const bucket = init_1.storage.bucket(buketURL !== null && buketURL !== void 0 ? buketURL : (0, init_1.funGebucket)());
    const resExists = await bucket.file(path).exists();
    const isExist = resExists && resExists[0];
    if (!isExist)
        return 'success';
    return new Promise((resolve, rejects) => {
        bucket
            .file(path)
            .delete()
            .then(() => {
            resolve('success');
        })
            .catch(error => {
            rejects(error);
        });
    });
};
exports.easyDelObject = easyDelObject;
//# sourceMappingURL=easyDelObject.js.map