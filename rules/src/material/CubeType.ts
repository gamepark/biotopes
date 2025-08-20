import { getEnumValues } from '@gamepark/rules-api'

export enum CubeType {
  AmphibianReptile = 5,
  Bird,
  Insect,
  Mammal,
  Plant
}

export const cubeType = getEnumValues(CubeType)
