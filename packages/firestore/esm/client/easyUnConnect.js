import { state } from './data';
/**
 * Stop Firestore Real Time synchronization
 */
export var easyUnConnect = function (path) {
    if (!state[path].subscribe)
        return;
    var unsbscribe = state[path].subscribe;
    unsbscribe();
    state[path].data.clear();
    state[path].subscribe = null;
    console.log("easyUnConnect-> ".concat(path));
};
//# sourceMappingURL=easyUnConnect.js.map