import { number, string, array, common } from ".."

/**
 * @exports
 * 将支持的类型转化为字符串
 */
type Stringify<T extends common.CanStringified> = `${T}`

/**
 * @@exports
 * 获取模板字符串类型中的字符
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html
 * @example
 * type Result = GetChars<'abc'> // 'a' | 'b' | 'c'
 */
type GetChars<S> = GetCharsHelper<S, never>

/**
 * 以 尾递归 tail-recursive 的方式优化 GetChars，不导出为工具类型
 */
type GetCharsHelper<S, Acc> = S extends `${infer Char}${infer Rest}`
  ? GetCharsHelper<Rest, Char | Acc>
  : Acc

type SplitHelper<
  S extends string,
  SplitStr extends string = "",
  A extends string[] = []
> = S extends `${infer Char}${SplitStr}${infer Rest}`
  ? SplitHelper<Rest, SplitStr, array.Push<A, Char>>
  : S extends string
  ? S extends ""
    ? A
    : array.Push<A, S>
  : never

/**
 * @exports
 * 拆分字符串变为一个元组
 */
type Split<S extends string, SplitStr extends string = ""> = SplitHelper<
  S,
  SplitStr
>

/**
 * @exports
 * 获取字符串的长度
 */
type GetStringLength<S extends string> = Split<S>["length"]

/**
 * @exports
 * 获取字符串在索引位 I 下的 字符
 */
type CharAt<S extends string, I extends number> = Split<S>[I]

/**
 * @exports
 * 拼接两个字符串
 */
type Concat<S1 extends string, S2 extends string> = `${S1}${S2}`

/**
 * @exports
 * 判断字符串是否包含子串
 */
type Includes<
  S1 extends string,
  S2 extends string
> = S1 extends `${infer Left}${S2}${infer Right}` ? true : false

/**
 * @exports
 * 判断字符串是否以子串为起始
 */
type StartsWith<
  S1 extends string,
  S2 extends string
> = S1 extends `${S2}${infer Right}` ? true : false

/**
 * @exports
 * 判断字符串是否以子串为结束
 */
type EndsWith<
  S1 extends string,
  S2 extends string
> = S1 extends `${infer Left}${S2}` ? true : false

type IndexOfHelper<
  S1 extends string,
  S2 extends string,
  Len1 extends number = GetStringLength<S1>,
  Len2 extends number = GetStringLength<S2>
> = common.Or<
  number.Compare<Len1, Len2>,
  number.IsEqual<Len1, Len2>
> extends true
  ? S1 extends `${infer Left}${S2}${infer Right}`
    ? GetStringLength<Left>
    : -1
  : -1

/**
 * @exports
 * 从左往右查找子串的位置
 */
type IndexOf<S1 extends string, S2 extends string> = IndexOfHelper<S1, S2>

type LastIndexOfHelper<
  S1 extends string,
  S2 extends string,
  Index extends number = -1 /** 当前从左往右匹配最大的值，匹配不到以后，上一次匹配的索引就是从右往左第一个的索引 */,
  AddOffset extends number = 0 /** 每次从左往右匹配并替换成空串后，下次循序需要累加的值 */
> = S1 extends `${infer Left}${S2}${infer Right}`
  ? LastIndexOfHelper<
      Replace<S1, S2, "">,
      S2,
      number.IntAddSingle<GetStringLength<Left>, AddOffset>,
      number.IntAddSingle<AddOffset, GetStringLength<S2>>
    >
  : Index

/**
 * @exports
 * 从右往左查找子串的位置
 */
type LastIndexOf<S1 extends string, S2 extends string> = LastIndexOfHelper<
  S1,
  S2
>

/**
 * @exports
 * 在字符串中查找并替换一处子串
 */
type Replace<
  S extends string,
  MatchStr extends string,
  ReplaceStr extends string
