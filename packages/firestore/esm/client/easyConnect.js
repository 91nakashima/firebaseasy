import { __awaiter, __generator } from "tslib";
import { onSnapshot } from 'firebase/firestore';
import { createRef } from '.';
import { easyUnConnect } from './easyUnConnect';
import { easySetDoc } from './easySetDoc';
import { state, createState } from './data';
import { DocumentReference } from 'firebase/firestore';
/**
 * idを持っているかどうか
 */
var isHaveId = function (d) {
    return !!(d === null || d === void 0 ? void 0 : d.id);
};
/**
 * Firestore Real Time synchronization
 */
export var easyConnect = function (db, path, option) {
    // stateを作成
    // ここが少し甘い
    createState(path);
    /**
     * sync
     */
    var sbscribe = function (fun) {
        console.log(typeof option === 'function' ? option() : option);
        // refarenceを作成
        var reference = createRef(db, path, typeof option === 'function' ? option() : option);
        // DocumentReference<DocumentData>
        if (reference instanceof DocumentReference) {
            state[path].subscribe = onSnapshot(reference, function (doc) {
                var _a, _b;
                var setData = doc.data();
                if (doc.exists()) {
                    (_a = state[path]) === null || _a === void 0 ? void 0 : _a.data.set(doc.id, setData);
                }
                if (!fun)
                    return;
                fun((_b = state[path]) === null || _b === void 0 ? void 0 : _b.data);
            });
        }
        // Query<DocumentData> | CollectionReference<DocumentData>
        if (!(reference instanceof DocumentReference)) {
            state[path].subscribe = onSnapshot(reference, function (snapshot) {
                var _a;
                snapshot.docChanges().map(function (change) {
                    var _a, _b, _c;
                    var setData = change.doc.data();
                    if (change.type === 'added') {
                        (_a = state[path]) === null || _a === void 0 ? void 0 : _a.data.set(change.doc.id, setData);
                    }
                    else if (change.type === 'modified') {
                        (_b = state[path]) === null || _b === void 0 ? void 0 : _b.data.set(change.doc.id, setData);
                    }
                    else if (change.type === 'removed') {
                        (_c = state[path]) === null || _c === void 0 ? void 0 : _c.data.delete(change.doc.id);
                    }
                });
                if (!fun)
                    return;
                fun((_a = state[path]) === null || _a === void 0 ? void 0 : _a.data);
            });
        }
        console.log('\u001b[32measyConnect-> ' + path);
    };
    /**
     * create or update
     */
    var set = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof data !== 'object') {
                        throw new Error('only object');
                    }
                    return [4 /*yield*/, easySetDoc(db, path, data)];
                case 1: 
                // if (isHaveId(data)) {
                //   state[path]?.data.set(data.id, data)
                //   return await easySetDoc(db, path, data)
                // } else {
                //   const createId = randamString()
                //   const setData = { ...{ id: createId }, ...data }
                //   state[path]?.data.set(createId, setData)
                //   return await easySetDoc(db, path, setData)
                // }
                return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    return {
        data: state[path].data,
        arr: new Proxy(state[path].data, {
            get: function () {
                if (!state[path].data)
                    return [];
                return Array.from(state[path].data.values());
            }
        }),
        set: set,
        sbscribe: sbscribe,
        unsbscribe: function () { return easyUnConnect(path); }
    };
};
//# sourceMappingURL=easyConnect.js.map