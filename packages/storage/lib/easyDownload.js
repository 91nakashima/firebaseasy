import { randomName } from './index';
export function easyDownload(url, name, fun) {
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
        xhr.onload = function (oEvent) {
            var blob = xhr.response;
            var objectURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            document.body.appendChild(link);
            link.href = objectURL;
            if (name) {
                link.setAttribute('download', name);
            }
            else {
                link.setAttribute('download', randomName(10));
            }
            link.click();
            link.remove();
            resolve('success');
        };
        xhr.send();
    });
}
//# sourceMappingURL=easyDownload.js.map