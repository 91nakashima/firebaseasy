import { QueryOption } from '.';
import { Firestore, SetOptions } from 'firebase/firestore';
declare type OptionFun = () => QueryOption;
/**
 * Firestore Real Time synchronization
 */
export declare const easyConnect: <T>(db: Firestore, path: string, option?: QueryOption | OptionFun | undefined) => {
    data: Map<string, T>;
    set: (data: T, setOptions?: SetOptions | undefined) => Promise<string>;
    sbscribe: (fun?: ((e: Map<string, T>) => void) | undefined) => void;
    unsbscribe: Function;
};
export {};
