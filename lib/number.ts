import * as common from "./common"
import * as string from "./string"
import * as array from "./array"
import { number } from ".."

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
      ? A2["length"]
      : A1["length"]
    : IntMinusSingleAbsHelper<array.Pop<A1>["length"], array.Pop<A2>["length"]>
  : 0

type IntMinusSingleAbs<
  N1 extends number,
  N2 extends number
> = IntMinusSingleAbsHelper<N1, N2>

type GetHalfHelper<N extends number, Offset extends number = 0> = IsEqual<
  IntAddSingle<Offset, Offset>,
  N
> extends true
  ? Offset
  : IsEqual<IntAddSingle<IntAddSingle<Offset, Offset>, 1>, N> extends true
  ? IntAddSingle<Offset, 1>
  : GetHalfHelper<N, IntAddSingle<Offset, 1>>

// 获取当前数的一半
type GetHalf<N extends number> = GetHalfHelper<N>

/** @see https://juejin.cn/post/6999280101556748295#heading-68 */
type Map = {
  "0": []
  "1": [1]
  "2": [...Map["1"], 1]
  "3": [...Map["2"], 1]
  "4": [...Map["3"], 1]
  "5": [...Map["4"], 1]
  "6": [...Map["5"], 1]
  "7": [...Map["6"], 1]
  "8": [...Map["7"], 1]
  "9": [...Map["8"], 1]
}

type Make10Array<T extends any[]> = [
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T
]

type ToNumberHelper<
  S extends string,
  L extends any[] = []
> = S extends `${infer F}${infer R}`
  ? ToNumberHelper<
      R,
      [...Make10Array<L>, ...(F extends keyof Map ? Map[F] : never)]
    >
  : L["length"]

type ToNumber<S extends string> = ToNumberHelper<S>

type Numbers = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type AdvancedNumericCharacters =
  | `${0}.${number}`
  | `${Exclude<Numbers, 0>}${number | ""}.${number}`
  | `${number}`

type Add<
  S1 extends AdvancedNumericCharacters,
  S2 extends AdvancedNumericCharacters
> = S1

type AddMap = [
  [
    { result: "0"; add: "0" }, // 00
    { result: "1"; add: "0" }, // 01
    { result: "2"; add: "0" }, // 02
    { result: "3"; add: "0" }, // 03
    { result: "4"; add: "0" }, // 04
    { result: "5"; add: "0" }, // 05
    { result: "6"; add: "0" }, // 06
    { result: "7"; add: "0" }, // 07
    { result: "8"; add: "0" }, // 08
    { result: "9"; add: "0" } // 09
  ],
  [
    { result: "1"; add: "0" }, // 10
    { result: "2"; add: "0" }, // 11
    { result: "3"; add: "0" }, // 12
    { result: "4"; add: "0" }, // 13
    { result: "5"; add: "0" }, // 14
    { result: "6"; add: "0" }, // 15
    { result: "7"; add: "0" }, // 16
    { result: "8"; add: "0" }, // 17
    { result: "9"; add: "0" }, // 18
    { result: "0"; add: "1" } // 19
  ],
  [
    { result: "2"; add: "0" }, // 20
    { result: "3"; add: "0" }, // 21
    { result: "4"; add: "0" }, // 22
    { result: "5"; add: "0" }, // 23
    { result: "6"; add: "0" }, // 24
    { result: "7"; add: "0" }, // 25
    { result: "8"; add: "0" }, // 26
    { result: "9"; add: "0" }, // 27
    { result: "0"; add: "1" }, // 28
    { result: "1"; add: "1" } // 29
  ],
  [
    { result: "3"; add: "0" }, // 30
    { result: "4"; add: "0" }, // 31
    { result: "5"; add: "0" }, // 32
    { result: "6"; add: "0" }, // 33
    { result: "7"; add: "0" }, // 34
    { result: "8"; add: "0" }, // 35
    { result: "9"; add: "0" }, // 36
    { result: "0"; add: "1" }, // 37
    { result: "1"; add: "1" }, // 38
    { result: "2"; add: "1" } // 39
  ],
  [
    { result: "4"; add: "0" }, // 40
    { result: "5"; add: "0" }, // 41
    { result: "6"; add: "0" }, // 42
    { result: "7"; add: "0" }, // 43
    { result: "8"; add: "0" }, // 44
    { result: "9"; add: "0" }, // 45
    { result: "0"; add: "1" }, // 46
    { result: "1"; add: "1" }, // 47
    { result: "2"; add: "1" }, // 48
    { result: "3"; add: "1" } // 49
  ],
  [
    { result: "5"; add: "0" }, // 50
    { result: "6"; add: "0" }, // 51
    { result: "7"; add: "0" }, // 52
    { result: "8"; add: "0" }, // 53
    { result: "9"; add: "0" }, // 54
    { result: "0"; add: "1" }, // 55
    { result: "1"; add: "1" }, // 56
    { result: "2"; add: "1" }, // 57
    { result: "3"; add: "1" }, // 58
    { result: "4"; add: "1" } // 59
  ],
  [
    { result: "6"; add: "0" }, // 60
    { result: "7"; add: "0" }, // 61
    { result: "8"; add: "0" }, // 62
    { result: "9"; add: "0" }, // 63
    { result: "0"; add: "1" }, // 64
    { result: "1"; add: "1" }, // 65
    { result: "2"; add: "1" }, // 66
    { result: "3"; add: "1" }, // 67
    { result: "4"; add: "1" }, // 68
    { result: "5"; add: "1" } // 69
  ],
  [
    { result: "7"; add: "0" }, // 70
    { result: "8"; add: "0" }, // 71
    { result: "9"; add: "0" }, // 72
    { result: "0"; add: "1" }, // 73
    { result: "1"; add: "1" }, // 74
    { result: "2"; add: "1" }, // 75
    { result: "3"; add: "1" }, // 76
    { result: "4"; add: "1" }, // 77
    { result: "5"; add: "1" }, // 78
    { result: "6"; add: "1" } // 79
  ],
  [
    { result: "8"; add: "0" }, // 80
    { result: "9"; add: "0" }, // 81
    { result: "0"; add: "1" }, // 82
    { result: "1"; add: "1" }, // 83
    { result: "2"; add: "1" }, // 84
    { result: "3"; add: "1" }, // 85
    { result: "4"; add: "1" }, // 86
    { result: "5"; add: "1" }, // 87
    { result: "6"; add: "1" }, // 88
    { result: "7"; add: "1" } // 89
  ],
  [
    { result: "9"; add: "0" }, // 90
    { result: "0"; add: "0" }, // 91
    { result: "1"; add: "1" }, // 92
    { result: "2"; add: "1" }, // 93
    { result: "3"; add: "1" }, // 94
    { result: "4"; add: "1" }, // 95
    { result: "5"; add: "1" }, // 96
    { result: "6"; add: "1" }, // 97
    { result: "7"; add: "1" }, // 98
    { result: "8"; add: "1" } // 99
  ]
]

