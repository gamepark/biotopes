import { getEnumValues } from '@gamepark/rules-api'

export enum SpecieType {
  AmphibianReptile = 5,
  Bird,
  Insect,
  Mammal,
  Plant
}

export const specieType = getEnumValues(SpecieType)
