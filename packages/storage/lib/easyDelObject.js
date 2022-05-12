import { ref } from 'firebase/storage';
import { deleteObject } from 'firebase/storage';
/**
 * Delete File from URL or Bath
 */
export function easyDelObject(storage, path) {
    if (path.includes('https://')) {
        var urlArr = path.split('/');
        var getPath = urlArr[urlArr.length - 1].split('?')[0];
        path = decodeURIComponent(getPath);
    }
    var desertRef = ref(storage, path);
    return new Promise(function (resolve, rejects) {
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