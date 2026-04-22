import { PendingEffect } from './PendingEffect'
import { PendingEffectType } from './PendingEffectType'
import { RuleId } from '../../rules/RuleId'

type DrawCubesPendingEffectData = {
  numberOfCubesToDraw: number
  ruleWhenFinished?: RuleId
}

export type DrawCubesPendingEffect = PendingEffect<typeof PendingEffectType.DrawCubes, DrawCubesPendingEffectData>
