"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easyDownload = void 0;
const node_fetch_1 = require("node-fetch");
// import request from 'request'
// import fs from 'fs'
const easyDownload = async (path) => {
    const res = await (0, node_fetch_1.default)(path);
    const blob = await res.blob();
    console.log(blob);
    const file = new File([blob], 'bjsbdv', {
        type: `image/${path.split('.').pop()}`
    });
    console.log(file);
};
exports.easyDownload = easyDownload;
//# sourceMappingURL=easyDownload.js.map