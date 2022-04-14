import { onSnapshot } from 'firebase/firestore';
import { DocumentReference } from 'firebase/firestore';
import { reactive } from 'vue';
import { createRef } from '.';
/**
 *
 */
var state = reactive({});
/**
 * Stop Firestore Real Time synchronization
 */
var easyUnConnect = function (path) {
    if (!state[path].subscribe)
        return;
    var unsbscribe = state[path].subscribe;
    unsbscribe();
    state[path].data = new Map();
    state[path].subscribe = null;
    console.log("easyUnConnect-> ".concat(path));
};
/**
 * Firestore Real Time synchronization
 */
var easyConnect = function (path, option, fun) {
    var _a;
    var reference = createRef(path, option);
    if (!state[path]) {
        state[path] = {
            data: new Map(),
            subscribe: null
        };
    }
    var copyHaveData = (_a = state[path]) === null || _a === void 0 ? void 0 : _a.data;
    // DocumentReference<DocumentData>
    if (reference instanceof DocumentReference) {
        state[path].subscribe = onSnapshot(reference, function (doc) {
            var setData = doc.data();
            if (doc.exists()) {
                copyHaveData.set(doc.id, setData);
                return;
            }
            copyHaveData.delete(doc.id);
        });
    }
    // Query<DocumentData> | CollectionReference<DocumentData>
    if (!(reference instanceof DocumentReference)) {
        state[path].subscribe = onSnapshot(reference, function (snapshot) {
            snapshot.docChanges().map(function (change) {
                var setData = change.doc.data();
                if (change.type === 'added') {
                    // [change.doc.id] = setData
                    copyHaveData.set(change.doc.id, setData);
                }
                else if (change.type === 'modified') {
                    // copyHaveData[change.doc.id] = setData
                    copyHaveData.set(change.doc.id, setData);
                }
                else if (change.type === 'removed') {
                    // delete copyHaveData[change.doc.id]
                    copyHaveData.delete(change.doc.id);
                }
            });
            state[path].data = copyHaveData;
            if (!fun)
                return;
            fun(copyHaveData);
        });
    }
    console.log('\u001b[32measyConnect-> ' + path);
    return {
        data: state[path].data,
        unsbscribe: function () { return easyUnConnect(path); }
    };
};
export { easyConnect, easyUnConnect };
//# sourceMappingURL=easyConnect.js.map