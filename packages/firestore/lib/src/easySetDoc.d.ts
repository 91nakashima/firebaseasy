import { EasySetDoc } from '../types/EasySetDoc';
/**
 * コンソール表示用
 */
export declare const createShowPath: (path: string, id: string) => string;
/**
 * set doc
 */
export declare function easySetDoc<T>(collectionPath: string, data: T & EasySetDoc): Promise<string>;
