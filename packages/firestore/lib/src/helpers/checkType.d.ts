import { CollectionReference } from 'firebase/firestore';
import { Query } from 'firebase/firestore';
/**
 * check type
 */
export declare const isTypeCollectionOrQuery: (r: any) => r is CollectionReference<import("firebase/firestore").DocumentData> | Query<import("firebase/firestore").DocumentData>;
