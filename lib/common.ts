type Not<C extends boolean> = C extends true ? false : true

type And<C1 extends boolean, C2 extends boolean> = C1 extends true
  ? C2 extends true
    ? true
    : false
  : false

type And3<C1 extends boolean, C2 extends boolean, C3 extends boolean> = And<
  And<C1, C2>,
  C3
>

type And4<
  C1 extends boolean,
  C2 extends boolean,
  C3 extends boolean,
  C4 extends boolean
> = And<And3<C1, C2, C3>, C4>

type Or<C1 extends boolean, C2 extends boolean> = C1 extends true
  ? true
  : C2 extends true
  ? true
  : false

type Or3<C1 extends boolean, C2 extends boolean, C3 extends boolean> = Or<
  Or<C1, C2>,
  C3
>

type Or4<
  C1 extends boolean,
  C2 extends boolean,
  C3 extends boolean,
  C4 extends boolean
> = Or<Or3<C1, C2, C3>, C4>

type CheckLeftIsExtendsRight<T extends any, R extends any> = T extends R
  ? true
  : false

/**
 * https://github.com/microsoft/TypeScript/issues/27024#issuecomment-510924206
 */
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T1
>() => T1 extends B ? 1 : 2
  ? true
  : false

type IsAny<T> = 0 extends 1 & T ? true : false

type SafeCheck<T> = T extends null | undefined | never ? false : true

type Diff<T, C> = Exclude<T, C> | Exclude<C, T>

type SumAggregate<T, U> = T | U

type Nullable<T> = T | null | undefined

export type {
  Not,
  And,
  And3,
  And4,
  IsAny,
  Or,
  Or3,
  Or4,
  CheckLeftIsExtendsRight,
  IsEqual,
  SafeCheck,
  Diff,
  SumAggregate,
  Nullable,
}
