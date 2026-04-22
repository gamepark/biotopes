import { PendingEffect } from './PendingEffect'
import { PendingEffectType } from './PendingEffectType'

type DrawCardsPendingEffectData = {
  numberOfCardsToDraw: number
}

export type DrawCardsPendingEffect = PendingEffect<typeof PendingEffectType.DrawCards, DrawCardsPendingEffectData>
