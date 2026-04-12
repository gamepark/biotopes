import { RuleId } from '@gamepark/biotopes/rules/RuleId'
import { ComponentType } from 'react'
import { GameSetupPlaceTerritoryTokenHeader } from './GameSetupPlaceTerritoryTokenHeader.tsx'
import { GameSetupHandMulliganHeader } from './GameSetupHandMulliganHeader.tsx'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.GameSetupHandMulligan]: GameSetupHandMulliganHeader,
  [RuleId.GameSetupPlaceTerritoryTokens]: GameSetupPlaceTerritoryTokenHeader
}
