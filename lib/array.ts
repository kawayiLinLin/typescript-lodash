import { common, array, number, string } from ".."

/**
 * 构造长度一定（Length）的元组
 */
type GetTuple<Length extends number = 0> = GetTupleHelper<Length>

type GetTupleHelper<
  Length extends number = 0,
  R extends unknown[] = []
> = R["length"] extends Length ? R : GetTupleHelper<Length, [...R, unknown]>

type SetHelper<
  T extends unknown[],
  Index extends number,
  Value,
  Offset extends number = 0,
  Cache extends unknown[] = []
> = Offset extends T["length"]
  ? Cache
  : SetHelper<
      T,
      Index,
      Value,
      number.IntAddSingle<Offset, 1>,
      Push<Cache, Offset extends Index ? Value : T[Offset]>
    >

type ArraySet<T extends unknown[], Index extends number, Value> = SetHelper<
  T,
  Index,
  Value
>

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
  T extends string.CanStringified[],
  SplitStr extends string.CanStringified = ""
> = T["length"] extends 0
  ? ""
  : T extends [infer Left, ...infer RightRest]
  ? Left extends string.CanStringified
    ? RightRest extends string.CanStringified[]
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
> = common.Or<
    number.IsEqual<T['length'], Offset>,
    common.Not<CacheBool>
  > extends true
  ? CacheBool
  : EveryHelper<
      T,
      Check,
      number.IntAddSingle<Offset, 1>,
      common.CheckLeftIsExtendsRight<T[Offset], Check>
    >
/** */
type Every<T extends unknown[], Check> = T["length"] extends 0
  ? false
  : EveryHelper<T, Check>

type SomeHelper<
  T extends unknown[],
  Check,
  Offset extends number = 0,
  CacheBool extends boolean = false
> = common.Or<
    number.IsEqual<T['length'], Offset>,
    CacheBool
  > extends true
  ? CacheBool
  : SomeHelper<
      T,
      Check,
      number.IntAddSingle<Offset, 1>,
      common.CheckLeftIsExtendsRight<T[Offset], Check>
    >
/** */
type Some<T extends unknown[], Check> = SomeHelper<T, Check>

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
> = Offset extends T["length"]
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
> = Offset extends T["length"]
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

type Includes<T extends unknown[], C> = common.CheckLeftIsExtendsRight<
  C,
  TupleToUnion<T>
>

type SliceHelper<
  T extends unknown[],
  Start extends number,
  End extends number,
  Offset extends number = 0,
  Cache extends unknown[] = []
> = number.IsEqual<Offset, End> extends true
  ? Cache
  : SliceHelper<
      T,
      Start,
      End,
      number.IntAddSingle<Offset, 1>,
      common.And3<
        common.Or<number.Compare<Offset, Start>, number.IsEqual<Offset, Start>>,
        common.Or<number.Compare<End, Offset>, number.IsEqual<Offset, End>>,
        common.Or<
          number.Compare<T["length"], Offset>,
          number.IsEqual<T["length"], End>
        >
      > extends true
        ? array.Push<Cache, T[Offset]>
        : Cache
    >

type Slice<
  T extends unknown[],
  Start extends number,
  End extends number
> = SliceHelper<T, Start, End>

type SortHepler2<
  T extends number[],
  Offset extends number = 0,
  Offset1 extends number = 0,
  Offset1Added extends number = number.IntAddSingle<Offset1, 1>,
  Seted1 extends unknown[] = ArraySet<T, Offset1Added, T[Offset1]>,
  Seted2 extends unknown[] = ArraySet<Seted1, Offset1, T[Offset1Added]>
> = number.IntAddSingle<
  number.IntAddSingle<Offset, Offset1>,
  1
> extends T["length"]
  ? SortHepler1<T, number.IntAddSingle<Offset, 1>>
  : SortHepler2<
      number.Compare<T[Offset1], T[Offset1Added]> extends true
        ? Seted2 extends number[]
          ? Seted2
          : never
        : T,
      number.IntAddSingle<Offset1, 1>
    >

type SortHepler1<
  T extends number[],
  Offset extends number = 0
> = Offset extends T["length"] ? T : SortHepler2<T, Offset>

type Sort<T extends number[]> = SortHepler1<T>

type Sort1Helper1<
  T extends any[], 
  Offset extends number = 0
> = Offset extends T["length"] ? T : Sort1Helper1<Sort1Helper2<T>, number.IntAddSingle<Offset, 1>>

type Sort1Helper2<T extends number[]> = T extends [infer X, infer Y, ...infer Rest]
  ? number.Compare<X & number, Y & number> extends true
    ? [Y, ...Sort1Helper1<[X, ...Rest]>]
    : [X, ...Sort1Helper1<[Y, ...Rest]>]
  : T

/**
 * 冒泡排序
 * 使用递归的方式，支持30个左右的元组长度
 */
type Sort1<T extends number[]> = Sort1Helper1<T>


type TupleKeysHelper<
  T extends unknown[],
  Offset extends number = 0
> = Offset extends T["length"]
  ? T
  : TupleKeysHelper<ArraySet<T, Offset, Offset>, number.IntAddSingle<Offset, 1>>

type TupleKeys<T extends unknown[]> = TupleKeysHelper<T>

/**
 * @exports
 */
type IndexOf<
  T extends unknown[],
  C,
  Strict extends boolean = false
> = FindIndex<T, C, Strict>

type LastIndexOf<T extends unknown[], C> = FindLastIndex<T, C>


export type {
  GetTuple,
  TupleToUnion,
  ArraySet,
  Pop,
  Shift,
  UnShift,
  Push,
  Concat,
  Join,
  Every,
  Some,
  Fill,
  Filter,
  Find,
  FindIndex,
  Reverse,
  MapWidthIndex,
  FindLast,
  FindLastIndex,
  Flat,
  Includes,
  Slice,
  Sort,
  Sort1,
  TupleKeys,
  IndexOf,
  LastIndexOf,
}
