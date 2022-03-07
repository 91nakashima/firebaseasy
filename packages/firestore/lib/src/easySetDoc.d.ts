import { EasySetDoc } from '../types/EasySetDoc';
/**
 * set doc
 */
export declare function easySetDoc<T>(collectionPath: string, data: EasySetDoc & T): Promise<string>;
