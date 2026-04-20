import { PendingEffect } from './PendingEffect'
import { SpeciesCardEffect } from '../SpeciesCardEffect'

type FecundSpeciesData = {
  numberOfCubesToDraw: number
}

export type FecundSpeciesPendingEffect = PendingEffect<typeof SpeciesCardEffect.FecundSpecies, FecundSpeciesData>
