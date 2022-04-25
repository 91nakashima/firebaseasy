"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeEasyApp = exports.state = void 0;
exports.state = {
    app: null,
    bucket: ''
};
/**
 * setup App
 */
const initializeEasyApp = (setApp) => {
    if (setApp.app)
        exports.state.app = setApp.app;
    if (setApp.bucket)
        exports.state.bucket = setApp.bucket;
};
exports.initializeEasyApp = initializeEasyApp;
//# sourceMappingURL=setup.js.map