type ConditionReverse<T extends boolean> = T extends true ? false : true

type CheckLeftIsExtendsRight<T extends any, R extends any> = T extends R ? true : false

type SafeCheck<T> = T extends null | undefined | never ? false : true

export type {
    ConditionReverse,
    CheckLeftIsExtendsRight,
    SafeCheck
}