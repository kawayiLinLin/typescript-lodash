import * as number from '../lib/number'

type ResultIsZero = number.IsZero<'0'>

type ResultIsLessZero = number.IsLessZero<'+1'>

type ResultIsOverZero = number.IsOverZero<1>

type ResultIsInt = number.IsInt<1.1>

type ResultIsFloat = number.IsFloat<1.1, true>