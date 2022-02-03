### 写 TS 像写 JS 一样容易


安装

```bash
yarn add -S typescript-lodash # 或者：npm install -s typescript-lodash
```

使用

```ts
import { string } from "typescript-lodash"
// 或 import * as t from "typescript-lodash" 然后用 t.string.Split<"">
// 或 import { Split } from "typescript-lodash" 然后用 Split<"">

type IString = "今天很高兴"

type TypeExample = string.Split<IString, "">

// 得到
type TypeResult = ["今", "天", "很", "高", "兴"]
```

查看文档

[中文文档](https://kawayilinlin.github.io/typescript-lodash/guide/%E4%BB%8B%E7%BB%8D.html)