import { Query, CollectionReference } from 'firebase/firestore';
declare const initEasyFirestore: (useReactive: boolean) => void;
/**
 *
 */
declare const easyConnect: (reference: Query | CollectionReference, key: string, fun?: ((e: object) => void) | undefined) => void;
/**
 *
 */
declare const easyUnConnect: (key: string) => void;
export { initEasyFirestore, easyConnect, easyUnConnect };
