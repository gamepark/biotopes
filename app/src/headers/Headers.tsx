import { RuleId } from '@gamepark/biotopes/rules/RuleId'
import { ComponentType } from 'react'
import { EvolutionActionPlaceCubeAndDiscardCardsHeader } from './EvolutionActionPlaceCubeAndDiscardCardsHeader.tsx'
import { GameSetupPlaceTerritoryTokenHeader } from './GameSetupPlaceTerritoryTokenHeader.tsx'
import { GameSetupHandMulliganHeader } from './GameSetupHandMulliganHeader.tsx'
import { ChooseActionHeader } from './ChooseActionHeader.tsx'
import { ExpansionActionChooseCubeHeader } from './ExpansionActionChooseCubeHeader.tsx'
import { ExpansionActionPlaceTokenHeader } from './ExpansionActionPlaceTokenHeader.tsx'
import { BiotopeType } from '@gamepark/biotopes/material/BiotopeType.ts'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.GameSetupHandMulligan]: GameSetupHandMulliganHeader,
  [RuleId.GameSetupPlaceTerritoryTokens]: GameSetupPlaceTerritoryTokenHeader,
  [RuleId.ChooseAction]: ChooseActionHeader,
  [RuleId.ExpansionChooseCube]: ExpansionActionChooseCubeHeader,
  [RuleId.ExpansionPlaceTokenOnMountain]: ExpansionActionPlaceTokenHeader(BiotopeType.Mountain),
  [RuleId.ExpansionPlaceTokenOnForest]: ExpansionActionPlaceTokenHeader(BiotopeType.Forest),
  [RuleId.ExpansionPlaceTokenOnMeadow]: ExpansionActionPlaceTokenHeader(BiotopeType.Meadow),
  [RuleId.ExpansionPlaceTokenOnWetland]: ExpansionActionPlaceTokenHeader(BiotopeType.Wetland),
  [RuleId.EvolutionActionPlaceCubesAndDiscardCards]: EvolutionActionPlaceCubeAndDiscardCardsHeader
}