> = S extends `${infer Left}${MatchStr}${infer Right}`
  ? `${Left}${ReplaceStr}${Right}`
  : S

/**
 * @exports
 * 在字符串中查找并替换所有子串
 */
type ReplaceAll<
  S extends string,
  MatchStr extends string,
  ReplaceStr extends string
> = Includes<S, MatchStr> extends true
  ? ReplaceAll<Replace<S, MatchStr, ReplaceStr>, MatchStr, ReplaceStr>
  : S

type RepeatHelper<
  S extends string,
  Times extends number,
  OriginStr extends string = S,
  Offset extends number = 1
> = Times extends 0
  ? ""
  : number.IsEqual<Times, Offset> extends true
  ? S
  : `${OriginStr}${RepeatHelper<
      S,
      Times,
      OriginStr,
      number.IntAddSingle<Offset, 1>
    >}`

/**
 * @exports
 * 重复 Times 次数的字符串
 */
type Repeat<S extends string, Times extends number = 1> = RepeatHelper<S, Times>

type PadHelper<
  S extends string,
  N extends number = 0,
  IsStart extends boolean = true,
  Len extends number = GetStringLength<S>,
  Offset extends number = Len
> = number.Compare<N, Len> extends true
  ? number.IsEqual<N, Offset> extends true
    ? S
    : PadHelper<
        `${IsStart extends true ? " " : ""}${S}${IsStart extends false
          ? " "
          : ""}`,
        N,
        IsStart,
        Len,
        number.IntAddSingle<Offset, 1>
      >
  : S

type PadStart<S extends string, N extends number = 0> = PadHelper<S, N>

type PadEnd<S extends string, N extends number = 0> = PadHelper<S, N, false>

/**
 * @see https://juejin.cn/post/7045536402112512007#heading-5
 */
type TrimLeft<S extends string> = S extends `${
  | " "
  | "\t"
  | "\n"}${infer RightRest}`
  ? TrimLeft<RightRest>
  : S

type TrimRight<S extends string> = S extends `${infer LeftRest}${
  | " "
  | "\t"
  | "\n"}`
  ? TrimRight<LeftRest>
  : S

type Trim<S extends string> = TrimLeft<TrimRight<S>>

type ToUpperCase<S extends string> = Uppercase<S>

type ToLowerCase<S extends string> = Lowercase<S>

/**
 * 在字符串中抽取从 开始 下标开始的指定数目的字符
 */
type SubStr<
  S extends string,
  Start extends number,
  Len extends number
> = SubStringHelper<S, Start, number.IntAddSingle<Start, Len>>

type SubStringHelper<
  S extends string,
  Start extends number,
  End extends number,
  Offset extends number = 0,
  Cache extends string[] = []
> = number.IsEqual<Offset, End> extends true
  ? array.Join<Cache, "">
  : SubStringHelper<
      S,
      Start,
      End,
      number.IntAddSingle<Offset, 1>,
      common.And3<
        common.Or<number.Compare<Offset, Start>, number.IsEqual<Offset, Start>>,
        common.Or<number.Compare<End, Offset>, number.IsEqual<Offset, End>>,
        CharAt<S, Offset> extends string ? true : false
      > extends true
        ? array.Push<Cache, CharAt<S, Offset>>
        : Cache
    >
/**
 * 截取start（包括）到end(不包括)之间的字符串
 */
type SubString<
  S extends string,
  Start extends number,
  End extends number
> = SubStringHelper<S, Start, End>

export type {
  Stringify,
  GetChars,
  Split,
  GetStringLength,
  CharAt,
  Concat,
  Includes,
  StartsWith,
  EndsWith,
  IndexOf,
  LastIndexOf,
  Replace,
  ReplaceAll,
  Repeat,
  PadStart,
  PadEnd,
  TrimLeft,
  TrimRight,
  Trim,
  ToUpperCase,
  ToLowerCase,
  SubStr,
  SubString,
}
