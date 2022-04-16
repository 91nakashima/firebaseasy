import { QueryOption } from '.';
/**
 * Firestore Real Time synchronization
 */
export declare const easyConnect: <T>(path: string, option?: QueryOption | undefined, fun?: ((e: Map<string, T>) => void) | undefined) => {
    data: Map<string, any>;
    unsbscribe: () => void;
};
