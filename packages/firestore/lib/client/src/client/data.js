import { reactive } from 'vue';
/**
 *
 */
export var state = reactive({});
/**
 * stateを作成
 */
export var createState = function (path) {
    if (!state[path]) {
        state[path] = {
            data: new Map(),
            subscribe: null
        };
    }
};
//# sourceMappingURL=data.js.map