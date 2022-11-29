import { common } from "..";

type ResultAnd = common.And<true, true>;

type ResultOr = common.Or<true, false>;

type ResultNot = common.Not<true>;

type ResultCheckLeftIsExtendsRight = common.CheckLeftIsExtendsRight<1, 2>;

type ResultIsEqual = common.IsEqual<1, number>;

type ResultIsAny = common.IsAny<any>;

type ResultDiff = common.Diff<1 | 2, 1 | 3>;

type ResultSumAggregate = common.SumAggregate<1 | 2, 1 | 3>;

type ResultNullable = common.Nullable<1>;

type ResultMany = common.Many<string>

export type {
  ResultAnd,
  ResultOr,
  ResultNot,
  ResultCheckLeftIsExtendsRight,
  ResultIsEqual,
  ResultIsAny,
  ResultDiff,
  ResultSumAggregate,
  ResultNullable,
  ResultMany
};
