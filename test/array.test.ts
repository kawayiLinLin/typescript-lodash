import * as array from "../lib/array"

type ResultGetArray = array.GetTuple<2>

type ResultTupleToUnion = array.TupleToUnion<[123, 456, "789", true]>

type ResultPop = array.Pop<[1, 2, 3, 4]>

type ResultShift = array.Shift<[1, 2, 3, 4]>

type ResultUnShift = array.UnShift<[1, 2, 3, 4], 0>

type ResultPush = array.Push<[1, 2, 3, 4], 5>
