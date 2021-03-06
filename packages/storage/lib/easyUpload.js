import { __awaiter, __generator } from "tslib";
import { ref } from 'firebase/storage';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
/**
 * create random name
 */
export function randomName(len, file) {
    if (len === void 0) { len = 20; }
    var pass = '';
    var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var numbers = '0123456789';
    var string = letters + letters.toUpperCase() + numbers;
    for (var i = 0; i < len; i++) {
        pass += string.charAt(Math.floor(Math.random() * string.length));
    }
    if (file) {
        var getExtension = file.name;
        var extensionArr = getExtension.split('.');
        var extension = extensionArr[extensionArr.length - 1];
        pass = "".concat(pass, ".").concat(extension);
    }
    return pass;
}
/**
 * upload file
 */
export function easyUpload(storage, path, data, fun) {
    return __awaiter(this, void 0, void 0, function () {
        var storageRef, uploadTask;
        return __generator(this, function (_a) {
            storageRef = ref(storage, path);
            uploadTask = Array.isArray(data)
                ? uploadBytesResumable(storageRef, data[0], data[1])
                : uploadBytesResumable(storageRef, data);
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    uploadTask.on('state_changed', function (snapshot) {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if (fun) {
                            fun(progress, snapshot.state);
                        }
                    }, function (error) {
                        reject(error);
                    }, function () {
                        getDownloadURL(uploadTask.snapshot.ref).then(function (downloadURL) {
                            resolve(downloadURL);
                        });
                    });
                })];
        });
    });
}
//# sourceMappingURL=easyUpload.js.map