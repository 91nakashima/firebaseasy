/**
 * @param {Number} len
 * @default 20
 * @returns String
 */
export var randamString = function (len) {
    if (len === void 0) { len = 20; }
    var pass = '';
    var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var numbers = '0123456789';
    var string = letters + letters.toUpperCase() + numbers;
    for (var i = 0; i < len; i++) {
        pass += string.charAt(Math.floor(Math.random() * string.length));
    }
    return pass;
};
//# sourceMappingURL=randamString.js.map