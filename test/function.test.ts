import * as t from ".."

const request = async (id: number) => {
  return {
    code: 0,
    success: true,
    data: [],
  }
}

type ResultGetAsyncFunctionReturnType = t.function.GetAsyncFunctionReturnType<
  typeof request
>

type ResultGetFunctionLength = t.function.GetFunctionLength<typeof request>

const bindTest = function (this: null, _arg0: number, _arg1: any) {}

type ResultBind = t.function.Bind<typeof bindTest, typeof globalThis, [1, 2]>

export type {
  ResultGetAsyncFunctionReturnType,
  ResultGetFunctionLength,
  ResultBind,
}
