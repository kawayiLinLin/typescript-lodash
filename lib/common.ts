type ConditionReverse<T extends boolean> = T extends true ? false : true

type CheckLeftIsExtendsRight<T extends any, R extends any> = T extends R ? true : false

type SafeCheck<T> = T extends null | undefined | never ? false : true

type Diff<T, C> = Exclude<T, C> | Exclude<C, T>

type SumAggregate<T, U> = T | U

type Nullable<T> = T | null | undefined

type CanStringified = string | number | bigint | boolean | null | undefined

export type {
    ConditionReverse,
    CheckLeftIsExtendsRight,
    SafeCheck,
    Diff,
    SumAggregate,
    Nullable,
    CanStringified
}