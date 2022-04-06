---
home: true
heroImage: /logo.svg
actionText: 快速上手 →
actionLink: /guide/介绍.html
features:
- title: 类型体操
  details: 像做体操运动一样花里胡哨（褒义），为中国冬奥会加油
- title: 使用友好
  details: 仿 JavaScript 常见实例原型方法，用 TS 工具类型就像在写 JS 
- title: 持续更新
  details: 你能想到的，你不能想到的我都要更新
footer: MIT Licensed | Copyright © 2022-present kawayiLinLin
---

### 写 TS 像写 JS 一样容易

安装

```bash
yarn add typescript-lodash # 或者：npm install -S typescript-lodash
```

使用

```ts
import { string } from "typescript-lodash"

type IString = "今天很高兴"

type TypeExample = string.Split<IString, "">

// 得到
type TypeResult = ["今", "天", "很", "高", "兴"]
```

::: warning 注意
请确保你项目的 TypeScript 版本 >= 4.5.0。
:::