import { PendingEffectType } from './PendingEffectType'
import { DrawCubesPendingEffect } from './DrawCubesPendingEffect'
import { DrawCardsPendingEffect } from './DrawCardsPendingEffect'

export type PendingEffect<T extends PendingEffectType, D> = {
  type: T
} & D

export type BiotopesPendingEffect = DrawCubesPendingEffect | DrawCardsPendingEffect
