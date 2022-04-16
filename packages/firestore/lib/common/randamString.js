"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randamString = void 0;
/**
 * @param {Number} len
 * @default 20
 * @returns String
 */
const randamString = (len = 20) => {
    let pass = '';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const string = letters + letters.toUpperCase() + numbers;
    for (var i = 0; i < len; i++) {
        pass += string.charAt(Math.floor(Math.random() * string.length));
    }
    return pass;
};
exports.randamString = randamString;
//# sourceMappingURL=randamString.js.map