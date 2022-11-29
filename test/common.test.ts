import { common } from ".."

type ResultAnd = common.And<true, true>

type ResultOr = common.Or<true, false>

type ResultNot = common.Not<true>

type ResultCheckLeftIsExtendsRight = common.CheckLeftIsExtendsRight<1, 2>

type ResultIsEqual = common.IsEqual<1, number>

type ResultIsAny = common.IsAny<any>

type ResultIsNever = common.IsNever<never>

type ResultIsUnion = common.IsUnion<1 | 2>

type ResultDiff = common.Diff<1 | 2, 1 | 3>

type ResultSumAggregate = common.SumAggregate<1 | 2, 1 | 3>

type ResultNullable = common.Nullable<1>

type ResultMany = common.Many<string>

type ResultUnionToIntersection = common.UnionToIntersection<{ a: 1 } | { b: 2 }>

type ResultUnionToTuple = common.UnionToTuple<1 | 2 | 3>

export type {
  ResultAnd,
  ResultOr,
  ResultNot,
  ResultCheckLeftIsExtendsRight,
  ResultIsEqual,
  ResultIsAny,
  ResultIsNever,
  ResultIsUnion,
  ResultDiff,
  ResultSumAggregate,
  ResultNullable,
  ResultMany,
  ResultUnionToTuple,
  ResultUnionToIntersection,
}
