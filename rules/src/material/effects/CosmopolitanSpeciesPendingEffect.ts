import { PendingEffect } from './PendingEffect'
import { SpeciesCardEffect } from '../SpeciesCardEffect'

type CosmopolitanSpeciesPendingEffectData = {
  numberOfCardsToDraw: number
}

export type CosmopolitanSpeciesPendingEffect = PendingEffect<typeof SpeciesCardEffect.CosmopolitanSpecies, CosmopolitanSpeciesPendingEffectData>
