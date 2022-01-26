import * as common from "./common"
import * as array from "./array"

/**
 * 将支持的类型转化为字符串
 */
type Stringify<T extends common.CanStringified> = `${T}`

/**
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
  ? array.Push<A, S>
  : never

type Split<S extends string, SplitStr extends string = ""> = SplitHelper<
  S,
  SplitStr
>

type GetStringLength<S extends string> = Split<S>['length']

export type { Stringify, GetChars, Split, GetStringLength }
