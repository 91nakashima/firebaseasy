import { doc, collection, getFirestore } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DocumentReference } from 'firebase/firestore';
import { isTypeCollectionOrQuery } from './helpers/checkType';
/**
 * Create Reference
 */
export var createRef = function (path, option) {
    var collectionArray = path.split('/').filter(function (d) { return d; });
    if (!collectionArray.length)
        throw new Error();
    var reference = null;
    var db = getFirestore();
    var dataNum = collectionArray.length;
    if (dataNum === 1 || dataNum % 2 === 1) {
        // collection
        reference = collection(db, path);
    }
    else if (dataNum % 2 === 0) {
        // document
        reference = doc(db, path);
    }
    if (!reference)
        throw new Error();
    if (reference instanceof DocumentReference)
        return reference;
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/queries?hl=ja#simple_queries
     */
    if (option === null || option === void 0 ? void 0 : option.where) {
        option.where.map(function (w) {
            if (!isTypeCollectionOrQuery(reference))
                return w;
            reference = query(reference, where(w[0], w[1], w[2]));
            return w;
        });
    }
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
     */
    if (option === null || option === void 0 ? void 0 : option.orderBy) {
        option.orderBy.map(function (w) {
            if (!isTypeCollectionOrQuery(reference) || !w)
                return w;
            reference = query(reference, orderBy(w));
            return w;
        });
    }
    /**
     * document
     * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
     */
    if (option === null || option === void 0 ? void 0 : option.limit) {
        if (!isTypeCollectionOrQuery(reference))
            throw new Error();
        reference = query(reference, limit(option.limit));
    }
    return reference;
};
//# sourceMappingURL=createReference.js.map