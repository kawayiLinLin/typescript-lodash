import { ModeAwareCache } from "typescript"
import { array, number } from ".."
import * as common from "./common"

/**
 * 构造长度一定（Length）的元组
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
/** */
type Concat<T extends unknown[], R extends unknown[]> = [...T, ...R]
/** */
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

type EveryHelper<
  T extends unknown[],
  Check,
  Offset extends number = 0,
  CacheBool extends boolean = true
> = T["length"] extends Offset
  ? CacheBool
  : EveryHelper<
      T,
      Check,
      number.IntAddSingle<Offset, 1>,
      common.And<common.CheckLeftIsExtendsRight<T[Offset], Check>, CacheBool>
    >
/** */
type Every<T extends unknown[], Check> = EveryHelper<T, Check>

type FillHelper<
  T extends unknown[],
  F,
  Offset extends number = 0
> = T["length"] extends 0
  ? F[]
  : Offset extends T["length"]
  ? common.IsEqual<T, F[]> extends true /** any[] -> T[] */
    ? T
    : F[]
  : FillHelper<array.Push<array.Shift<T>, F>, F, number.IntAddSingle<Offset, 1>>
/** */
type Fill<T extends unknown[], F = undefined> = FillHelper<T, F>

type FilterHelper<
  T extends unknown[],
  C,
  Strict extends boolean,
  Offset extends number = 0,
  Cache extends unknown[] = []
> = Offset extends T["length"]
  ? Cache
  : FilterHelper<
      T,
      C,
      Strict,
      number.IntAddSingle<Offset, 1>,
      common.And<Strict, common.IsEqual<T[Offset], C>> extends true
        ? array.Push<Cache, T[Offset]>
        : common.And<
            common.Not<Strict>,
            common.CheckLeftIsExtendsRight<T[Offset], C>
          > extends true
        ? array.Push<Cache, T[Offset]>
        : Cache
    >
/** */
type Filter<
  T extends unknown[],
  C,
  Strict extends boolean = false
> = FilterHelper<T, C, Strict>

type FindHelper<
  T extends unknown[],
  C,
  Offset extends number = 0
> = Offset extends number.IntAddSingle<T["length"], 1>
  ? null
  : common.CheckLeftIsExtendsRight<T[Offset], C> extends true
  ? T[Offset]
  : FindHelper<T, C, number.IntAddSingle<Offset, 1>>
/** */
type Find<T extends unknown[], C> = FindHelper<T, C>

type FindIndexHelper<
  T extends unknown[],
  C,
  Strict extends boolean = false,
  Offset extends number = 0
> = Offset extends number.IntAddSingle<T["length"], 1>
  ? -1
  : common.And<common.IsEqual<T[Offset], C>, Strict> extends true
  ? Offset
  : common.And<
      common.CheckLeftIsExtendsRight<T[Offset], C>,
      common.Not<Strict>
    > extends true
  ? Offset
  : FindIndexHelper<T, C, Strict, number.IntAddSingle<Offset, 1>>
/** */
type FindIndex<
  T extends unknown[],
  C,
  Strict extends boolean = false
> = FindIndexHelper<T, C, Strict>

type ReverseHelper<
  T extends unknown[],
  Offset extends number = 0,
  Cache extends unknown[] = []
> = Cache["length"] extends T["length"]
  ? Cache
  : ReverseHelper<T, number.IntAddSingle<Offset, 1>, UnShift<Cache, T[Offset]>>
/** */
type Reverse<T extends unknown[]> = ReverseHelper<T>
/** */
type FindLast<T extends unknown[], C> = Find<Reverse<T>, C>

interface IndexMappedItem<Item, Index extends number, Tuple extends unknown[]> {
  item: Item
  index: Index
  tuple: Tuple
}

type MapWidthIndexHelper<
  T extends unknown[],
  Offset extends number = 0,
  Cache extends unknown[] = []
> = T["length"] extends Offset
  ? Cache
  : MapWidthIndexHelper<
      T,
      number.IntAddSingle<Offset, 1>,
      Push<Cache, IndexMappedItem<T[Offset], Offset, T>>
    >

type MapWidthIndex<T extends unknown[]> = MapWidthIndexHelper<T>

type FindLastIndexHelper<
  T extends unknown[],
  C,
  Item = Find<Reverse<MapWidthIndex<T>>, IndexMappedItem<C, number, T>>
> = Item extends IndexMappedItem<C, number, T> ? Item["index"] : -1

type FindLastIndex<T extends unknown[], C> = FindLastIndexHelper<T, C>

type FlatHelper<
  T extends unknown[],
  Offset extends number = 0,
  Cache extends unknown[] = []
> = Offset extends T["length"]
  ? Cache
  : FlatHelper<
      T,
      number.IntAddSingle<Offset, 1>,
      T[Offset] extends unknown[]
        ? Concat<Cache, T[Offset]>
        : Push<Cache, T[Offset]>
    >

type Flat<T extends unknown[]> = FlatHelper<T>

type Includes<T extends unknown[], C> = common.CheckLeftIsExtendsRight<C, TupleToUnion<T>>

export type {
  GetTuple,
  TupleToUnion,
  Pop,
  Shift,
  UnShift,
  Push,
  Concat,
  Join,
  Every,
  Fill,
  Filter,
  Find,
  FindIndex,
  Reverse,
  MapWidthIndex,
  FindLast,
  FindLastIndex,
  Flat,
  Includes
}