type b = AddMap["9"][9]

type SplitByPoint<S extends AdvancedNumericCharacters> = string.Includes<
  S,
  "."
> extends true
  ? string.Split<S, ".">
  : [S, "0"]

type AddHelperSplitToArr<
  S1 extends AdvancedNumericCharacters,
  S2 extends AdvancedNumericCharacters
> = [SplitByPoint<S1>, SplitByPoint<S2>]

type AddFillZeroHelper<
  Data extends [[`${number}`, `${number}`], [`${number}`, `${number}`]]
> = [
  [
    string.PadStart<Data[0][0], string.GetStringLength<Data[1][0]>, "0">,
    string.PadEnd<Data[0][1], string.GetStringLength<Data[1][1]>, "0">
  ],
  [
    string.PadStart<Data[1][0], string.GetStringLength<Data[0][0]>, "0">,
    string.PadEnd<Data[1][1], string.GetStringLength<Data[0][1]>, "0">
  ]
]

type AddReverseData<
  Data extends [[`${number}`, `${number}`], [`${number}`, `${number}`]]
> = [
  [
    array.Reverse<string.Split<Data[0][0]>>,
    array.Reverse<string.Split<Data[0][1]>>
  ],
  [
    array.Reverse<string.Split<Data[1][0]>>,
    array.Reverse<string.Split<Data[1][1]>>
  ]
]

type StepAdderHelper<
  Data extends [
    [`${Numbers}`[], `${Numbers}`[]],
    [`${Numbers}`[], `${Numbers}`[]]
  ],
  IsInt extends boolean = false,
  Curry extends `${Numbers}` = `${0}`,
  Offset extends number = 0,
  ResultCache extends `${number}`[] = [],
  Current extends AddMap[Numbers][Numbers] = IsInt extends true
    ? AddMap[Data[0][1][Offset]][Data[1][1][Offset]]
    : AddMap[Data[0][1][Offset]][Data[1][1][Offset]],
  CurrentWidthPreCurry extends `${Numbers}` = AddMap[Current["result"]][Curry]["result"]
> = common.And<
  IsEqual<Data[0][0]["length"], Data[1][0]["length"]>,
  IsEqual<Data[0][1]["length"], Data[1][1]["length"]>
> extends true
  ? common.And<IsEqual<Offset, Data[0][0]["length"]>, IsInt> extends true
    ? ResultCache
    : StepAdderHelper<
        Data,
        Offset extends Data[IsInt extends false ? 1 : 0][0]["length"]
          ? true
          : false,
        Current["add"],
        IsEqual<Offset, Data[1][0]["length"]> extends true
          ? 0
          : number.IntAddSingle<Offset, 1>,
        array.Push<ResultCache, CurrentWidthPreCurry>
      >
  : never

type a = StepAdderHelper<
  [[["0"]], [["0"]]],
  [[["0"]], [["0"]]]
  //   AddReverseData<AddFillZeroHelper<AddHelperSplitToArr<"1", "1">>>
>

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
  GetHalf,
  ToNumber,
}
