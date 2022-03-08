import { CollectionReference } from 'firebase/firestore';
import { Query } from 'firebase/firestore';
/**
 * check type
 */
export var isTypeCollectionOrQuery = function (r) {
    if (r instanceof CollectionReference)
        return true;
    if (r instanceof Query)
        return true;
    return false;
};
//# sourceMappingURL=checkType.js.map