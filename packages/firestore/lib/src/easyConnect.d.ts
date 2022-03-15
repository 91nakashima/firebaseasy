import { Query, CollectionReference } from 'firebase/firestore';
/**
 * Firestore Real Time synchronization
 */
declare const easyConnect: (reference: Query | CollectionReference, key: string, fun?: ((e: object) => void) | undefined) => void;
/**
 * Stop Firestore Real Time synchronization
 */
declare const easyUnConnect: (key: string) => void;
export { easyConnect, easyUnConnect };
