"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPath = void 0;
/**
 * pathを作成
 */
const createPath = (path, id) => {
    if (path.slice(-1) === '/') {
        path = `${path}${id}`;
    }
    else {
        path = `${path}/${id}`;
    }
    return path;
};
exports.createPath = createPath;
//# sourceMappingURL=createPath.js.map