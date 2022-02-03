# string 工具类型

## CanStringified 可转字符的类型

可以转字符类型的类型，如 `0`、`"haha"`、`true`、`null`、`undefined`

**用于约束其他类型**

```ts
type CanStringified = string | number | bigint | boolean | null | undefined
```