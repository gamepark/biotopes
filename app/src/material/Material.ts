import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { cycleTokenDescription } from './CycleTokenDescription'
import { biotopeCardDescription } from './BiotopeCardDescription'
import { ecosystemBoardDescription } from './EcosystemBoardDescription'
import { environmentalConditionsBoardDescription } from './EnvironmentalConditionsBoardDescription'
import { environmentalConditionTokenDescription } from './EnvironmentalConditionTokenDescription'
import { initiativeTokenDescription } from './InitiativeTokenDescription'
import { landscapeTileDescription } from './LandscapeTileDescription'
import { specieCardDescription } from './SpecieCardDescription'
import { territoryTokenDescription } from './TerritoryTokenDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.BiotopesCard]: biotopeCardDescription,
  [MaterialType.CycleToken]: cycleTokenDescription,
  [MaterialType.EcosystemBoard]: ecosystemBoardDescription,
  [MaterialType.EnvironmentalConditionsBoard]: environmentalConditionsBoardDescription,
  [MaterialType.EnvironmentalConditionToken]: environmentalConditionTokenDescription,
  [MaterialType.InitiativeToken]: initiativeTokenDescription,
  [MaterialType.LandscapeTile]: landscapeTileDescription,
  [MaterialType.SpeciesCard]: specieCardDescription,
  [MaterialType.TerritoryToken]: territoryTokenDescription
}

export const materialI18n: Record<string, Partial<Record<MaterialType, MaterialDescription>>> = {
  // Todo : Add french version when needed
}
