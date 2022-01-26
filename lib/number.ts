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
type IsLessZero<N extends NumberLike> = common.ConditionReverse<IsOverZero<N>>

/**
 * number类型是否是小数
 */
type IsFloat<
    N extends NumberLike,
  OnlyCheckPoint extends boolean = true
> = string.Stringify<N> extends `${infer Left}${"."}${infer Right}`
  ? OnlyCheckPoint extends true
    ? true
    : common.ConditionReverse<
        common.CheckLeftIsExtendsRight<string.GetChars<Right>, "0">
      >
  : false

/**
 * number类型是否是整数
 */
type IsInt<
N extends NumberLike,
  OnlyCheckPoint extends boolean = true
> = common.ConditionReverse<IsFloat<N, OnlyCheckPoint>>

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

/**
 * 整数加法，A1，A2最大999
 * @see https://juejin.cn/post/7050893279818317854#heading-8
 */
type IntAddSingle<N1 extends number, N2 extends number> = [
  ...array.GetTuple<N1>,
  ...array.GetTuple<N2>
]["length"]

export type {
  NumberLike,
  IsZero,
  IsOverZero,
  IsLessZero,
  IsFloat,
  IsInt,
  IsEqual,
  IntAddSingle,
}
