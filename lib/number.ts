import * as common from "./common"
import * as string from "./string"
import * as array from "./array"

type NumberLike = number | `${number}`
/**
 * number类型是否为0
 */
type IsZero<T extends NumberLike> = common.CheckLeftIsExtendsRight<T, 0 | "0">

/**
 * number类型是否大于0
 */
type IsOverZero<T extends NumberLike> = IsZero<T> extends true
  ? false
  : common.CheckLeftIsExtendsRight<
      string.Stringify<T> extends `${"-"}${infer Rest}` ? Rest : never,
      never
    >

/**
 * number类型是否小于0
 */
type IsLessZero<T extends NumberLike> = common.ConditionReverse<IsOverZero<T>>

/**
 * number类型是否是小数
 */
type IsFloat<
  T extends NumberLike,
  OnlyCheckPoint extends boolean = true
> = string.Stringify<T> extends `${infer Left}${"."}${infer Right}`
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
  T extends NumberLike,
  OnlyCheckPoint extends boolean = true
> = common.ConditionReverse<IsFloat<T, OnlyCheckPoint>>

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
type IntAddSingle<A1 extends number, A2 extends number> = [
  ...array.GetTuple<A1>,
  ...array.GetTuple<A2>
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
