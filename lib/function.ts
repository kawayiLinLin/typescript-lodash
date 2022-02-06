import { array, number } from '..'

type Noop = (...args: any) => any

/**
 * Recursively unwraps the "awaited type" of a type. Non-promise "thenables" should resolve to `never`. This emulates the behavior of `await`.
 */
 type Awaited<T> =
 T extends null | undefined ? T : // special case for `null | undefined` when not in `--strictNullChecks` mode
     T extends object & { then(onfulfilled: infer F): any } ? // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
         F extends ((value: infer V, ...args: any) => any) ? // if the argument to `then` is callable, extracts the first argument
             Awaited<V> : // recursively unwrap the value
             never : // the argument to `then` was not callable
     T; // non-object or non-thenable

type GetAsyncFunctionReturnType<F extends Noop> = Awaited<ReturnType<F>>

type GetFunctionLength<F extends Noop> = F extends (...args: infer P) => any
  ? P["length"]
  : never

type Bind<
  F extends Noop,
  NewThisType = null,
  NewParams extends unknown[] = []
> = F extends (this: infer T, ...args: infer P) => infer R
  ? (this: NewThisType, ...args: [...NewParams, ...array.Slice<P, NewParams['length'], P['length']>]) => R
  : never

export type { Noop, GetAsyncFunctionReturnType, GetFunctionLength, Bind }
