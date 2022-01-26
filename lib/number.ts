import * as common from "./common"
import * as string from "./string"

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

export type { NumberLike, IsZero, IsOverZero, IsLessZero, IsFloat, IsInt }
