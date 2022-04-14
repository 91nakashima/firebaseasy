import { QueryOption } from '.';
/**
 * Stop Firestore Real Time synchronization
 */
declare const easyUnConnect: (path: string) => void;
/**
 * Firestore Real Time synchronization
 */
declare const easyConnect: <T>(path: string, option?: QueryOption | undefined, fun?: ((e: Map<string, T>) => void) | undefined) => {
    data: Map<string, any>;
    unsbscribe: () => void;
};
export { easyConnect, easyUnConnect };
