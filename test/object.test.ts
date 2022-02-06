import { object } from "..";

interface O {
  item: 1;
  value: 2;
  id: "3";
}

type ResultKeysToUnion = object.KeysToUnion<O>;

type ResultValues = object.Values<O>;

type ResultKeysToTuple = object.KeysToTuple<O>;

type ResultExtractValues = object.ExtractValues<O, number>;

type ResultExcludeValues = object.ExcludeValues<O, number>;

type ResultGetterSetterPrefix = object.GetterSetterPrefix<O>;

type ResultProxify = object.Proxify<O>;

type ResultNullableValue = object.NullableValue<O>;

type ResultInclude = object.Include<O, "value">;

type ResultChangeRecordType = object.ChangeRecordType<O, null>;

interface ReadOnlyO {
  readonly value: 0;
  readonly item: 1;
}

type ResultMutable = object.Mutable<ReadOnlyO>;

type ResultReadonlyPartial = object.ReadonlyPartial<O>;

type ResultDeepPartial = object.DeepPartial<O>;

interface DeepO {
  a: {
    b: {
      c: {};
      d: 1;
    };
    e: 1;
  };
  f: {
    g: null;
  };
}

type ResultChainedAccessUnion = object.ChainedAccessUnion<DeepO>;

export type {
  ResultKeysToUnion,
  ResultGetterSetterPrefix,
  ResultValues,
  ResultKeysToTuple,
  ResultExtractValues,
  ResultExcludeValues,
  ResultProxify,
  ResultNullableValue,
  ResultInclude,
  ResultChangeRecordType,
  ResultMutable,
  ResultReadonlyPartial,
  ResultDeepPartial,
  ResultChainedAccessUnion
};
