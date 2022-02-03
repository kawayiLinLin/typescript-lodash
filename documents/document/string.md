# string 工具类型

## CanStringified 可转字符的类型

可以转字符类型的类型，如 `0`、`"haha"`、`true`、`null`、`undefined`

**用于约束其他类型**

```ts
type CanStringified = string | number | bigint | boolean | null | undefined
```

## Stringify 转字符串

将符合约束的类型转为字符串类型

**泛型参数**

+ T 
    - 约束 `CanStringified`
    - 必须 `是`


```ts
import { string } from "typescript-lodash"

type Result1 = string.Stringify<1> // "1"

type Result2 = string.Stringify<"haha"> // "haha"

type Result3 = string.Stringify<true> // "true"

type Result4 = string.Stringify<null> // "null"

type Result5 = string.Stringify<undefined> // "undefined"

type Result6 = string.Stringify<1n> // "1"
```

## GetChars 获取字符

获取字符串类型中所有字符构成的联合类型

**泛型参数**

+ S 
    - 约束 `string`
    - 必须 `是`

```ts
import { string } from "typescript-lodash"

type Result1 = string.GetChars<'abc'> // 'a' | 'b' | 'c'

type Result2 = string.GetChars<''> // never
```

## Split 分割字符串

将字符串类型按照子串分割成元组类型

**泛型参数**

+ S 
    - 约束 `string`
    - 必须 `是`

+ SplitStr
    - 约束 `string`
    - 必须 `否`
    - 默认 `''`
    - 注：按照 SplitStr 分割字符串类型

```ts
import { string } from "typescript-lodash"

type Result1 = string.Split<'abc'> // ['a', 'b', 'c']

type Result2 = string.Split<'1,2,3', ','> // ["1", "2", "3"]

type Result3 = string.Split<'', ','> // []
```

## GetStringLength 获取字符串长度

获取字符串类型的长度

**泛型参数**

+ S 
    - 约束 `string`
    - 必须 `是`

```ts
import { string } from "typescript-lodash"

type Result1 = string.GetStringLength<"123"> // 3

type Result2 = string.GetStringLength<""> // 0
```

## CharAt 获取字符

获取字符串类型中给定索引位的字符

**泛型参数**

+ S 
    - 约束 `string`
    - 必须 `是`

+ I
    - 约束 `number`
    - 必须 `是`
    - 注：给定的索引位需要大于等于0

```ts
import { string } from "typescript-lodash"

type Result1 = string.CharAt<"123", 0> // "1"

type Result2 = string.CharAt<"123", 2> // "3"

type Result3 = string.CharAt<"123", 3> // undefined
```

## Concat 拼接字符

拼接两个字符串类型成为一个新的字符串类型

**泛型参数**

+ S1
    - 约束 `string`
    - 必须 `是`

+ S2
    - 约束 `string`
    - 必须 `是`

```ts
import { string } from "typescript-lodash"

type Result1 = string.Concat<"123", "456"> // "123456"
```

## Includes 判断包含子串

判断字符串类型中是否包含子串

如果是，则得到 `true`、否则得到 `false`

**泛型参数**

+ S1
    - 约束 `string`
    - 必须 `是`

+ S2
    - 约束 `string`
    - 必须 `是`
    - 注：需要判断是否包含的子串

```ts
import { string } from "typescript-lodash"

type Result1 = string.Include<"123", "12"> // true

type Result2 = string.Include<"123", "34"> // false
```

## StartsWith 判断由子串开始

判断字符串类型是否由给定的子串开始

如果是，则得到 `true`、否则得到 `false`

**泛型参数**

+ S1
    - 约束 `string`
    - 必须 `是`

+ S2
    - 约束 `string`
    - 必须 `是`
    - 注：需要判断是否由其开始的子串

```ts
import { string } from "typescript-lodash"

type Result1 = string.StartsWith<"123", "12"> // true

type Result2 = string.StartsWith<"123", "23"> // false
```

## EndsWith 判断由子串结束

判断字符串类型是否由给定的子串结束

如果是，则得到 `true`、否则得到 `false`

**泛型参数**

+ S1
    - 约束 `string`
    - 必须 `是`

+ S2
    - 约束 `string`
    - 必须 `是`
    - 注：需要判断是否由其结束的子串

```ts
import { string } from "typescript-lodash"

type Result1 = string.EndsWith<"123", "12"> // false

type Result2 = string.EndsWith<"123", "23"> // true
```

## IndexOf 查询子串第一个起始索引

从左往右查询字符串类型中给定的子串出现的第一个位置的起始索引，如果没有，则得到 -1

**泛型参数**

+ S1
    - 约束 `string`
    - 必须 `是`

+ S2
    - 约束 `string`
    - 必须 `是`
    - 注：需要获得出现位置的子串

```ts
import { string } from "typescript-lodash"

type Result1 = string.IndexOf<"123", "1"> // 0

type Result2 = string.IndexOf<"123", "4"> // -1
```

## LastIndexOf 查询子串最后一个起始索引

从左往右查询字符串类型中给定的子串出现的最后一个位置的起始索引，如果没有，则得到 -1

**泛型参数**

+ S1
    - 约束 `string`
    - 必须 `是`

+ S2
    - 约束 `string`
    - 必须 `是`
    - 注：需要获得出现位置的子串

```ts
import { string } from "typescript-lodash"

type Result1 = string.LastIndexOf<"123", "3"> // 2

type Result2 = string.LastIndexOf<"123", "4"> // -1
```

## Replace 查找并替换一处子串

在字符串类型中匹配第一个子串并替换成新字符串类型

**泛型参数**

+ S1
    - 约束 `string`
    - 必须 `是`

+ MatchStr
    - 约束 `string`
    - 必须 `是`
    - 注：需要被替换的子串

+ ReplaceStr
    - 约束 `string`
    - 必须 `是`
    - 注：需要替换的子串

```ts
import { string } from "typescript-lodash"

type Result1 = string.Replace<"123", "3", "4"> // "124"

type Result2 = string.Replace<"123", "4", "5"> // "123"
```

## ReplaceAll 查找并替换所有子串

在字符串类型中匹配所有子串并替换成新字符串类型

**泛型参数**

+ S1
    - 约束 `string`
    - 必须 `是`

+ MatchStr
    - 约束 `string`
    - 必须 `是`
    - 注：需要被替换的子串

+ ReplaceStr
    - 约束 `string`
    - 必须 `是`
    - 注：需要替换的子串

```ts
import { string } from "typescript-lodash"

type Result1 = string.ReplaceAll<"333", "4"> // "444"

type Result2 = string.ReplaceAll<"123", "4"> // "123"
```

## Repeat 重复字符串

重复指定次数的字符串类型，并生成新字符串

**泛型参数**

+ S
    - 约束 `string`
    - 必须 `是`

+ Times
    - 约束 `number`
    - 必须 `否`
    - 默认 `1`
    - 注：给定需要重复的次数

```ts
import { string } from "typescript-lodash"

type Result1 = string.Repeat<"123", 4> // "123123123123"

type Result2 = string.Repeat<"123", 0> // ""
```

## PadStart 在前面填充

## PadEnd 在后面填充

## TrimLeft 去掉左边空格

## TrimRight 去掉右边空格

## Trim 去掉两边空格

## ToUpperCase 转大写

## ToLowerCase 转小写


## SubString 截取字符串

## SubStr 截取一定长度的字符串