import * as string from '../lib/string'

type ResultIncludes = string.Includes<'呵哈', '1'>

type ResultStringify = string.Stringify<1n>

type ResultGetChars = string.GetChars<''>

type ResultSplit = string.Split<'', ','>

type ResultCharAt = string.CharAt<"123", 3>