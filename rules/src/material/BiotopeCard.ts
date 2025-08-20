import { getEnumValues } from '@gamepark/rules-api'
import { Biotope, biotope } from './Biotope'

export enum BiotopeEffect {
  BasicEnvironment = 0,
  AdaptedEnvironment,
  PlentifulEnvironment,
  PopulousEnvironment,
  PreservedEnvironment,
  PropitiousEnvironment
}

export enum BiotopeCard {
  Mountain = 10,
  MountainAdapted,
  MountainPlentiful,
  MountainPopulous,
  MountainPreserved,
  MountainPropitious,
  Forest = 20,
  ForestAdapted,
  ForestPlentiful,
  ForestPopulous,
  ForestPreserved,
  ForestPropitious,
  Meadow = 30,
  MeadowAdapted,
  MeadowPlentiful,
  MeadowPopulous,
  MeadowPreserved,
  MeadowPropitious,
  Wetland = 40,
  WetlandAdapted,
  WetlandPlentiful,
  WetlandPopulous,
  WetlandPreserved,
  WetlandPropitious
}

export const biotopeCards = getEnumValues(BiotopeCard)

export const getBiotopeCardType = (cardId : BiotopeCard) => Math.floor(cardId / 10)

export const getBiotopeCardEffect = (cardId : BiotopeCard) => cardId % 10

export const basicBiotopeCards = biotopeCards.filter(id => getBiotopeCardEffect(id) === 0)

export const advancedCardsByBiotope = biotope.reduce(
  (previousRecord, currentType) => ({ ...previousRecord, [currentType]: biotopeCards.slice((currentType-1) * 6 + 1, 6 * currentType) }),
  {} as Record<Biotope, BiotopeCard[]>)

