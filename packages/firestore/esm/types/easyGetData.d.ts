import { WhereFilterOp } from 'firebase/firestore';
declare type WhereOption = [
    string,
    WhereFilterOp,
    string | number | boolean | Array<string>
];
interface QueryOption {
    where?: WhereOption[];
    orderBy?: (string | [string, 'desc'])[];
    limit?: number;
}
export { WhereOption, QueryOption };
