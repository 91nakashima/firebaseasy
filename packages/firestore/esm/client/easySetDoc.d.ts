import { Firestore } from 'firebase/firestore';
/**
 * コンソール表示用
 */
export declare const createShowPath: (path: string, id: string) => string;
/**
 * set doc
 */
export declare function easySetDoc<T>(db: Firestore, collectionPath: string, data: T): Promise<string>;
