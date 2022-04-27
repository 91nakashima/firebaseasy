import { QueryOption } from '.';
/**
 * Firestore Real Time synchronization
 */
export declare const easyConnect: <T>(path: string, option?: QueryOption | undefined) => {
    data: Map<string, T>;
    arr: T[];
    run: (fun?: ((e: Map<string, T>) => void) | undefined) => void;
    unsbscribe: Function;
};
