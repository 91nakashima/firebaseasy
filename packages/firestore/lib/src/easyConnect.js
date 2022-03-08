import { onSnapshot } from 'firebase/firestore';
import { reactive } from 'vue';
var state = {};
var config = {
    reactive: false
};
var initEasyFirestore = function (useReactive) {
    config.reactive = useReactive;
};
/**
 *
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
            var setData = config.reactive
                ? reactive(change.doc.data())
                : change.doc.data();
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
};
/**
 *
 */
var easyUnConnect = function (key) {
    var unsbscribe = state[key].subscribe;
    unsbscribe();
    delete state[key];
};
export { initEasyFirestore, easyConnect, easyUnConnect };
//# sourceMappingURL=easyConnect.js.map