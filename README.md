### 写 TS 像写 JS 一样容易

[![OSCS Status](https://www.oscs1024.com/platform/badge/kawayiLinLin/typescript-lodash.svg?size=small)](https://www.oscs1024.com/project/kawayiLinLin/typescript-lodash?ref=badge_small) [![NPM URL](https://img.shields.io/badge/npm-v6.14.12-1577b4)](https://www.npmjs.com/package/typescript-lodash) [![Typescript Limit](https://img.shields.io/badge/TypeScript->=4.5.0-1577b4)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html) [![NPM URL](https://img.shields.io/badge/license-MIT-8fba29)](https://www.npmjs.com/package/typescript-lodash)

Make writing TypeScript as easy as writing JavaScript

安装 Install

```bash
yarn add typescript-lodash # or：npm install --save typescript-lodash
```

使用 Usage

```ts
import { string } from "typescript-lodash"
// or use `import * as t from "typescript-lodash"` and then `t.string.Split<"">`
// or use `import { Split } from "typescript-lodash/lib/string"` and then `Split<"">`

type IString = "今天很高兴"

type TypeExample = string.Split<IString, "">

// 得到
type TypeResult = ["今", "天", "很", "高", "兴"]
```

查看文档 Documentation

[中文文档 Chinese Documentation](https://kawayilinlin.github.io/typescript-lodash/)