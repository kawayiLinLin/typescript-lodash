import * as number from "../lib/number"
import * as string from "../lib/string"

type ResultIsZero = number.IsZero<-0>

type ResultIsLessZero = number.IsLessZero<-1>

type ResultIsOverZero = number.IsOverZero<"+1">

type ResultIsInt = number.IsInt<0>

type ResultIsFloat = number.IsFloat<1.0, false>

type ResultIsEqual = number.IsEqual<1, 1>

type ResultIntIncrease = number.IntIncrease<9999999>

type ResultIntAddSimple = number.IntAddSimple<999, 999>

type ResultCompare = number.Compare<999, 998>

type ResultGetHalf = number.GetHalf<0>

type ResultToNumber = number.ToNumber<"9999">

type ResultAdd = number.Add<"9007199254740991.12345", "9007199254740991.234567">

type ResultParseFloat = number.ParseFloat<"-3.14159265358979300000000000">

export type {
  ResultIsZero,
  ResultIsLessZero,
  ResultIsOverZero,
  ResultIsInt,
  ResultIsFloat,
  ResultIsEqual,
  ResultIntIncrease,
  ResultIntAddSimple,
  ResultCompare,
  ResultGetHalf,
  ResultToNumber,
  ResultAdd,
  ResultParseFloat
}
