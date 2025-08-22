import { getEnumValues } from '@gamepark/rules-api'
import { BiotopeType, biotopeType } from './BiotopeType'

export enum BiotopeEffect {
  BasicEnvironment = 1,
  AdaptedEnvironment,
  PlentifulEnvironment,
  PopulousEnvironment,
  PreservedEnvironment,
  PropitiousEnvironment
}

export enum BiotopeCard {
  Mountain = 11,
  MountainAdapted,
  MountainPlentiful,
  MountainPopulous,
  MountainPreserved,
  MountainPropitious,
  Forest = 21,
  ForestAdapted,
  ForestPlentiful,
  ForestPopulous,
  ForestPreserved,
  ForestPropitious,
  Meadow = 31,
  MeadowAdapted,
  MeadowPlentiful,
  MeadowPopulous,
  MeadowPreserved,
  MeadowPropitious,
  Wetland = 41,
  WetlandAdapted,
  WetlandPlentiful,
  WetlandPopulous,
  WetlandPreserved,
  WetlandPropitious
}

export const biotopeCards = getEnumValues(BiotopeCard)

export const getBiotopeCardTypes = (cardId: BiotopeCard) => Math.floor(cardId / 10)

export const getBiotopeCardEffect = (cardId: BiotopeCard) => cardId % 10

export const basicBiotopeCards = biotopeCards.filter((id) => getBiotopeCardEffect(id) === 1)

export const advancedCardsByBiotope = biotopeType.reduce(
  (previousRecord, currentType) => ({ ...previousRecord, [currentType]: biotopeCards.slice((currentType - 1) * 6 + 1, 6 * currentType) }),
  {} as Record<BiotopeType, BiotopeCard[]>
)
