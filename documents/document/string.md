# string 工具类型

## CanStringified 可转字符的类型

可以转字符类型的类型，如 `0`、`"haha"`、`true`、`null`、`undefined`

**用于约束其他类型**

```ts
type CanStringified = string | number | bigint | boolean | null | undefined
```

## Stringify 转字符串类型

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

type Result = string.GetChars<'abc'> // 'a' | 'b' | 'c'

type Result = string.GetChars<''> // never
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

type Result = string.Split<'abc'> // ['a', 'b', 'c']

type Result = string.Split<'1,2,3', ','> // ["1", "2", "3"]

type Result = string.Split<'', ','> // []
```