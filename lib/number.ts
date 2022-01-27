import * as common from "./common"
import * as string from "./string"
import * as array from "./array"

type NumberLike = number | `${number}`
/**
 * number类型是否为0
 */
type IsZero<N extends NumberLike> = common.CheckLeftIsExtendsRight<N, 0 | "0">

/**
 * number类型是否大于0
 */
type IsOverZero<N extends NumberLike> = IsZero<N> extends true
  ? false
  : common.CheckLeftIsExtendsRight<
      string.Stringify<N> extends `${"-"}${infer Rest}` ? Rest : never,
      never
    >

/**
 * number类型是否小于0
 */
type IsLessZero<N extends NumberLike> = common.Not<IsOverZero<N>>

/**
 * number类型是否是小数
 */
type IsFloat<
  N extends NumberLike,
  OnlyCheckPoint extends boolean = true
> = string.Stringify<N> extends `${infer Left}${"."}${infer Right}`
  ? OnlyCheckPoint extends true
    ? true
    : common.Not<common.CheckLeftIsExtendsRight<string.GetChars<Right>, "0">>
  : false

/**
 * number类型是否是整数
 */
type IsInt<
  N extends NumberLike,
  OnlyCheckPoint extends boolean = true
> = common.Not<IsFloat<N, OnlyCheckPoint>>

/**
 * 两个number类型是否相等
 */
type IsEqual<
  L extends NumberLike,
  R extends NumberLike,
  Strict extends boolean = true
> = Strict extends true
  ? common.CheckLeftIsExtendsRight<L, R>
  : common.CheckLeftIsExtendsRight<string.Stringify<L>, string.Stringify<R>>

type IsNotEqual<
  L extends NumberLike,
  R extends NumberLike,
  Strict extends boolean = true
> = common.Not<IsEqual<L, R, Strict>>

type IntAddSingleHepler<N1 extends number, N2 extends number> = [
  ...array.GetTuple<N1>,
  ...array.GetTuple<N2>
]["length"]

/**
 * 正整数（和0）加法，A1，A2最大999
 * @see https://juejin.cn/post/7050893279818317854#heading-8
 */
type IntAddSingle<N1 extends number, N2 extends number> = IntAddSingleHepler<
  N1,
  N2
> extends number
  ? IntAddSingleHepler<N1, N2>
  : number

type CompareHelper<
  N1 extends number,
  N2 extends number,
  A1 extends unknown[] = array.GetTuple<N1>,
  A2 extends unknown[] = array.GetTuple<N2>
> = IsNotEqual<N1, N2, true> extends true
  ? common.Or<IsZero<A1["length"]>, IsZero<A2["length"]>> extends true
    ? IsZero<A1["length"]> extends true
      ? false
      : true
    : CompareHelper<array.Pop<A1>["length"], array.Pop<A2>["length"]>
  : false

type Compare<N1 extends number, N2 extends number> = CompareHelper<N1, N2>

type IntMinusSingleAbsHelper<
  N1 extends number,
  N2 extends number,
  A1 extends unknown[] = array.GetTuple<N1>,
  A2 extends unknown[] = array.GetTuple<N2>
> = IsNotEqual<N1, N2, true> extends true
  ? common.Or<IsZero<A1["length"]>, IsZero<A2["length"]>> extends true
    ? IsZero<A1["length"]> extends true
      ? A2['length']
      : A1['length']
    : IntMinusSingleAbsHelper<array.Pop<A1>["length"], array.Pop<A2>["length"]>
  : 0

type IntMinusSingleAbs<
  N1 extends number,
  N2 extends number
> = IntMinusSingleAbsHelper<N1, N2>

export type {
  NumberLike,
  IsZero,
  IsOverZero,
  IsLessZero,
  IsFloat,
  IsInt,
  IsEqual,
  IsNotEqual,
  IntAddSingle,
  IntMinusSingleAbs,
  Compare,
}
