import { WhereFilterOp } from 'firebase-admin/firestore'

type WhereOption = [
  string,
  WhereFilterOp,
  string | number | boolean | Array<string>
]

interface QueryOption {
  where?: Array<WhereOption>
  orderBy?: Array<string>
  limit?: number
}

export { WhereOption, QueryOption }
