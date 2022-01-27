type Not<C extends boolean> = C extends true ? false : true

type And<C1 extends boolean, C2 extends boolean> = C1 extends true
  ? C2 extends true
    ? true
    : false
  : false

type Or<C1 extends boolean, C2 extends boolean> = C1 extends true
  ? true
  : C2 extends true
  ? true
  : false

type CheckLeftIsExtendsRight<T extends any, R extends any> = T extends R
  ? true
  : false

type SafeCheck<T> = T extends null | undefined | never ? false : true

type Diff<T, C> = Exclude<T, C> | Exclude<C, T>

type SumAggregate<T, U> = T | U

type Nullable<T> = T | null | undefined

type CanStringified = string | number | bigint | boolean | null | undefined

export type {
  Not,
  And,
  Or,
  Not,
  CheckLeftIsExtendsRight,
  SafeCheck,
  Diff,
  SumAggregate,
  Nullable,
  CanStringified,
}
