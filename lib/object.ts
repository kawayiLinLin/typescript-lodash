import * as common from "./common"

type KeysToTuple<T> = KeysToUnion<T>[]

type KeysToUnion<T> = keyof T

type Values<T> = T[KeysToUnion<T>]

type ExtractValues<T, V> = {
  [Key in keyof T as T[Key] extends V ? Key : never]: T[Key]
}

type ExcludeValues<T, V> = {
  [Key in keyof T as T[Key] extends V ? never : Key]: T[Key]
}

type GetterSetterPrefix<T> = {
  [Key in keyof T as Key extends string ? `get${Uppercase<Key>}` : never]: {
    (): T[Key]
  }
} & {
  [Key in keyof T as Key extends string ? `set${Uppercase<Key>}` : never]: {
    (val: T[Key]): void
  }
} & T

type Proxify<T> = {
  [P in keyof T]: {
    get(): T[P]
    set(v: T[P]): void
  }
}

type NullableValue<T> = {
  [Key in keyof T]?: common.Nullable<T[Key]>
}

type Include<T extends object, U extends keyof any> = {
  [Key in keyof T as Key extends U ? Key : never]: T[Key]
}

type ChangeRecordType<K, T = undefined> = {
  [P in keyof K]?: T
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

type ReadonlyPartial<T> = {
  readonly [P in keyof T]?: T[P]
}

type DeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends object ? DeepPartial<T[Key]> : T[Key]
}

type ChainedAccessUnion<T extends object> = ChainedAccessUnionHelper<T>

type ChainedAccessUnionHelper<
  T,
  A = {
    [Key in keyof T]: T[Key] extends string ? never : T[Key]
  },
  B = {
    [Key in keyof A]: A[Key] extends never
      ? never
      : A[Key] extends object
      ?
          | `${Extract<Key, string>}.${Extract<keyof A[Key], string>}`
          | (ChainedAccessUnionHelper<A[Key]> extends infer U
              ? `${Extract<Key, string>}.${Extract<U, string>}`
              : never)
      : never
  }
> = T extends object
  ? Exclude<keyof A | Exclude<Values<B>, never>, never>
  : never

export type {
  KeysToTuple,
  KeysToUnion,
  Values,
  ChainedAccessUnion,
  ExtractValues,
  ExcludeValues,
  GetterSetterPrefix,
  Proxify,
  NullableValue,
  Include,
  ChangeRecordType,
  DeepPartial,
  ReadonlyPartial,
  Mutable,
}
