import { CollectionReference, DocumentReference } from 'firebase/firestore';
import { Query } from 'firebase/firestore';
import { QueryOption } from './index';
export declare const createRef: (path: string, option?: QueryOption | undefined) => Query | CollectionReference | DocumentReference;