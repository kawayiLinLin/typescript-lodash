type Not<C extends boolean> = C extends true ? false : true

type And<C1 extends boolean, C2 extends boolean> = C1 extends true
  ? C2 extends true
    ? true
    : false
  : false

type And3<C1 extends boolean, C2 extends boolean, C3 extends boolean> = And<
  And<C1, C2>,
  C3
>

type And4<
  C1 extends boolean,
  C2 extends boolean,
  C3 extends boolean,
  C4 extends boolean
> = And<And3<C1, C2, C3>, C4>

type Or<C1 extends boolean, C2 extends boolean> = C1 extends true
  ? true
  : C2 extends true
  ? true
  : false

type Or3<C1 extends boolean, C2 extends boolean, C3 extends boolean> = Or<
  Or<C1, C2>,
  C3
>

type Or4<
  C1 extends boolean,
  C2 extends boolean,
  C3 extends boolean,
  C4 extends boolean
> = Or<Or3<C1, C2, C3>, C4>

type CheckLeftIsExtendsRight<T extends any, R extends any> = T extends R
  ? true
  : false

/**
 * @see https://github.com/microsoft/TypeScript/issues/27024#issuecomment-510924206
 * @description 判断类型严格相等
 */
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T1
>() => T1 extends B ? 1 : 2
  ? true
  : false

type IsAny<T> = 0 extends 1 & T ? true : false

type IsNever<T> = [T] extends [never] ? true : false

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never

type SafeCheck<T> = T extends null | undefined | never ? false : true

type Diff<T, C> = Exclude<T, C> | Exclude<C, T>

type SumAggregate<T, U> = T | U

type Nullable<T> = T | null | undefined

type Many<T> = T | T[]

/**
 * @see https://juejin.cn/book/7047524421182947366/section/7048282437238915110#UnionToIntersection
 * @description 联合类型转交叉类型
 *
 * 分布式条件类型 + 函数参数的逆变进行实现
 */
type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never

/**
 * @see https://juejin.cn/book/7047524421182947366/section/7061543892180533283#UnionToTuple
 * @description 联合类型转元组
 *
 * 通过函数交叉类型进行重载、重载函数返回值类型为最后一个的特点，结合UnionToIntersection实现
 */
type UnionToTuple<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer ReturnType
  ? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
  : []

export type {
  Not,
  And,
  And3,
  And4,
  IsAny,
  IsNever,
  Or,
  Or3,
  Or4,
  CheckLeftIsExtendsRight,
  IsEqual,
  SafeCheck,
  Diff,
  SumAggregate,
  Nullable,
  Many,
  UnionToIntersection,
  UnionToTuple,
  IsUnion
}
