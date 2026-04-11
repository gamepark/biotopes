import { RuleId } from '@gamepark/biotopes/rules/RuleId'
import { ComponentType } from 'react'
import { TheFirstStepHeader } from './TheFirstStepHeader'
import { GameSetupHandMulliganHeader } from './GameSetupHandMulliganHeader.tsx'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.GameSetupHandMulligan]: GameSetupHandMulliganHeader,
  [RuleId.GameSetupPlaceTerritoryTokens]: TheFirstStepHeader
}
