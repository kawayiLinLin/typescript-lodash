import * as array from "../lib/array"

type ResultGetArray = array.GetTuple<5>

type ResultArraySet = array.ArraySet<[1, 2], 0, 0>

type ResultTupleToUnion = array.TupleToUnion<[123, 456, "789", true]>

type ResultPop = array.Pop<[1, 2, 3, 4]>

type ResultShift = array.Shift<[1, 2, 3, 4]>

type ResultUnShift = array.UnShift<[1, 2, 3, 4], 0>

type ResultPush = array.Push<[1, 2, 3, 4], 5>

type ResultConcat = array.Concat<[1, 2], [3, 4]>

type ResultJoin = array.Join<[1, 2, 3], ",">

type ResultEvery = array.Every<[1, 2, 3], number>

type ResultSome = array.Some<[1], number>

type ResultFill = array.Fill<[1, 2], 2>

type ResultFilter = array.Filter<[1, 2, 3, "4"], string>

type ResultMapWidthIndex = array.MapWidthIndex<[1, 2, 3, 4, 5]>

type ResultReverse = array.Reverse<[1, 2, 3, 4, 5, 6]>

type ResultFind = array.Find<[1, "2", "3", 4], string>

type ResultFindLast = array.FindLast<[1, "2", "3", 4], string>

type ResultFindIndex = array.FindIndex<[1, "2", "3", 4], string>

type ResultFindLastIndex = array.FindLastIndex<[1, "2", "3", 4], string>

type ResultFlat = array.Flat<[1, [2, [3], 4]]>

type ResultIncludes = array.Includes<[1, 2, 3, "2"], string>

type ResultSlice = array.Slice<[1, 2, 3, 4, 5], 0, 2>

type ResultSort = array.Sort<[2, 1]>

export type {
  ResultGetArray,
  ResultArraySet,
  ResultTupleToUnion,
  ResultPop,
  ResultShift,
  ResultUnShift,
  ResultPush,
  ResultConcat,
  ResultJoin,
  ResultEvery,
  ResultSome,
  ResultFill,
  ResultFilter,
  ResultMapWidthIndex,
  ResultReverse,
  ResultFind,
  ResultFindLast,
  ResultFindIndex,
  ResultFindLastIndex,
  ResultFlat,
  ResultIncludes,
  ResultSlice,
  ResultSort,
}
