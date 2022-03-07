import { QueryOption } from '../types/easyGetData';
declare type GetDataType<T> = T extends any[] ? T : T | undefined;
/**
 * get Doc or collection Data
 */
export declare function easyGetData<T>(path: string, option?: QueryOption): Promise<GetDataType<T>>;
/**
 * get Doc Data
 */
export declare function easyGetDoc<T>(path: string, option?: QueryOption): Promise<T | undefined>;
/**
 * get Collection Data
 */
export declare function easyGetDocs<T>(path: string, option?: QueryOption): Promise<T[]>;
export {};
