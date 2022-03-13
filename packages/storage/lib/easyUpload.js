import { __awaiter, __generator } from "tslib";
import { getStorage, ref } from 'firebase/storage';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
export function easyUpload(path, data, fun) {
    return __awaiter(this, void 0, void 0, function () {
        var storage, storageRef, uploadTask;
        return __generator(this, function (_a) {
            storage = getStorage();
            storageRef = ref(storage, path);
            uploadTask = uploadBytesResumable(storageRef, data);
            return [2 /*return*/, new Promise(function (resolve, rejects) {
                    uploadTask.on('state_changed', function (snapshot) {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if (fun) {
                            fun(progress, snapshot.state);
                        }
                    }, function (error) {
                        rejects(error);
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