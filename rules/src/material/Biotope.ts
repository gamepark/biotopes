import { getEnumValues } from '@gamepark/rules-api'

export enum Biotope {
  Mountain = 1,
  Forest,
  Meadow,
  Wetland
}

export const biotope = getEnumValues(Biotope)
