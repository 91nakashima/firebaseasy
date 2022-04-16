/**
 * pathを作成
 */
export var createPath = function (path, id) {
    if (path.slice(-1) === '/') {
        path = "".concat(path).concat(id);
    }
    else {
        path = "".concat(path, "/").concat(id);
    }
    return path;
};
//# sourceMappingURL=createPath.js.map