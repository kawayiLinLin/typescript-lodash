# number 工具类型

## NumberLike 形如数字类型

形如数字的类型

```ts
type NumberLike = `${number}` | number
```

## IsZero 判断为0

判断一个数字类型（或形如）是否为 `0`

如果是，则得到类型 `true`，否则得到类型 `false`

```ts
import { number } from 'typescript-lodash'

type Result1 = number.IsZero<0> // true
```

## IsNotZero 判断不为0

判断一个数字类型（或形如）是否不为 `0`