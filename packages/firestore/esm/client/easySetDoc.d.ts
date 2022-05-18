import { Firestore, SetOptions } from 'firebase/firestore';
/**
 * コンソール表示用
 */
export declare const createShowPath: (path: string, id: string) => string;
/**
 * idを持っているかを判断する
 */
export declare const isHaveId: (d: any) => d is {
    id: string;
};
/**
 * set doc
 */
export declare function easySetDoc<T>(db: Firestore, collectionPath: string, data: T, setOptions?: SetOptions): Promise<string>;
