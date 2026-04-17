import { getEnumValues } from '@gamepark/rules-api'

export enum CubeType {
  Plant = 1,
  Insect,
  Mammal,
  Bird,
  AmphibianReptile
}

export const cubeType = getEnumValues(CubeType)
