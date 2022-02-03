# number 工具类型

## NumberLike 形如数字类型

形如数字的类型，如：`0`、`"0"`、`0.1`、`-1`、`"-0.1"`、`"+1"` 等

**用于约束其他类型**

```ts
type NumberLike = `${number}` | number
```

## IsZero 判断类型为 0

判断一个数字类型（或形如）是否为 `0`

如果是，则得到类型 `true`，否则得到类型 `false`

**泛型参数**

+ N 
    - 约束 `NumberLike`
    - 必须 `是`

```ts
import { number } from 'typescript-lodash'

type Result1 = number.IsZero<0> // true

type Result2 = number.IsZero<"0"> // true

type Result3 = number.IsZero<"0.0"> // false， 不能判断 "0.0" 的场景，但是数字类型的 0.0 和 -0 会得到 true 类型
```

## IsNotZero 判断类型不为 0

判断一个数字类型（或形如）是否不为 `0`

如果是，则得到类型 `true`，否则得到类型 `false`

**泛型参数**

+ N 
    - 约束 `NumberLike`
    - 必须 `是`

```ts
import { number } from 'typescript-lodash'

type Result1 = number.IsNotZero<0> // false

type Result2 = number.IsNotZero<"0"> // false

type Result3 = number.IsNotZero<0.1> // true

type Result4 = number.IsNotZero<-1> // true
```

## IsOverZero 判断类型大于 0

判断一个数字类型（或形如）是否大于 `0`

如果是，则得到类型 `true`，否则得到类型 `false`

**泛型参数**

+ N 
    - 约束 `NumberLike`
    - 必须 `是`

```ts
import { number } from 'typescript-lodash'

type Result1 = number.IsOverZero<0> // false

type Result2 = number.IsOverZero<-0.1> // false

type Result3 = number.IsOverZero<'1'> // true

type Result4 = number.IsOverZero<'+1'> // true
```

## IsLessZero 判断类型小于 0

判断一个数字类型（或形如）是否小于 `0`

如果是，则得到类型 `true`，否则得到类型 `false`

**泛型参数**

+ N 
    - 约束 `NumberLike`
    - 必须 `是`

```ts
import { number } from 'typescript-lodash'

type Result1 = number.IsLessZero<0> // false

type Result2 = number.IsLessZero<'1'> // false

type Result3 = number.IsLessZero<'+1'> // false

type Result3 = number.IsLessZero<'-1'> // true
```

## IsFloat 判断类型为浮点型

判断一个数字类型（或形如）是否为浮点型

如果是，则得到类型 `true`，否则得到类型 `false`

**泛型参数**

+ N 
    - 约束 `NumberLike`
    - 必须 `是`

+ OnlyCheckPoint
    - 约束 `boolean`
    - 必须 `否`
    - 默认 `true`
    - 注：关闭后，如果小数位全是 0，则会得到 `false`

```ts
import { number } from 'typescript-lodash'

type Result1 = number.IsFloat<0> // false

type Result2 = number.IsFloat<0.0> // false，数字类型 0.0 会得到 false，但字符类型 "0.0" 会得到 true

type Result3 = number.IsFloat<'1'> // false

type Result4 = number.IsFloat<1.1> // true

type Result5 = number.IsFloat<1.0, false> // false

type Result6 = number.IsFloat<1.0, true> // true
```

## IsInt 判断类型为整型

判断一个数字类型（或形如）是否为整型

如果是，则得到类型 `true`，否则得到类型 `false`

**泛型参数**

+ N 
    - 约束 `NumberLike`
    - 必须 `是`

+ OnlyCheckPoint
    - 约束 `boolean`
    - 必须 `否`
    - 默认 `true`
    - 注：关闭后，如果小数位全是 0，则会得到 `true`

```ts
import { number } from 'typescript-lodash'

type Result1 = number.IsInt<0> // true

type Result2 = number.IsInt<0.0> // true，数字类型 0.0 会得到 true，但字符类型 "0.0" 会得到 false

type Result3 = number.IsInt<'1'> // true

type Result4 = number.IsInt<1.1> // false

type Result5 = number.IsInt<1.0, false> // true

type Result6 = number.IsInt<1.0, true> // false
```

