import { __awaiter, __generator } from "tslib";
import { randomName } from './index';
import { ref, getMetadata } from 'firebase/storage';
var getPathFromUrl = function (url) {
    if (url.includes('https://')) {
        var urlArr = url.split('/');
        var getPath = urlArr[urlArr.length - 1].split('?')[0];
        url = decodeURIComponent(getPath);
        return url;
    }
    return url;
};
/**
 * Download from URL or Path
 */
export function easyGetFileFromUrl(url, storage, fun) {
    var _this = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    // プログレス
    xhr.onprogress = function (evt) {
        var load = (100 * evt.loaded) / evt.total || 0;
        if (fun) {
            fun(load);
        }
    };
    xhr.responseType = 'blob'; // Blobオブジェクトとしてダウンロードする
    // ダウンロード完了
    return new Promise(function (resolve, reject) {
        xhr.addEventListener('error', function () {
            reject('Cannot download from this URL');
        });
        xhr.onload = function () { return __awaiter(_this, void 0, void 0, function () {
            var blob, path, storageRef, metadata, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blob = xhr.response;
                        if (!storage) {
                            resolve(new File([blob], randomName(10)));
                            return [2 /*return*/];
                        }
                        path = getPathFromUrl(url);
                        storageRef = ref(storage, path);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, getMetadata(storageRef)];
                    case 2:
                        metadata = _a.sent();
                        resolve(new File([blob], metadata.name, { type: metadata.contentType }));
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        reject(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        xhr.send();
    });
}
//# sourceMappingURL=easyGetFileFromUrl.js.map