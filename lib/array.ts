import * as common from "./common"

/**
 * 构造长度一定（T）的元组
 */
type GetTuple<Length extends number = 0> = GetTupleHelper<Length>

type GetTupleHelper<
  Length extends number = 0,
  R extends unknown[] = []
> = R["length"] extends Length ? R : GetTupleHelper<Length, [...R, unknown]>

/**
 * 从元（数）组类型构造联合类型
 */
type TupleToUnion<T extends unknown[]> = T[number]

/**
 * 去掉数组的最后一位
 * @see https://juejin.cn/post/7045536402112512007#heading-2
 */
type Pop<T extends unknown[]> = T extends [...infer LeftRest, infer Last]
  ? LeftRest
  : never

/**
 * 去掉数组的第一位
 */
type Shift<T extends unknown[]> = T extends [infer First, ...infer RightRest]
  ? RightRest
  : never

/**
 * 在数组前面插入一位
 */
type UnShift<T extends unknown[], Item> = [Item, ...T]

/**
 * 在数组最后插入一位
 */
type Push<T extends unknown[], Item> = [...T, Item]

type Concat<T extends unknown[], R extends unknown[]> = [...T, ...R]

type Join<
  T extends common.CanStringified[],
  SplitStr extends common.CanStringified = ""
> = T["length"] extends 0
  ? ""
  : T extends [infer Left, ...infer RightRest]
  ? Left extends common.CanStringified
    ? RightRest extends common.CanStringified[]
      ? `${Left}${T["length"] extends 1 ? "" : SplitStr}${Join<
          RightRest,
          SplitStr
        >}`
      : never
    : never
  : never

export type { GetTuple, TupleToUnion, Pop, Shift, UnShift, Push, Concat, Join }
