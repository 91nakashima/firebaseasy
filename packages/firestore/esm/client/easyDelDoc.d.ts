import { Firestore } from 'firebase/firestore';
/**
 * delete Doc
 * @params 'cities/LA'
 */
export declare function easyDelDoc(db: Firestore, path: string): Promise<string>;
