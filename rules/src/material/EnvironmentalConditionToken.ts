import { getEnumValues } from '@gamepark/rules-api'

export enum EnvironmentalConditionToken {
  BiotopeMountain = 1,
  BiotopeForest,
  BiotopeMeadow,
  BiotopeWetland,
  SpeciesTypeAmphibianReptile,
  SpeciesTypeBird,
  SpeciesTypeInsect,
  SpeciesTypeMammal
}

const environmentalConditionTokens = getEnumValues(EnvironmentalConditionToken)

export const biotopeEnvironmentalConditionTokens = environmentalConditionTokens.slice(0, 4)

export const speciesTypeEnvironmentalConditionTokens = environmentalConditionTokens.slice(4)
