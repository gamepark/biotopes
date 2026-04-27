import { getEnumValues } from '@gamepark/rules-api'

export enum BiotopeBoard {
  MountainPeatland,
  ConiferForest,
  WoodedCountryside,
  Marsh,
  AlpineGrass,
  Ripisylve,
  MountainPasture,
  AlluvialForest
}

export const biotopeBoards = getEnumValues(BiotopeBoard)
