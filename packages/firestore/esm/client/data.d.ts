import { Unsubscribe } from 'firebase/firestore';
/**
 * 情報
 */
export declare const state: {
    [key: string]: {
        data: Map<string, any>;
        subscribe: Unsubscribe | null;
    };
};
/**
 * stateを作成
 */
export declare const createState: (path: string) => void;
