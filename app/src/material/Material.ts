import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { cycleTokenDescription } from './CycleTokenDescription'
import { ecosystemBoardDescription } from './EcosystemBoardDescription'
import { environmentalConditionsBoardDescription } from './EnvironmentalConditionsBoardDescription'
import { initiativeTokenDescription } from './InitiativeTokenDescription'
import { landscapeTileDescription } from './LandscapeTileDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.CycleToken]: cycleTokenDescription,
  [MaterialType.EcosystemBoard]: ecosystemBoardDescription,
  [MaterialType.EnvironmentalConditionsBoard]: environmentalConditionsBoardDescription,
  [MaterialType.InitiativeToken]: initiativeTokenDescription,
  [MaterialType.LandscapeTile]: landscapeTileDescription
}
