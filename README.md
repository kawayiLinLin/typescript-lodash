### 写 TS 像写 JS 一样容易

安装

```bash
yarn add -S typescript-lodash # 或者：npm install -s typescript-lodash
```

使用

```ts
import { string } from "typescript-lodash"

type IString = "今天很高兴"

type TypeExample = string.Split<IString, "">

// 得到
type TypeResult = ["今", "天", "很", "高", "兴"]
```