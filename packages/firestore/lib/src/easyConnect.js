import { onSnapshot } from 'firebase/firestore';
var state = {};
/**
 * Firestore Real Time synchronization
 */
var easyConnect = function (reference, key, fun) {
    var Unsubscribe = onSnapshot(reference, function (snapshot) {
        var _a;
        if (!state[key]) {
            state[key] = {
                data: [],
                subscribe: null
            };
        }
        var copyHaveData = (_a = state[key]) === null || _a === void 0 ? void 0 : _a.data;
        snapshot.docChanges().map(function (change) {
            var setData = change.doc.data();
            if (change.type === 'added') {
                copyHaveData[change.doc.id] = setData;
            }
            else if (change.type === 'modified') {
                copyHaveData[change.doc.id] = setData;
            }
            else if (change.type === 'removed') {
                delete copyHaveData[change.doc.id];
            }
        });
        state[key].subscribe = Unsubscribe;
        state[key].data = copyHaveData;
        if (!fun)
            return;
        fun(copyHaveData);
    });
    console.log('\u001b[32measyConnect-> ' + key);
};
/**
 * Stop Firestore Real Time synchronization
 */
var easyUnConnect = function (key) {
    var unsbscribe = state[key].subscribe;
    unsbscribe();
    delete state[key];
};
export { easyConnect, easyUnConnect };
//# sourceMappingURL=easyConnect.js.map