## IsEqual 判断数字类型相等

判断两个数字类型（或形如）是否相等

如果是，则得到类型 `true`，否则得到类型 `false`

**泛型参数**

+ L
    - 约束 `NumberLike`
    - 必须 `是`
    - 注：作为被约束的类型进行校验

+ R
    - 约束 `NumberLike`
    - 必须 `是`
    - 注：作为约束

+ Strict
    - 约束 `boolean`
    - 必须 `否`
    - 默认 `true`
    - 注：关闭后，形如数字类型和数字类型进行比较时，都转为字符串后相同，则会得到 `true`

```ts
import { number } from 'typescript-lodash'

type Result1 = number.IsEqual<0, 0> // true

type Result2 = number.IsEqual<0, '0'> // false

type Result3 = number.IsEqual<0, '0', false> // true

type Result4 = number.IsEqual<0.1, '0.1', false> // true
```

## IsNotEqual 数字类型是否不相等

判断两个数字类型（或形如）是否不相等

如果是，则得到类型 `true`，否则得到类型 `false`

**泛型参数**

+ L
    - 约束 `NumberLike`
    - 必须 `是`
    - 注：作为被约束的类型进行校验

+ R
    - 约束 `NumberLike`
    - 必须 `是`
    - 注：作为约束

+ Strict
    - 约束 `boolean`
    - 必须 `否`
    - 默认 `true`
    - 注：关闭后，形如数字类型和数字类型进行比较时，都转为字符串后不相同，则会得到 `true`

```ts
import { number } from 'typescript-lodash'

type Result1 = number.IsNotEqual<0, 0> // false

type Result2 = number.IsNotEqual<0, '0'> // true

type Result3 = number.IsNotEqual<0, '0', false> // false

type Result4 = number.IsNotEqual<0.1, 1> // true
```

## IntAddSingle 数字类型相加

两个数字类型相加，得到新的数字类型（两数的和）

::: warning 注意
该数字类型相加工具类型有较为明显的边界限制
:::

**泛型参数**

+ N1
    - 约束 `number`
    - 必须 `是`
    - 注：必须是大于等于0的整数，且不超过999

+ N2
    - 约束 `number`
    - 必须 `是`
    - 注：必须是大于等于0的整数，且不超过999

```ts
import { number } from 'typescript-lodash'

type Result1 = number.IntAddSingle<1, 2> // 3

type Result2 = number.IntAddSingle<0, 1> // 1
```

## Compare 比较类型大小

两个数字类型比较大小

如果第一个数字类型大于第二个数字类型，则得到 `true`，否则得到 `false`

::: warning 注意
该数字类型大小比较工具类型有较为明显的边界限制
:::

**泛型参数**

+ N1
    - 约束 `number`
    - 必须 `是`
    - 注：必须是大于等于0的整数，且不超过999

+ N2
    - 约束 `number`
    - 必须 `是`
    - 注：必须是大于等于0的整数，且不超过999

```ts
import { number } from 'typescript-lodash'

type Result1 = number.Compare<1, 1> // false

type Result2 = number.Compare<0, 1> // false

type Result3 = number.Compare<1, 0> // true
```

## IntMinusSingleAbs 数字类型相减

两个数字类型相减，得到差的绝对值

::: warning 注意
该数字类型大小比较工具类型有较为明显的边界限制
:::

**泛型参数**

+ N1
    - 约束 `number`
    - 必须 `是`
    - 注：必须是大于等于0的整数，且不超过999

+ N2
    - 约束 `number`
    - 必须 `是`
    - 注：必须是大于等于0的整数，且不超过999

```ts
import { number } from 'typescript-lodash'

type Result1 = number.IntMinusSingleAbs<1, 1> // 0

type Result2 = number.IntMinusSingleAbs<0, 1> // 1

type Result3 = number.IntMinusSingleAbs<5, 1> // 4
```

## GetHalf 获取数字类型的一半

获得一个数字类型的一半

如果该数字类型 `N` 为偶数，则会得到 `N / 2` 的结果

如果该数字类型 `N` 为奇数，则会得到 `(N + 1) / 2` 的结果

**泛型参数**

+ N
    - 约束 `number`
    - 必须 `是`