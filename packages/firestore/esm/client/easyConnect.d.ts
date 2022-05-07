import { QueryOption } from '.';
import { Firestore } from 'firebase/firestore';
/**
 * Firestore Real Time synchronization
 */
export declare const easyConnect: <T>(db: Firestore, path: string, option?: QueryOption | undefined) => {
    data: Map<string, T>;
    arr: T[];
    set: (data: T) => Promise<string>;
    sbscribe: (suboption?: QueryOption | undefined, fun?: ((e: Map<string, T>) => void) | undefined) => void;
    unsbscribe: Function;
};
