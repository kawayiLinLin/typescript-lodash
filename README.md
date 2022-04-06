### 写 TS 像写 JS 一样容易


安装

```bash
yarn add typescript-lodash # 或者：npm install --save typescript-lodash
```

使用

```ts
import { string } from "typescript-lodash"
// or use `import * as t from "typescript-lodash"` and then `t.string.Split<"">`
// or use `import { Split } from "typescript-lodash"` and then `Split<"">`

type IString = "今天很高兴"

type TypeExample = string.Split<IString, "">

// 得到
type TypeResult = ["今", "天", "很", "高", "兴"]
```

查看文档

[中文文档](https://kawayilinlin.github.io/typescript-lodash/)