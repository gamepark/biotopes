import { getEnumValues } from '@gamepark/rules-api'

export enum BiotopeType {
  Mountain = 1,
  Forest,
  Meadow,
  Wetland
}

export const biotopeType = getEnumValues(BiotopeType)
