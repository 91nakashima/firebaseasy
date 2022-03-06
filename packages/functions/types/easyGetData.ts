type WhereOption = [
  string,
  (
    | '<'
    | '<='
    | '=='
    | '>'
    | '>='
    | 'array-contains'
    | 'array-contains-any'
    | 'in'
    | 'not-in'
  ),
  string | number | boolean | Array<string>
]

interface QueryOption {
  where?: Array<WhereOption>
  orderBy?: Array<string>
  limit?: number
}

export { WhereOption, QueryOption }
