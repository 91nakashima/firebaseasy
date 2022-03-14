import { getStorage, ref } from 'firebase/storage';
import { deleteObject } from 'firebase/storage';
/**
 *
 */
export function easyDelObject(path) {
    if (path.includes('https://')) {
        var urlArr = path.split('/');
        var getPath = urlArr[urlArr.length - 1].split('?')[0];
        path = decodeURIComponent(getPath);
    }
    var storage = getStorage();
    var desertRef = ref(storage, path);
    new Promise(function (resolve, rejects) {
        deleteObject(desertRef)
            .then(function () {
            resolve('success');
        })
            .catch(function (error) {
            rejects(error);
        });
    });
}
//# sourceMappingURL=easyDelObject.js.map