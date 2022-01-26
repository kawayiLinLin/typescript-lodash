/**
 * 构造长度一定（T）的元组
 */

type GetTuple<T extends number> = GetTupleHelper<T>

type GetTupleHelper<T extends number, R extends any[] = []> = R["length"] extends T
  ? R
  : GetTupleHelper<T, [...R, any]>

export type { GetTuple }
