import { SpeciesCardEffect } from '../SpeciesCardEffect'
import { FecundSpeciesPendingEffect } from './FecundSpeciesPendingEffect'
import { CosmopolitanSpeciesPendingEffect } from './CosmopolitanSpeciesPendingEffect'

export type PendingEffect<T extends SpeciesCardEffect, D> = {
  type: T
} & D

export type BiotopesPendingEffect = FecundSpeciesPendingEffect | CosmopolitanSpeciesPendingEffect
