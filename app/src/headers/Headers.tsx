import { BiotopeType } from '@gamepark/biotopes/material/BiotopeType.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId'
import { ComponentType } from 'react'
import { ChooseActionHeader } from './ChooseActionHeader.tsx'
import { EvolutionActionPlaceCubeAndDiscardCardsHeader } from './EvolutionActionPlaceCubeAndDiscardCardsHeader.tsx'
import { ExpansionActionChooseCubeHeader } from './ExpansionActionChooseCubeHeader.tsx'
import { ExpansionActionPlaceTokenHeader } from './ExpansionActionPlaceTokenHeader.tsx'
import { GameSetupHandMulliganHeader } from './GameSetupHandMulliganHeader.tsx'
import { GameSetupPlaceTerritoryTokenHeader } from './GameSetupPlaceTerritoryTokenHeader.tsx'
import { MigrationActionChooseCube } from './MigrationActionChooseCube.tsx'
import { MigrationActionMoveTokenHeader } from './MigrationActionMoveTokenHeader.tsx'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.GameSetupHandMulligan]: GameSetupHandMulliganHeader,
  [RuleId.GameSetupPlaceTerritoryTokens]: GameSetupPlaceTerritoryTokenHeader,
  [RuleId.ChooseAction]: ChooseActionHeader,
  [RuleId.ExpansionChooseCube]: ExpansionActionChooseCubeHeader,
  [RuleId.ExpansionPlaceTokenOnMountain]: ExpansionActionPlaceTokenHeader(BiotopeType.Mountain),
  [RuleId.ExpansionPlaceTokenOnForest]: ExpansionActionPlaceTokenHeader(BiotopeType.Forest),
  [RuleId.ExpansionPlaceTokenOnMeadow]: ExpansionActionPlaceTokenHeader(BiotopeType.Meadow),
  [RuleId.ExpansionPlaceTokenOnWetland]: ExpansionActionPlaceTokenHeader(BiotopeType.Wetland),
  [RuleId.EvolutionActionPlaceCubesAndDiscardCards]: EvolutionActionPlaceCubeAndDiscardCardsHeader,
  [RuleId.MigrationActionChooseCube]: MigrationActionChooseCube,
  [RuleId.MigrationActionMoveTerritoryTokenOnMountain]: MigrationActionMoveTokenHeader(BiotopeType.Mountain),
  [RuleId.MigrationActionMoveTerritoryTokenOnForest]: MigrationActionMoveTokenHeader(BiotopeType.Forest),
  [RuleId.MigrationActionMoveTerritoryTokenOnMeadow]: MigrationActionMoveTokenHeader(BiotopeType.Meadow),
  [RuleId.MigrationActionMoveTerritoryTokenOnWetland]: MigrationActionMoveTokenHeader(BiotopeType.Wetland)
}
