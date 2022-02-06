import * as string from '../lib/string'

type ResultIncludes = string.Includes<"呵哈", "1">;

type ResultStringify = string.Stringify<1n>;

type ResultGetChars = string.GetChars<"">;

type ResultSplit = string.Split<"1,2,3", ",">;

type ResultStartsWidth = string.StartsWith<"123", "12">;

type ResultEndsWidth = string.EndsWith<"123", "">;

type ResultIndexOf = string.IndexOf<"123123", "1">;

type ResultLastIndexOf = string.LastIndexOf<"123123", "1">;

type ResultReplace = string.Replace<"我讨厌你", "讨厌", "爱">;

type ResultReplaceAll = string.ReplaceAll<"想见你想见你只想见你", "你", "我">;

type ResultRepeat = string.Repeat<"❤️", 9>;

type ResultPadStart = string.PadStart<"前面有空格", 6>;

type ResultPadEnd = string.PadStart<"后面有空格", 6>;

type ResultTrimLeft = string.TrimLeft<" 前面没有空格">;

type ResultTrimRight = string.TrimRight<"后面没有空格 ">;

type ResultTrim = string.Trim<" 两边没有空格 ">;

type ResultCharAt = string.CharAt<"123", 2>;

type ResultToUpperCase = string.ToUpperCase<"abc">;

type ResultToLowerCase = string.ToLowerCase<"ABC">;

type ResultSubString = string.SubString<"1234", 1, 1>;

type ResultSubStr = string.SubStr<"1234", 1, 1>;

export type {
  ResultIncludes,
  ResultStringify,
  ResultGetChars,
  ResultSplit,
  ResultCharAt,
  ResultSubString,
  ResultSubStr,
  ResultStartsWidth,
  ResultEndsWidth,
  ResultIndexOf,
  ResultLastIndexOf,
  ResultReplace,
  ResultReplaceAll,
  ResultRepeat,
  ResultPadStart,
  ResultPadEnd,
  ResultTrimLeft,
  ResultTrimRight,
  ResultTrim,
  ResultToUpperCase,
  ResultToLowerCase
};
