type Noop = (...args: any) => any

type GetAsyncFunctionReturnType<F extends Noop> = Awaited<ReturnType<F>>

type GetFunctionLength<F extends Noop> = F extends (...args: infer P) => any
  ? P["length"]
  : never

type Bind<
  F extends Noop,
  NewThisType,
  NewParams extends unknown[]
> = F extends (this: infer T, ...args: infer P) => infer R
  ? (this: NewThisType, ...args: NewParams) => R
  : never

export type { Noop, GetAsyncFunctionReturnType, GetFunctionLength, Bind }
